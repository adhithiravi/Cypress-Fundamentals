/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to conference sessions page", () => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();

    cy.url().should("include", "/sessions");
  });
});
