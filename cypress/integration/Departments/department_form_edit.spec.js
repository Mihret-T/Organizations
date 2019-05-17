describe('Edit Organization page', function () {
    it("loads the page", function () {
        cy.visit('/dept-form/101')
    })

    describe("Correct data populated", function(){
        it("Department Name correct", function(){
             cy.get('.ant-input').first().should('have.value', 'CEO')
        })
        it('Departmetn Description correct', function(){
            cy.get('.ant-input').last().should('have.value', 'Chief Executive Officer ' )
        })
        it('Department Organizations correct', function(){
              cy.get('.ant-select-selection-selected-value').first().should('have.text', ' CBE ')
        })
         it('parent Department correct', function(){
             cy.get('.ant-select-selection-selected-value').last().should('have.text', ' None ' )
        })
    })

    describe("updates an Organization", function () {

        it('Clear button clear the form and disables save button', function(){
            cy.get('.ant-btn-default').click()
            cy.get('.ant-input').first().not('have.value')
            cy.get('.ant-input').last().not('have.value')
        })

        it("save button disabled", function(){
            cy.get(".ant-btn-primary").should('be.disabled')
        })

        it("Submitting the form", function () {
            cy.get('.ant-input').first().type("COO")
            cy.get('.ant-input').last().type('Chief Operating Officer')
            cy.get('nz-select').last().click()
            cy.get('.ant-select-dropdown-menu-item').should('have.length', 1).first().click()
            cy.get(".ant-btn-primary").click()
            cy.get(".ant-notification").should('contain', "Department successfully Updated")
        })

        it("Department Updated in the list", function () {
            cy.get('tbody tr:first').find("td").eq(0).should('have.text', 'COO')
            cy.get('tbody tr:first').find("td").eq(1).should('have.text', 'Chief Operating Officer')
        })
    })
})