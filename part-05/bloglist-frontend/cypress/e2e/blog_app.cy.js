describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Test User",
      username: "tester",
      password: "P4ssw0rd",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown by default", () => {
    cy.contains("Log in to application")
    cy.contains("username")
    cy.contains("password")
  })
})
