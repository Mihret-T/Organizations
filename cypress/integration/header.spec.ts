describe("Page Header", function () {
    it('visit page', function () {
        cy.visit('/')
    })
    it('navigates to departmemt list', function () {
        cy.get('[data-cy=nav-departments]').click()
        cy.url().should('include', '/departments')
    })
    it('navigates to organization list', function () {
        cy.get('[data-cy=nav-organizations]').click()
        cy.url().should('include', '/organizations')
    })
})