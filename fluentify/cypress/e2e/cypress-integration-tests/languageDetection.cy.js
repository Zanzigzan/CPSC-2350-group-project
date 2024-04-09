describe("Language Detection Feature", ()=>{
    //Test 1
    it('Upload a file using supported language, should show language detection result', ()=>{
        cy.visit('https://fluent-ify.netlify.app/')

        const fileName = 'test file - fr.txt'

        cy.get('input[type="file"]').invoke('removeClass', 'hidden')

        cy.fixture(fileName).then(fileContent => {
            cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'test file - fr.txt',
            mimeType: 'text'
            });
        });

        cy.get('.bg-grey-lighter > .text-blue-400').contains('Detected Language: French')
    })

    //Test 2
    it('Upload a file using unsupported language, should show a reminder', ()=>{
        cy.visit('https://fluent-ify.netlify.app/')

        const fileName = 'test file - italian.txt'

        cy.get('input[type="file"]').invoke('removeClass', 'hidden')

        cy.fixture(fileName).then(fileContent => {
            cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'test file - italian.txt',
            mimeType: 'text'
            });
        });

        cy.get('.bg-grey-lighter > .text-blue-400').contains('Your language is not supported by our APP')
      
    })

  
  
  })
  