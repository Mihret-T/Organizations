describe("Organization Form", function () {
    const nameField = '[data-cy=name_field]';
    const descField = '[data-cy=description-field]';
    const submit = '[data-cy=submit]';
    const organizations = '[data-cy=organizations_list]';

    it("loads the page", function () {
        cy.visit('/org-form')
    })

    it("Save button is disabled", function () {
        cy.get(submit).should('be.disabled')
    })

    it('displays help text', function () {
        cy.get(nameField).click()
        cy.get(descField).click()
        cy.get('[data-cy=helpText]')
    })

    it("clear button resets the form", function () {
        cy.get(nameField).type('New')
        cy.get(descField).type('New Organization')
        cy.get('[data-cy=clear]').click()
        cy.get(nameField).not('have.value')
        cy.get(descField).not('have.value')
    })

    it('cancel button redirects to the list of organizations', function () {
        cy.get('[data-cy=cancel]').click()
        cy.url().should('include', '/organizations')
    })

    describe("Creating a New Organization", function () {
        it("visit", function () {
            cy.visit('/org-form')
        })

        it("Form submitted", function () {
            cy.get(nameField).type('New')
            cy.get(descField).type('New Organization')
            cy.get(submit).not('[disabled]').click()
            cy.get(".ant-notification").should('contain', "Organization successfully Added")
        })
        it("New Organization Added to the list", function () {
            cy.get(organizations).should('have.length', 6)
            cy.get(organizations).last().find('[data-cy=name]').should('have.text', 'New')
            cy.get(organizations).last().find('[data-cy=description]').should('have.text', 'New Organization')
        })



    })

    describe('Edit Organization page', function () {
        it("loads the page", function () {
            cy.visit('/org-form/1')
        })
            
        it("Correct data populated", function () {
                cy.get(nameField).should('have.value', 'CBE')
                cy.get(descField).should('have.value', 'Commercial Bank of Ethiopia')
            })
           
        describe("updates an Organization", function () {

            it("Submitting the form", function () {
                cy.get('[data-cy=clear]').click()
                cy.get(nameField).type("NBE")
                cy.get(descField).type('National Bank of Ethiopia')
                cy.get(submit).click()
                cy.get(".ant-notification").should('contain', "Organization successfully Updated")
            })

            it("Organization Updated in the list", function () {
                cy.get(organizations).first().find('[data-cy=name]').should('have.text', 'NBE')
                cy.get(organizations).first().find('[data-cy=description]').should('have.text', 'National Bank of Ethiopia')
            })
        })
    })
    
    describe('navigation works', function () {
        beforeEach(function () {
            cy.visit('/org-form')
        })

        it('back button redirects to organization list', function () {
            cy.get('[data-cy=header]').get('.anticon-arrow-left').click()
            cy.url().should('include', '/organizations')
        })

        it('breadcrum navigation - organization', function () {
            cy.get('[data-cy=header]').find('[data-cy=bc_organizations]').click()
            cy.url().should('include', '/organizations')
        })
    })
})





