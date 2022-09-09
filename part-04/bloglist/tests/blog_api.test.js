const mongoose = require("mongoose")
const supertest = require("supertest")
const data = require("./test_blogs")
const app = require("../app")
const blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(data.blogs)
})

describe("the api returns", () => {
  test("the data in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("the correct number of blogs", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(data.blogs.length)
  })

  test("blogs that have id instead of _id", async () => {
    const response = await api.get("/api/blogs")
  
    expect(response.body[0].id).toBeDefined()
  })

  test("error 400 if title and url are missing from a new blog", async () => {
    await api
      .post("/api/blogs")
      .send(data.blogNoTitleOrUrl)
      .expect(400)
  })
})

test("the api can add a blog to the database", async () => {
  await api
    .post("/api/blogs")
    .send(data.blog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(data.blogs.length + 1)
})

describe("a blog added to the database", () => {
  test("has the correct data", async () => {
    const postResponse = await api
      .post("/api/blogs")
      .send(data.blog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
  
    const id = postResponse.body.id
  
    const response = await api.get("/api/blogs")
  
    expect(response.body).toContainEqual(
      expect.objectContaining({
        title: data.blog.title,
        author: data.blog.author,
        url: data.blog.url,
        likes: data.blog.likes,
        id
      })
    )
  })
  
  test("has 0 likes if no likes are specified", async () => {
    const postResponse = await api
      .post("/api/blogs")
      .send(data.blogNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(postResponse.body.likes).toBe(0)
  })
})

describe("when a blog is deleted", () => {
  test("the number of blogs goes down by one", async () => {
    const id = (await api.get("/api/blogs")).body[0].id
  
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  
    const response = await api.get("/api/blogs")
  
    expect(response.body).toHaveLength(data.blogs.length - 1)
  })

  test("a blog with the deleted id doesn't exist anymore", async () => {
    const id = (await api.get("/api/blogs")).body[0].id
  
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  
    const response = await api.get("/api/blogs")
  
    expect(response.body).not.toContainEqual(
      expect.objectContaining({
        title: data.blogs[0].title,
        author: data.blogs[0].author,
        url: data.blogs[0].url,
        likes: data.blogs[0].likes,
        id
      })
    )
  })
})

describe("when a blog is updated", () => {
  test("the number of blogs stays the same", async () => {
    const id = (await api.get("/api/blogs")).body[0].id

    await api
      .put(`/api/blogs/${id}`)
      .send(data.blog)
      .expect(200)

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(data.blogs.length)
  })

  test("the number of likes can be updated", async () => {
    const id = (await api.get("/api/blogs")).body[0].id

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes: 100 })
      .expect(200)

    const response = await api.get("/api/blogs")

    expect(response.body[0].likes).toBe(100)
  })

  test("the whole blog can be updated", async () => {
    const id = (await api.get("/api/blogs")).body[0].id

    await api
      .put(`/api/blogs/${id}`)
      .send(data.blog)
      .expect(200)

    const response = await api.get("/api/blogs")

    expect(response.body).toContainEqual(
      expect.objectContaining({
        title: data.blog.title,
        author: data.blog.author,
        url: data.blog.url,
        likes: data.blog.likes,
        id
      })
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})
