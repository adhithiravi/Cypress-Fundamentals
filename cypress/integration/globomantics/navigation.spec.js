/// <reference types="cypress" />

context("Navigation", () => {
  it("should navigate to sessions page", () => {
    cy.visit("/conference");

    cy.get("h1").contains("View Sessions");
  });
});
