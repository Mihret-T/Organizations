describe("Department list in an organization - Table View", function () {
    beforeEach(function () {
        cy.visit('/departments/1')
    })

    it('data loads when page loads', function () {
        cy.get('tbody').find('tr').should('have.length', 7)
    })

    it('new department button', function () {
        cy.get('.ant-btn').click()
        cy.url().should('include', '/dept-form')
    })
    
    it("loads the details page", function () {
        cy.get('tbody tr').get('.anticon-eye').first().click()
        cy.url().should('include', '/dept-details/101')
    })

    it("loads the edit page", function () {
        cy.get('tbody tr').get('.anticon-edit').first().click()
        cy.url().should('include', '/dept-form/101')
    })

    it('tree view mode laods the departments tree', function () {
        cy.get('.ant-switch-inner').click()
        cy.get('nz-tree')
    })

    describe("deleting a department", function () {
        it("confirmation No", function () {
            cy.get('tbody tr').get('.anticon-delete').first().click()
            cy.get('.ant-modal-body').find('.ant-btn-default').click()
            cy.get('tbody').find('tr').should('have.length', 7)
        })
        it("Deleting a leaf node", function () {
            cy.get('tbody tr').get('.anticon-delete').last().click()
            cy.get('.ant-modal-body').find('.ant-btn-danger').click()
            cy.get('tbody').find('tr').should('have.length', 6)
            cy.get(".ant-notification").should('contain', "Department successfully Deleted")
        })

        it("Deleting a root node", function () {
            cy.get('tbody tr').get('.anticon-delete').first().click()
            cy.get('.ant-modal-body').find('.ant-btn-danger').click()
            cy.get('tbody').find('tr').should('have.length', 0)
            cy.get(".ant-notification").should('contain', "Department successfully Deleted")
        })
    })
    describe('navigation', function () {
        it('back button', function () {
            cy.get('.anticon-arrow-left').click()
            cy.url().should('include', '/org-details/1')
        })

        it('breadcrum navigation works', function () {
            cy.get('nz-page-header').get('nz-breadcrumb nz-breadcrumb-item').find('a').eq(0).click()
            cy.url().should('include', '/organizations')
        })

        it('breadcrum organization name works', function () {
            cy.get('nz-page-header').get('nz-breadcrumb nz-breadcrumb-item').find('a').eq(1).click()
            cy.url().should('include', '/org-details/1')
        })

    })
})

