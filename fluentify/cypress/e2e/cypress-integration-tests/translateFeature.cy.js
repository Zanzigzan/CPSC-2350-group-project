describe("Translate Feature", ()=>{
    //Test 1
    it('choose a language and click the confirm button, expect the translated text to show up on 2nd page', ()=>{
        cy.visit('localhost:5173/')
        cy.get('.bg-yellow-400').click()
        cy.wait(6000)
        cy.get('h1.text-white.text-xl.font-bold').should('have.text', 'Please choose your target language:')
        cy.get('select').select('fr')
        cy.get('a > .bg-blue-400').click()
        cy.wait(3000)
        cy.get('p').should('exist')
    })

 
})    