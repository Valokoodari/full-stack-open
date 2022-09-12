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

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username-input").type("tester")
      cy.get("#password-input").type("P4ssw0rd")
      cy.get("#login-button").click()

      cy.get(".success")
        .contains("Logged in as Test User")
        .should("have.css", "color", "rgb(0, 128, 0)")
    })

    it("fails with wrong credentials", () => {
      cy.get("#username-input").type("tester")
      cy.get("#password-input").type("wrong")
      cy.get("#login-button").click()

      cy.get(".error")
        .contains("Incorrect username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })
})
