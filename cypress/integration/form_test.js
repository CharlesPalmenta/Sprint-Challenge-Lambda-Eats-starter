describe('Testing the pizza order form', function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza/");
    });
    it("add text to input check multiple boxes and submit", function () {
        cy.get('[data-cy="name"]').type("Customer").should("have.value", "Customer");
        cy.get('[data-cy="size"]').select("Medium").should("have.value", "medium");
        cy.get('[data-cy="pepperoni"]').check().should("be.checked");
        cy.get('[data-cy="bacon"]').check().should("be.checked");
        cy.get('[data-cy="onions"]').check().should("be.checked");
        cy.get('[data-cy="submit"]').click()
    });
});