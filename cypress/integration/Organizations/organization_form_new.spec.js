describe('New Organization page', function () {
    it("loads the page", function () {
        cy.visit('/org-form')
    })

    it("Save button is disabled", function () {
        cy.get(".ant-btn-primary").should('be.disabled')
    })

    it('displays help text', function () {
        cy.get('.ant-input').first().click()
        cy.get('.ant-input').last().click()
        cy.get('.ng-trigger-helpMotion')
    })

    it("clear button resets the form", function () {
        cy.get('.ant-input').first().type('New')
        cy.get('.ant-input').last().type('New Organization')
        cy.get('.ant-btn-default').click()
        cy.get('.ant-input').first().not('have.value')
        cy.get('.ant-input').last().not('have.value')
    })
    
    it('cancel button redirects to the list of organizations', function () {
        cy.get('.ant-btn-danger').click()
        cy.url().should('include', '/organizations')
    })

    describe("Creating a New Organization", function () {
        it("visit", function() {
            cy.visit('/org-form')
        })

        it("Form submitted", function () {
            cy.get('.ant-input').first().type('New')
            cy.get('.ant-input').last().type('New Organization')
            cy.get(".ant-btn-primary").not('[disabled]').click()
            cy.get(".ant-notification").should('contain', "Organization successfully Added")
        })
        it("New Organization Added to the list", function () {
            cy.get('tbody').find('tr').should('have.length', 6)
            cy.get('tbody tr:last').find("td").eq(0).should('have.text', 'New')
            cy.get('tbody tr:last').find("td").eq(1).should('have.text', 'New Organization')
        })
    })

    describe('navigation works', function () {
        beforeEach(function () {
            cy.visit('/org-form')
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

