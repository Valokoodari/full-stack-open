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

afterAll(() => {
  mongoose.connection.close()
})
