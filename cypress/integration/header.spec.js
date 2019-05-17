describe("Page Header", function(){
    it('visit page', function(){
        cy.visit('/')
    })
    it('navigates to departmemt list', function(){
        cy.get('.ant-menu').find('li').contains('Departments').click()
        cy.url().should('include', '/departments')
    })
    it('navigates to organization list', function () {
        cy.get('.ant-menu').find('li').contains('Organizations').click()
        cy.url().should('include', '/organizations')
    })
})