describe('Department Details page', function () {
    beforeEach(function () {
        cy.visit('dept-details/101')
    })

    it("correct data displayed", function () {
        cy.get('[data-cy=name]').contains('CEO')
        cy.get('[data-cy=description]').contains('Chief Executive Officer')
        cy.get('[data-cy=parent]').contains('None')
        cy.get('[data-cy=organization]').contains('CBE')
    })

    describe("Links and Buttons", function () {

        it('View Organization link navigates to organization details', function () {
            cy.get('[data-cy=organization_link]').click()
            cy.url().should('include', 'org-details/1')
        })

        it('Edit button navigates to edit page', function () {
            cy.get('[data-cy=edit]').click()
            cy.url().should('include', 'dept-form/101')
        })

        describe("deleting a department", function () {
            it("confirmation No", function () {
                cy.get('[data-cy=delete]').click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
            })
            it("Confirmation yes", function () {
                cy.get('[data-cy=delete]').click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.url().should('include', '/departments/1')
                cy.get('[data-cy=departments]').should('have.length', 0)
                cy.get(".ant-notification").should('contain', "Department successfully Deleted")
            })
        })
    })

    describe('navigation works', function () {

        it('back button redirects to organizations department list', function () {
            cy.get('[data-cy=header]').get('.anticon-arrow-left').click()
            cy.url().should('include', '/departments/1')
        })

        it('breadcrum navigation - departments', function () {
            cy.get('[data-cy=bc_departments]').click()
            cy.url().should('include', '/departments/1')
        })
        it('breadcrum navigation - organization name', function () {
            cy.get('[data-cy=bc_details]').click()
            cy.url().should('include', '/org-details/1')
        })

        it('breadcrum navigation - organization', function () {
            cy.get('[data-cy=bc_organizations]').click()
            cy.url().should('include', '/organizations')
        })
    })
})

