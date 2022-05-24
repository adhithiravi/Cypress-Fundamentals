/// <reference types="cypress" />

const responseData = {
  data: {
    speakers: [
      {
        id: "78170",
        bio: "blah blah blah",
        name: "Adhithi Ravichandran",
        sessions: [
          {
            id: "123",
            name: "Cypress 9 Fundamentals",
            __typename: "Session",
          },
        ],
        __typename: "Speaker",
      },
    ],
  },
};

describe("Speakers page", () => {
  beforeEach(() => {
    cy.visit("/conference");
    cy.intercept("POST", "http://localhost:4000/graphql", responseData).as(
      "fetchSpeakers"
    );
    cy.get("h1").contains("View Speakers").click();
    cy.url().should("include", "/speakers");
  });

  it("should display all speaker information", () => {
    cy.wait("@fetchSpeakers");
    cy.get("[data-cy=speakerName]").should("have.length", 1);
    cy.get("[data-cy=bio]").should("have.length", 1);
    cy.get("[data-cy=sessionList]").should("have.length", 1);
  });
});
