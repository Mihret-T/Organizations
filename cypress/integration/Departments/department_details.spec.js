describe('Department Details page', function () {
    beforeEach(function () {
        cy.visit('dept-details/101')
    })
   
    it("correct data displayed", function () {
        cy.get('p').contains('CEO')
        cy.get('.ant-card-body').eq(0).contains('Chief Executive Officer')
        cy.get('.ant-card-body').eq(1).contains('None')
        cy.get('.ant-card-body').eq(2).contains('CBE')
    })

    describe("Links and Buttons", function () {
    
        it('View Organization link navigates to organization details', function () {
            cy.get('.ant-card-body').find('a').click()
            cy.url().should('include', 'org-details/1')
        })

        it('Edit button navigates to edit page', function () {
            cy.get('.ant-btn-default').click()
            cy.url().should('include', 'dept-form/101')
        })

        describe("deleting a department", function () {
            it("confirmation No", function () {
                cy.get('.ant-btn-danger').click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
            })
            it("Confirmation yes", function () {
                cy.get('.ant-btn-danger').click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.url().should('include', '/departments/1')
                cy.get('tbody').find('tr').should('have.length', 0)
                cy.get(".ant-notification").should('contain', "Department successfully Deleted")
            })
        })
    })

    describe('navigation works', function () {

        it('back button redirects to organizations department list', function () {
            cy.get('.anticon-arrow-left').click()
            cy.url().should('include', '/departments/1')
        })

        it('breadcrum navigation - departments', function () {
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'Departments').click()
            cy.url().should('include', '/departments/1')
        })
        it('breadcrum navigation - organization name', function(){
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'CBE').click()
            cy.url().should('include', '/org-details/1')
        })

        it('breadcrum navigation - organization', function(){
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'Organizations').click()
            cy.url().should('include', '/organizations')
        }) 
    })
})

