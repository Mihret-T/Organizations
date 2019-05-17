describe('Edit Organization page', function () {
    it("loads the page", function () {
        cy.visit('/org-form/1')
    })

    describe("Correct data populated", function(){
        it("Organization Name correct", function(){
             cy.get('.ant-input').first().should('have.value', 'CBE')
        })
        it('Organization Description correct', function(){
            cy.get('.ant-input').last().should('have.value', 'Commercial Bank of Ethiopia' )
        })
    })

    describe("updates an Organization", function () {

        it('Clear button clear the form and disables save button', function(){
            cy.get('.ant-btn-default').click()
            cy.get('.ant-input').first().not('have.value')
            cy.get('.ant-input').last().not('have.value')
        })
        it("save button disabled", function(){
            cy.get(".ant-btn-primary").should('be.disabled')
        })

        it("Submitting the form", function () {
            cy.get('.ant-input').first().type("NBE")
            cy.get('.ant-input').last().type('National Bank of Ethiopia')
            cy.get(".ant-btn-primary").click()
            cy.get(".ant-notification").should('contain', "Organization successfully Updated")
        })

        it("Organization Updated in the list", function () {
            cy.get('tbody tr:first').find("td").eq(0).should('have.text', 'NBE')
            cy.get('tbody tr:first').find("td").eq(1).should('have.text', 'National Bank of Ethiopia')
        })
    })

    describe('navigation works', function () {
        beforeEach(function () {
            cy.visit('/org-form/1')
        })

        it('back button redirects to organization list', function () {
            cy.get('.anticon-arrow-left').click()
            cy.url().should('include', '/organizations')
        })

        it('breadcrum navigation - organization', function () {
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'Organizations').click()
            cy.url().should('include', '/organizations')
        })
    })
})