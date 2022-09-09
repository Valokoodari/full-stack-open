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
})

afterAll(() => {
  mongoose.connection.close()
})
