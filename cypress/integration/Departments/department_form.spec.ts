describe("Department Form", function () {
    const submit = '[data-cy=submit]';
    const name_field = '[data-cy=name]';
    const desc_field = '[data-cy=description]';
    const org_field = '[data-cy=organization]';
    const parent_field = '[data-cy=parent]';
    const departments = '[data-cy=departments_list]';

        describe("buttons and help texts", function () {
            beforeEach(function () {
                cy.visit('/dept-form')
            })

            it("Save button disabled", function () {
                cy.get(submit).should('be.disabled')
            })

            it('displays help text', function () {
                cy.get(name_field).click()
                cy.get(desc_field).click()
                cy.get(org_field).click()
                cy.get('[data-cy=helpText]').should('have.length', 2)
            })

            it('cancel button redirects to the list of departments', function () {
                cy.get('[data-cy=cancel]').click()
                cy.url().should('include', '/departments')
            })
        })

        describe("Adding new Department in an empty organization", function () {

            it("visit", function () {
                cy.visit('/dept-form')
            })

            describe('Insert and Select the departments details', function () {

                it("Enter Department name and description", function () {
                    cy.get(name_field).type('New')
                    cy.get(desc_field).type('New Department')
                })

                it('All organization Name avaliable to be selected', function () {
                    cy.get(org_field).click()
                    cy.get('.ant-select-dropdown-menu-item').should('have.length', 5).last().click()
                })
                it('Only a None option available while selecting parent department', function () {
                    cy.get(parent_field).last().click()
                    cy.get('.ant-select-dropdown-menu-item').should('have.length', 1).click()
                })

                it('form Submitted', function () {
                    cy.get(submit).not('[disabled]').click()
                    cy.get(".ant-notification").should('contain', "Department successfully Added")
                })

                it("New department correctly Added to the list", function () {
                    cy.get(departments).should('have.length', 1)
                    cy.get(departments).find('[data-cy=name]').should('have.text', 'New')
                    cy.get(departments).find('[data-cy=description]').should('have.text', 'New Department')
                    cy.get(departments).find('[data-cy=organization]').should('have.text', 'ERC')
                    cy.get(departments).find('[data-cy=parent]').should('have.text', 'None')
                })
            })
        })

        describe("Adding a new department in organization with multiple departments", function () {

            it("visit", function () {
                cy.visit('/dept-form')
            })

            describe('Insert and select the department details', function () {

                it("Enter Name and Description of the ddepartment", function () {
                    cy.get(name_field).type('New')
                    cy.get(desc_field).type('New Department')
                })

                it('All organization Name avaliable to be selected', function () {
                    cy.get(org_field).click()
                    cy.get('.ant-select-dropdown-menu-item').should('have.length', 5).first().click()
                })

                it('All departments inside the organization selected avaliable', function () {
                    cy.get(parent_field).click()
                    cy.get('.ant-select-dropdown-menu-item').should('have.length', 8).first().click()
                })

                it('Form Submitted', function () {
                    cy.get(submit).not('[disabled]').click()
                    cy.get(".ant-notification").should('contain', "Department successfully Added")
                })

                it("New department Added to the list", function () {
                    cy.get(departments).should('have.length', 8)
                    cy.get(departments).last().find('[data-cy=name]').should('have.text', 'New')
                    cy.get(departments).last().find('[data-cy=description]').should('have.text', 'New Department')
                    cy.get(departments).last().find('[data-cy=organization]').should('have.text', 'CBE')
                    cy.get(departments).last().find('[data-cy=parent]').should('have.text', 'CEO')
                })
            })
        })

    describe('Edit Organization page', function () {
        
        it("loads the page", function () {
            cy.visit('/dept-form/101')
        })

        describe("Correct data populated", function () {
            it("Department Name correct", function () {
                cy.get(name_field).should('have.value', 'CEO')
            })
            it('Departmetn Description correct', function () {
                cy.get(desc_field).should('have.value', 'Chief Executive Officer ')
            })
            it('Department Organizations correct', function () {
                cy.get('.ant-select-selection-selected-value').first().should('have.text', ' CBE ')
            })
            it('parent Department correct', function () {
                cy.get('.ant-select-selection-selected-value').last().should('have.text', ' None ')
            })
        })

        describe("updates an Organization", function () {

            it('Clear button clear the form and disables save button', function () {
                cy.get('[data-cy=clear]').click()
                cy.get(name_field).not('have.value')
                cy.get(desc_field).not('have.value')
            })

            it("save button disabled", function () {
                cy.get(submit).should('be.disabled')
            })

            it("Submitting the form", function () {
                cy.get(name_field).type("COO")
                cy.get(desc_field).type('Chief Operating Officer')
                cy.get(parent_field).click()
                cy.get('.ant-select-dropdown-menu-item').should('have.length', 1).first().click()
                cy.get(submit).click()
                cy.get(".ant-notification").should('contain', "Department successfully Updated")
            })

            it("Department Updated in the list", function () {
                cy.get(departments).find('[data-cy=name]').first().should('have.text', 'COO')
                cy.get(departments).find('[data-cy=description]').first().should('have.text', 'Chief Operating Officer')
            })
        })
    })

    describe('navigation works', function () {
        beforeEach(function () {
            cy.visit('/dept-form')
        })

        it('back button redirects to department list', function () {
            cy.get('[data-cy=header]'). get('.anticon-arrow-left').click()
            cy.url().should('include', '/departments')
        })

        it('breadcrum navigation works', function () {
            cy.get('[data-cy=header]').find('[data-cy=bc_departments]').click()
            cy.url().should('include', '/departments')
        })
    })

})