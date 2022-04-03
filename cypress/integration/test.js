/* eslint-disable no-undef */
// describe("Some Test", () => {
//   it("Adds document to test_hello_world collection of Firestore", () => {
//     cy.callFirestore("add", "test_hello_world", { some: "value" });
//   });
// });

describe("Penalty App", () => {
  it("Navigate without connexion", () => {
    cy.visit("http://localhost:3000/");

    cy.findByRole("button", { name: /Connexion/i }).should("exist");

    if (cy.findByRole("button", { name: /Déconnexion/i }).should("exist")) {
      cy.findByRole("button", { name: /Déconnexion/i }).click();
    }

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
    cy.go("back");

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
    cy.get("form").should("exist");
    cy.get("form").within(() => {
      cy.findByRole("textbox", { name: /Email/i }).type("email");
      cy.findByRole("button", { name: /Se connecter/i }).should("exist");
      cy.findByRole("button", { name: /Se connecter/i }).click();
    });
    cy.get("form").within(() => {
      cy.get(".MuiTypography-root")
        .contains("Veuillez renseigner les champs requis")
        .should("be.visible");
    });
    cy.get("form").within(() => {
      cy.findByRole("textbox", { name: /Email/i }).type("email");
      cy.findByLabelText(/Mot de passe/i).type("password");
      cy.findByRole("button", { name: /Se connecter/i }).should("exist");
      cy.findByRole("button", { name: /Se connecter/i }).click();
      // cy.request({
      //   method: "POST",
      //   url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={process.env.REACT_APP_API_KEY}`,
      //   failOnStatusCode: false,
      // }).then((resp) => {
      //   // redirect status code is 302
      //   expect(resp.status).to.eq(400);
      // });
    });
    cy.get("form").within(() => {
      cy.get(".MuiTypography-root")
        .contains("Email ou mot de passe incorrect")
        .should("be.visible");
    });
    cy.get("form").within(() => {
      cy.findByRole("textbox", { name: /Email/i })
        .clear()
        .type("brigadier@gmail.com");
      cy.findByLabelText(/Mot de passe/i)
        .clear()
        .type("Brigadier666");
      cy.findByRole("button", { name: /Se connecter/i }).should("exist");
      cy.findByRole("button", { name: /Se connecter/i }).click();
      // cy.request({
      //   method: "POST",
      //   url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={process.env.REACT_APP_API_KEY}`,
      //   failOnStatusCode: false,
      // }).then((resp) => {
      //   // redirect status code is 302
      //   expect(resp.status).to.eq(200);
      // });
    });
  });
});
