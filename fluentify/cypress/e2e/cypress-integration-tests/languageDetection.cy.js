describe("Language Detection Feature", ()=>{
    //Test 1
    it('Upload a file using supported language, should show language detection result', ()=>{
        cy.visit('https://fluent-ify.netlify.app/')

        cy.get('label.h-40').as('fileInput')

        cy.fixture('test file - fr.txt').then(fileContent => {
            cy.get('@fileInput').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'test file - fr.txt',
            mimeType: 'txt'
            });
            });


    })
  
  
  })
  