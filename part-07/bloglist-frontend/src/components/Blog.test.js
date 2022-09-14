import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

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
  const element = render(<Blog blog={test_blog} user={test_user} createBlog={() => {}} updateBlog={() => {}} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  expect(screen.getByText("I Love Summer")).toBeDefined()
  expect(screen.getByText("by Olaf")).toBeInTheDocument()
  expect(screen.queryByText("https://frozen.com/olaf")).not.toBeInTheDocument()
  expect(screen.queryByText("likes 242")).not.toBeInTheDocument()
  expect(screen.queryByText("The Snowman")).not.toBeInTheDocument()
})

test("Blog component displays all information after the view button is clicked", () => {
  const element = render(<Blog blog={test_blog} user={test_user} createBlog={() => {}} updateBlog={() => {}} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  const button = screen.getByText("view")
  fireEvent.click(button)

  expect(screen.getByText("I Love Summer")).toBeDefined()
  expect(screen.getByText("by Olaf")).toBeInTheDocument()
  expect(screen.getByText("https://frozen.com/olaf")).toBeInTheDocument()
  expect(screen.getByText("likes 242")).toBeInTheDocument()
  expect(screen.getByText("The Snowman")).toBeInTheDocument()
})

test("Blog component calls the updateBlog function twice when the like button is clicked twice", () => {
  const updateBlog = jest.fn()
  const element = render(<Blog blog={test_blog} user={test_user} createBlog={() => {}} updateBlog={updateBlog} removeBlog={() => {}} />)
  expect(element).toBeDefined()

  const button = screen.getByText("view")
  fireEvent.click(button)

  const likeButton = screen.getByText("like")
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateBlog).toHaveBeenCalledTimes(2)
})
