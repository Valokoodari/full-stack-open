const listHelper = require("../utils/list_helper")
const testBlogs = require("./test_blogs")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("of an empty list is zero", () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test("of a list with a single blog is the likes of that blog", () => {
    const blogs = [
      {
        title: "I Love Summer",
        author: "Olaf",
        url: "https://frozen.com/olaf",
        likes: 23
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(23)
  })

  test("of a larger list is correct", () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(36)
  })
})
