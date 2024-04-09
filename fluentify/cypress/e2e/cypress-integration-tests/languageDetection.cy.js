describe("Language Detection Feature", ()=>{
    //Test 1
    it.skip('Upload a file using supported language, should show language detection result', ()=>{
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
      
    })

  
  
  })
  