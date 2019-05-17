describe('Organization List (Home) Page', function () {
    beforeEach(function () {
        cy.visit('/')
    })

    it('redirects to the organization page', function () {
        cy.url().should('include', '/organizations')
    })
    
    it("loads new organizatation form", function () {
        cy.get('.ant-btn').click()
        cy.url().should('include', '/org-form')
    })

    describe("Table data", function () {

        it('data loads when page loads', function () {
            cy.get('tbody').find('tr').should('have.length', 5)
        })

        it("loads the details page", function () {
            cy.get('tbody tr').get('.anticon-eye').first().click()
            cy.url().should('include', '/org-details/1')
        })

        it("loads the edit page", function () {
            cy.get('tbody tr').get('.anticon-edit').first().click()
            cy.url().should('include', '/org-form/1')
        })

        describe("deleting an elemet", function () {
            it("confirmation No", function () {
                cy.get('tbody tr').get('.anticon-delete').first().click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
                cy.get('tbody').find('tr').should('have.length', 5)
            })
            it("Confirmation yes", function () {
                cy.get('tbody tr').get('.anticon-delete').first().click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.get('tbody').find('tr').should('have.length', 4)
                cy.get(".ant-notification").should('contain', "Organization successfully Deleted")
             })
        })
    })
})