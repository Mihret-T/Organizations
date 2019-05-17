describe('New Organization page', function () {

    describe("buttons and help texts", function(){
         beforeEach(function () {
            cy.visit('/dept-form')
        })
        
        it("Save button disabled", function () {
            cy.get(".ant-btn-primary").should('be.disabled')
        })

        it('displays help text', function () {
            cy.get('.ant-input').first().click()
            cy.get('.ant-input').last().click()
            cy.get('.ant-select-selection').first().click()
            cy.get('.ng-trigger-helpMotion').should('have.length', 2)
        })

        it('cancel button redirects to the list of departments', function () {
            cy.get('.ant-btn-danger').click()
            cy.url().should('include', '/departments')
        })
    })
    

    describe("Adding new Department in an empty organization", function () {
        it("visit", function () {
            cy.visit('/dept-form')
        })

        describe('Insert and Select the departments details', function () {

            it("Enter Department name and description", function () {
                cy.get('.ant-input').first().type('New')
                cy.get('.ant-input').last().type('New Department')
            })

            it('All organization Name avaliable to be selected', function () {
                cy.get('nz-select').first().click()
                cy.get('.ant-select-dropdown-menu-item').should('have.length', 5).last().click()
            })
            it('Only a None option available while selecting parent department', function () {
                cy.get('nz-select').last().click()
                cy.get('.ant-select-dropdown-menu-item').should('have.length', 1).click()
            })

            it('form Submitted', function () {
                cy.get(".ant-btn-primary").not('[disabled]').click()
                cy.get(".ant-notification").should('contain', "Department successfully Added")
            })

            it("New department correctly Added to the list", function () {
                cy.get('tbody').find('tr').should('have.length', 1)
                cy.get('tbody tr').find("td").eq(0).should('have.text', 'New')
                cy.get('tbody tr').find("td").eq(1).should('have.text', 'New Department')
                cy.get('tbody tr').find("td").eq(2).should('have.text', 'ERC')
                cy.get('tbody tr').find("td").eq(3).should('have.text', 'None')
            })
        })
    })

    describe("Adding a new department in organization with multiple departments", function () {
        it("visit", function () {
            cy.visit('/dept-form')
        })

        describe('Insert and select the department details', function () {

            it("Enter Name and Description of the ddepartment", function () {
                cy.get('.ant-input').first().type('New')
                cy.get('.ant-input').last().type('New Department')

            })
            it('All organization Name avaliable to be selected', function () {
                cy.get('nz-select').first().click()
                cy.get('.ant-select-dropdown-menu-item').should('have.length', 5).first().click()
            })

            it('All departments inside the organization selected avaliable', function () {
                cy.get('nz-select').last().click()
                cy.get('.ant-select-dropdown-menu-item').should('have.length', 8).first().click()
            })

            it('Form Submitted', function () {
                cy.get(".ant-btn-primary").not('[disabled]').click()
                cy.get(".ant-notification").should('contain', "Department successfully Added")
            })

            it("New department Added to the list", function () {
                cy.get('tbody').find('tr').should('have.length', 8)
                cy.get('tbody tr:last').find("td").eq(0).should('have.text', 'New')
                cy.get('tbody tr:last').find("td").eq(1).should('have.text', 'New Department')
                cy.get('tbody tr:last').find("td").eq(2).should('have.text', 'CBE')
                cy.get('tbody tr:last').find("td").eq(3).should('have.text', 'CEO')
            })
        })
    })

    describe('navigation works', function () {
        beforeEach(function () {
            cy.visit('/dept-form')
        })

        it('back button redirects to department list', function () {
            cy.get('.anticon-arrow-left').click()
            cy.url().should('include', '/departments')
        })

        it('breadcrum navigation works', function () {
            cy.get('nz-page-header').find('nz-breadcrumb').contains('nz-breadcrumb-item', 'Departments').click()
            cy.url().should('include', '/departments')
        })
    })
})

