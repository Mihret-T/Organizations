describe('Organization List (Home) Page', function () {
    beforeEach(function () {
        cy.visit('/')
    })

    it('redirects to the organization page', function () {
        const baseUrl = '/organizations'
        cy.url().should('include', baseUrl )
    })

    it("loads new organizatation form", function () {
        cy.get('[data-cy=new_organization]').click()
        cy.url().should('include', '/org-form')
    })

     describe("Table data", function () {
        const organizations = '[data-cy=organizations_list]';
         const view = '[data-cy=org_details]';
         const edit = '[data-cy=edit_org]';
         const deleteOrg = '[data-cy=delete_org]';
        
        it('data loads when page loads', function () {
            cy.get(organizations).should('have.length', 5)
        })

        it("loads the details page", function () {
            cy.get(organizations).get(view).first().click()
            cy.url().should('include', '/org-details/1')
        })

        it("loads the edit page", function () {
            cy.get(organizations).get(edit).first().click()
            cy.url().should('include', '/org-form/1')
        })

        describe("deleting an elemet", function () {
            it("confirmation No", function () {
                cy.get(organizations).get(deleteOrg).first().click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
               cy.get(organizations).should('have.length', 5)
            })
            it("Confirmation yes", function () {
                cy.get(organizations).get(deleteOrg).first().click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.get(organizations).should('have.length', 4)
                cy.get(".ant-notification").should('contain', "Organization successfully Deleted")
            })
        })
   })
})