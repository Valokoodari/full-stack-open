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

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "tester", password: "P4ssw0rd" })
    })

    it("A blog can be created", () => {
      cy.contains("new blog").click()
      cy.get("#title-input").type("A blog created by cypress")
      cy.get("#author-input").type("Cypress")
      cy.get("#url-input").type("http://localhost:3000")
      cy.get("#submit-button").click()

      cy.contains("A blog created by cypress by Cypress")
    })

    describe("and a blog exists", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "Another blog created by cypress",
          author: "Cypress",
          url: "http://localhost:3000",
        })
      })

      it("it can be liked", () => {
        cy.contains("view").click()
        cy.contains("like").click()
        cy.contains("likes 1")
      })

      it("it can be deleted by the user who created it", () => {
        cy.contains("view").click()
        cy.contains("remove").click()
        cy.get("#blog-list").should("not.contain", "Another blog created by cypress")
      })

      it("it cannot be deleted by another user", () => {
        const user = {
          name: "Another User",
          username: "another",
          password: "S3cr3t",
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.login({ username: "another", password: "S3cr3t" })
        cy.contains("view").click()
        cy.get("#blog-list").should("not.contain", "remove")
      })
    })

    describe("and multiple blogs exist", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "Another blog created by cypress",
          author: "Cypress",
          url: "http://localhost:3000",
        })
        cy.createBlog({
          title: "Yet another blog created by cypress",
          author: "Cypress",
          url: "http://localhost:3000",
        })
        cy.createBlog({
          title: "The last blog created by cypress",
          author: "Cypress",
          url: "http://localhost:3000",
        })

        cy.get(".blog").eq(0).contains("view").click()
        cy.get(".blog").eq(1).contains("view").click()
        cy.get(".blog").eq(2).contains("view").click()

        cy.get(".blog").eq(0).contains("like").click()
        cy.get(".blog").eq(0).contains("like").click()
        cy.get(".blog").eq(0).contains("like").click()
        cy.get(".blog").eq(2).contains("like").click()
      })

      it("the blogs are ordered by likes", () => {
        cy.get(".blog").eq(0).should("contain", "likes 3")
          .should("contain", "Another blog created by cypress")
        cy.get(".blog").eq(1).should("contain", "likes 1")
          .should("contain", "The last blog created by cypress")
        cy.get(".blog").eq(2).should("contain", "likes 0")
          .should("contain", "Yet another blog created by cypress")
      })
    })
  })
})
