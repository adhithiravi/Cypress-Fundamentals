/// <reference types="cypress" />

describe("Sessions page", () => {
  // Run before each test in this describe block
  beforeEach(() => {
    cy.visit("/conference");
    cy.get("h1").contains("View Sessions").click();
    cy.url().should("include", "/sessions");

    // Define aliases here
    cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
    cy.get("[data-cy=Wednesday]").as("WednesdayBtn");
    cy.get("[data-cy=Thursday]").as("ThursdayBtn");
    cy.get("[data-cy=Friday]").as("FridayBtn");
  });

  it("should navigate to conference sessions page and view day filter buttons", () => {
    // Validate that buttons to filter by day exists
    cy.get("@AllSessionsBtn");
    cy.get("@WednesdayBtn");
    cy.get("@ThursdayBtn");
    cy.get("@FridayBtn");
  });

  it("should filter sessions and ony display Wednesday sessions when Wednesday button is clicked", () => {
    cy.get("@WednesdayBtn").click();

    // Assertion
    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and ony display Thursday sessions when Thursday button is clicked", () => {
    cy.get("@ThursdayBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("not.exist");
  });

  it("should filter sessions and ony display Friday sessions when Friday button is clicked", () => {
    cy.get("@FridayBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
    cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });

  it("should filter sessions and display all sessions when All Sessions button is clicked", () => {
    cy.get("@AllSessionsBtn").click();

    cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
    cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
    cy.get("[data-cy=day]").contains("Friday").should("be.visible");
  });
});
