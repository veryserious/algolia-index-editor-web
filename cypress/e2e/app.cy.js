describe("Algolia results are displayed", () => {
  it("checks that the search results load on input to search bar", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".ais-SearchBox-input").type("iPhone");
    cy.get(".ais-Hits-list").should("be.visible");
  });
});

/**
 * API Testing
 * See https://www.algolia.com/doc/rest-api/search for API documentation
 *  */
describe("Algolia Service Testing", () => {
  let searchResults;
  it("gets search results from the algolia service - GET", () => {
    // https://www.algolia.com/doc/rest-api/search/#search-index-get
    cy.request({
      method: "GET",
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm`, // put index in env file
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("hits");
      expect(response.body.hits).to.be.an("array");
      searchResults = response.body.results;
    });
  });
});

/**
 * Application API Testing
 */
describe("Algolia Application API Testing - Incorrect Creds - Delete", () => {
  it("checks that we cannot delete objects with our search API key", () => {
    // https://www.algolia.com/doc/rest-api/search/#delete-objects
    cy.request({
      method: "DELETE",
      failOnStatusCode: false, // make sure we do not fail the test prematurely on a 403
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm/1`, // run a test on a specific object
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});

describe("Algolia Application API Testing - Incorrect Cred - Post", () => {
  it("checks that we cannot post objects with our search API key", () => {
    // https://www.algolia.com/doc/rest-api/search/#add-objects
    cy.request({
      method: "POST",
      failOnStatusCode: false, // make sure we do not fail the test prematurely on a 403
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm`, // run a test on a specific object
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_KEY"),
      },
      body: {
        objectID: "1234",
        name: "test",
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});

// NB: Our application cannot post objects yet, but we can test the services appility to do so
describe("Algolia Application API Testing - Correct Creds - POST", () => {
  it("checks that we can post objects with our write access API key", () => {
    // https://www.algolia.com/doc/rest-api/search/#add-objects
    cy.request({
      method: "POST",
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm`, // run a test on a specific object
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_WRTIE_KEY"),
      },
      body: {
        objectID: "1234",
        name: "Luke Skywalker",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("objectID");
      expect(response.body.objectID).to.eq("1234");
    });
  });
});

describe("Algolia Application API Testing - Correct Creds - POST (Partial Update)", () => {
  it("checks that we can post objects and partiall update our records with our write access API key", () => {
    // https://www.algolia.com/doc/rest-api/search/#partial-update-objects
    cy.request({
      method: "POST",
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm/1234/partial`, // run a test on a specific object
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_WRTIE_KEY"),
      },
      body: {
        name: "Luke Skywalker",
        age: 19,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("objectID");
      expect(response.body.objectID).to.eq("1234");
    });
  });
});

describe("Algolia Application API Testing - Correct Creds - Delete", () => {
  it("checks that we can delete objects with our write access API key", () => {
    // https://www.algolia.com/doc/rest-api/search/#delete-objects
    cy.request({
      method: "DELETE",
      url: `https://${Cypress.env(
        "ALGOLIA_APP_ID"
      )}-dsn.algolia.net/1/indexes/ecomm/1234`, // run a test on the 1234 object we created
      headers: {
        "X-Algolia-Application-Id": Cypress.env("ALGOLIA_APP_ID"),
        "X-Algolia-API-Key": Cypress.env("ALGOLIA_API_WRTIE_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("deletedAt");
      expect(response.body.deletedAt).to.be.a("string");
    });
  });
});
