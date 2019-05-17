describe('All Departments List Page', function () {
    beforeEach(function () {
        cy.visit('/departments')
    })

    it("New department button loads department form page", function () {
        cy.get('.ant-btn').click()
        cy.url().should('include', '/dept-form')
    })

    describe("Table data", function () {

        it('data loads when page loads', function () {
            cy.get('tbody').find('tr').should('have.length', 13)
        })

        it("loads the details page", function () {
            cy.get('tbody tr').get('.anticon-eye').first().click()
            cy.url().should('include', '/dept-details/101')
        })

        it("loads the edit page", function () {
            cy.get('tbody tr').get('.anticon-edit').first().click()
            cy.url().should('include', '/dept-form/101')
        })

        describe("deleting a department", function () {
            it("confirmation No", function () {
                cy.get('tbody tr').get('.anticon-delete').first().click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
                cy.get('tbody').find('tr').should('have.length', 13)
            })
            it("Confirmation yes", function () {
                cy.get('tbody tr').get('.anticon-delete').first().click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.get('tbody').find('tr').should('have.length', 6)
                cy.get(".ant-notification").should('contain', "Department successfully Deleted")
            })
        })
    })
})

