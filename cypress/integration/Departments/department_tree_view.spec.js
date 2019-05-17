describe("departemnt list Tree view", function () {
    beforeEach(function () {
        cy.visit('/departments/1')
        cy.get('.ant-switch-inner').click()
    })

    it('data loads when page loads', function () {
        cy.get('nz-tree').find('.ant-tree-title').should('have.length', 7)
    })

    it('new department button', function () {
        cy.get('.ant-btn').click()
        cy.url().should('include', '/dept-form')

    })
    it("click on tree elemet redirects to departments details page", function () {
        cy.get('nz-tree').find('.ant-tree-title').first().click()
        cy.url().should('include', '/dept-details/101')
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

describe('Tree view with empty data', function(){
    it('visit page with empty data', function(){
        cy.visit('departments/5')
        cy.get('.ant-switch-inner').click()

    })
    it('displays empty message', function(){
        cy.get('nz-empty')
    })
    it('add department button ', function(){
        cy.get('nz-empty').find('.ant-btn-primary').click()
        cy.url().should('include', 'dept-form')
    })
})
