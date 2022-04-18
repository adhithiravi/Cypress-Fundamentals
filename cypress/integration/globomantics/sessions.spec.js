/// <reference types="cypress" />

context("Sessions page", () => {
  it("should display session information", () => {
    cy.visit("/conference");

    cy.get("h1").contains("View Sessions").click();

    // New url should have /sessions
    cy.url().should("include", "/sessions");

    cy.contains("All Sessions").should("be.visible");
    cy.contains("Wednesday").should("be.visible");
    cy.contains("Thursday").should("be.visible");
    cy.contains("Friday").should("be.visible");
  });
});
