/* eslint-disable no-undef */
describe("Some Test", () => {
  it("Adds document to test_hello_world collection of Firestore", () => {
    cy.callFirestore("add", "test_hello_world", { some: "value" });
  });
});

describe("Penalty App", () => {
  it("Navigate without connexion", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("button", { name: /Connexion/i }).should("exist");

    if (cy.findByRole("button", { name: /Connexion/i }).should("exist")) {
      cy.findByRole("button", { name: /Galerie/i }).should(
        "have.class",
        "Mui-disabled"
      );
    }

    cy.findByRole("button", { name: /Accueil/i }).should("exist");
    cy.findByRole("button", { name: /Liste des contraventions/i }).should(
      "exist"
    );
    cy.findByRole("button", { name: /Dresser un procès-verbal/i }).should(
      "exist"
    );
    cy.findByRole("button", { name: /Galerie/i }).should("exist");
    cy.findByRole("button", { name: /Beu Game/i }).should("exist");

    cy.findByRole("button", { name: /Liste des contraventions/i }).click();
    cy.get("[data-testid=EditIcon]").first().click();
    if (cy.get('[type="checkbox"]').uncheck()) {
      cy.get('input[name="number"]').should("not.be.disabled");
    } else if (cy.get('[type="checkbox"]').check()) {
      cy.get('input[name="number"]').should("be.disabled");
    }
    cy.findByRole("button", { name: /Confirmer les modifications/i }).should(
      "not.exist"
    );
    cy.findByRole("button", { name: /Annuler/i }).click();

    cy.findByRole("button", { name: /Dresser un procès-verbal/i }).click();
    cy.findByRole("textbox", { name: /Motif/i }).should("exist");
    cy.get('input[name="number"]').should("exist");
    cy.findByRole("textbox", { name: /Commentaire/i }).should("exist");

    if (
      cy
        .get(".MuiTypography-root")
        .contains("Veuillez vous connecter")
        .should("exist")
    ) {
      cy.findByRole("button", { name: /Valider le procès-verbal/i }).should(
        "not.exist"
      );
    }
    cy.findByRole("button", { name: /Beu Game/i }).click();
    cy.findByRole("heading", { name: /Beu Game/i }).should("exist");
    cy.get(".MuiCardMedia-root").should("be.visible");
  });

  it("Connexion", () => {
    cy.findByRole("button", { name: /Connexion/i }).click();
  });
});
