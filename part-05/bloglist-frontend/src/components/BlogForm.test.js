import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

test("BlogForm component calls the createBlog function with the correct details when the form is submitted", () => {
  const createBlog = jest.fn()
  const element = render(<BlogForm createBlog={createBlog} />)
  expect(element).toBeDefined()

  const viewButton = screen.getByRole("button", { name: "new blog" })
  fireEvent.click(viewButton)

  const inputs = screen.getAllByRole("textbox")

  fireEvent.change(inputs[0], { target: { value: "I Love Summer" } })
  fireEvent.change(inputs[1], { target: { value: "Olaf" } })
  fireEvent.change(inputs[2], { target: { value: "https://frozen.com/olaf" } })

  const form = screen.getByTestId("blog-form")
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("I Love Summer")
  expect(createBlog.mock.calls[0][0].author).toBe("Olaf")
  expect(createBlog.mock.calls[0][0].url).toBe("https://frozen.com/olaf")
})
