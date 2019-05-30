describe('List of Departments', function () {
    const departments = '[data-cy=departments_list]';
    const newDept = '[data-cy=new_department]';
    const view = '[data-cy=view]';
    const edit = '[data-cy=edit]';
    const deleteDept = '[data-cy=delete]';
    const nav_organizations = '[data-cy=bc_organizations]';
    const nav_details = '[data-cy=bc_details]';

    describe('All Departments List Page', function () {

        beforeEach(function () {
            cy.visit('/departments')
        })

        it("New department button loads department form page", function () {
            cy.get(newDept).click()
            cy.url().should('include', '/dept-form')
        })

        describe("Table data", function () {

            it('data loads when page loads', function () {
                cy.get(departments).should('have.length', 13)
            })

            it("loads the details page", function () {
                cy.get(departments).get(view).first().click()
                cy.url().should('include', '/dept-details/101')
            })

            it("loads the edit page", function () {
                cy.get(departments).get(edit).first().click()
                cy.url().should('include', '/dept-form/101')
            })

            describe("deleting a department", function () {
                it("confirmation No", function () {
                    cy.get(departments).get(deleteDept).first().click()
                    cy.get('.ant-modal-body').find('.ant-btn-default').click()
                    cy.get('tbody').find('tr').should('have.length', 13)
                })
                it("Confirmation yes", function () {
                    cy.get(departments).get(deleteDept).first().click()
                    cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                    cy.get(departments).should('have.length', 6)
                    cy.get(".ant-notification").should('contain', "Department successfully Deleted")
                })
            })
        })
    })

    describe("Department list in an organization - Table View", function () {

        beforeEach(function () {
            cy.visit('/departments/1')
        })

        it('data loads when page loads', function () {
            cy.get(departments).should('have.length', 7)
        })

        it('new department button', function () {
            cy.get(newDept).click()
            cy.url().should('include', '/dept-form')
        })

        it("loads the details page", function () {
            cy.get(departments).get(view).first().click()
            cy.url().should('include', '/dept-details/101')
        })

        it("loads the edit page", function () {
            cy.get(departments).get(edit).first().click()
            cy.url().should('include', '/dept-form/101')
        })

        it('tree view mode laods the departments tree', function () {
            cy.get('[data-cy=mode]').click()
            cy.get('nz-tree')
        })

        describe("deleting a department", function () {
            it("confirmation No", function () {
                cy.get(departments).get(deleteDept).first().click()
                cy.get('.ant-modal-body').find('.ant-btn-default').click()
                cy.get(departments).should('have.length', 7)
            })
            it("Deleting a leaf node", function () {
                cy.get(departments).get(deleteDept).last().click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.get(departments).should('have.length', 6)
                cy.get(".ant-notification").should('contain', "Department successfully Deleted")
            })

            it("Deleting a root node", function () {
                cy.get('tbody tr').get('.anticon-delete').first().click()
                cy.get('.ant-modal-body').find('.ant-btn-danger').click()
                cy.get(departments).should('have.length', 0)
                cy.get(".ant-notification").should('contain', "Department successfully Deleted")
            })
        })
    })

    describe("departemnt list Tree view", function () {
        beforeEach(function () {
            cy.visit('/departments/1')
            cy.get('[data-cy=mode]').click()
        })

        it('data loads when page loads', function () {
            cy.get('[data-cy=tree]').find('.ant-tree-title').should('have.length', 7)
        })

        it('new department button', function () {
            cy.get(newDept).click()
            cy.url().should('include', '/dept-form')

        })
        it("click on tree elemet redirects to departments details page", function () {
            cy.get('[data-cy=tree]').find('.ant-tree-title').first().click()
            cy.url().should('include', '/dept-details/101')
        })
    })

    describe('Tree view with empty data', function () {
        it('visit page with empty data', function () {
            cy.visit('departments/5')
            cy.get('[data-cy=mode]').click()

        })
        it('displays empty message', function () {
            cy.get('[data-cy=empty]')
        })
        it('add department button ', function () {
            cy.get('[data-cy=empty]').find(newDept).click()
            cy.url().should('include', 'dept-form')
        })
    })

    describe('navigation', function () {
        beforeEach(function () {
            cy.visit('/departments/1')
        })
        it('back button', function () {
            cy.get('[data-cy=header]').get('.anticon-arrow-left').click()
            cy.url().should('include', '/org-details/1')
        })

        it('breadcrum navigation works', function () {
            cy.get('[data-cy=header]').get(nav_organizations).click()
            cy.url().should('include', '/organizations')
        })

        it('breadcrum organization name works', function () {
            cy.get('[data-cy=header]').get(nav_details).find('a').click()
            cy.url().should('include', '/org-details/1')
        })
    })
})




