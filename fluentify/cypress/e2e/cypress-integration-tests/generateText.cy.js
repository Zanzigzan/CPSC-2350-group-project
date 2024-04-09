describe("Generate Text Feature", ()=>{
  //Test 1
  it('click the easy button, expect the modal with language selection shows up', ()=>{
      cy.visit('https://fluent-ify.netlify.app/')
      cy.get('.bg-green-400').click()
      cy.wait(6000)
      cy.get('.bg-black').should('be.visible')
      cy.get('h1.text-white.text-xl.font-bold').should('have.text', 'Please choose your target language:')
  })

  //test 2
  it('click the medium button, expect the modal with language selection shows up', ()=>{
    cy.visit('https://fluent-ify.netlify.app/')
    cy.get('.bg-yellow-400').click()
    cy.wait(6000)
    cy.get('.bg-black').should('be.visible')
    cy.get('h1.text-white.text-xl.font-bold').should('have.text', 'Please choose your target language:')
  })
  
  //test 3
  it('click the hard button, expect the modal with language selection shows up', ()=>{
      cy.visit('https://fluent-ify.netlify.app/')
      cy.get('.bg-green-400').click()
      cy.wait(6000)
      cy.get('.bg-black').should('be.visible')
      cy.get('h1.text-white.text-xl.font-bold').should('have.text', 'Please choose your target language:')
  })

})
