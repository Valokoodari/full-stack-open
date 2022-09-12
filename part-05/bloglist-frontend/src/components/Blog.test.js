import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import { act } from "react-dom/test-utils"

const test_user = {
  username: "snowman",
  name: "The Snowman"
}

const test_blog = {
  title: "I Love Summer",
  author: "Olaf",
  url: "https://frozen.com/olaf",
  likes: 242,
  user: test_user
}

test("Blog component displays only the title and author by default", () => {
  const element = render(<Blog blog={test_blog} user={test_user} createBlog={()=> {}} updateBlog={() => {}} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  expect(screen.getByText("I Love Summer")).toBeDefined()
  expect(screen.getByText("by Olaf")).toBeInTheDocument()
  expect(screen.queryByText("https://frozen.com/olaf")).not.toBeInTheDocument()
  expect(screen.queryByText("likes 242")).not.toBeInTheDocument()
  expect(screen.queryByText("The Snowman")).not.toBeInTheDocument()
})
