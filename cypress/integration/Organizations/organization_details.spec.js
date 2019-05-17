describe('Organization Details page', function () {
    beforeEach(function () {
        cy.visit('org-details/1')
    })
   
    it("correct data displayed", function () {
        cy.get('p').contains('CBE')
        cy.get('.ng-star-inserted').contains('Commercial Bank of Ethiopia')
    })

    describe("Links and Buttons", function () {
    
        it('View departments link navigates to departments list', function () {
            cy.get('.ant-card-body').find('a').click()
            cy.url().should('include', 'departments/1')
        })

        it('Edit button navigates to edit page', function () {
            cy.get('.ant-btn-default').click()
            cy.url().should('include', 'org-form/1')
        })

        describe("deleting an elemet", function () {
            it("confirmation No", function () {
                cy.get('.ant-btn-danger').click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
            })
            it("Confirmation yes", function () {
                cy.get('.ant-btn-danger').click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.url().should('include', '/organizations')
                cy.get('tbody').find('tr').should('have.length', 4)
                cy.get(".ant-notification").should('contain', "Organization successfully Deleted")
            })
        })
    })
    describe('navigation works', function () {

        it('back button redirects to organization list', function () {
            cy.get('.anticon-arrow-left').click()
            cy.url().should('include', '/organizations')
        })

        it('breadcrum navigation works', function () {
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'Organizations').click()
            cy.url().should('include', '/organizations')
        })
    })
})

