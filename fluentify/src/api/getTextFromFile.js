export function getTextFromFile(file) {
    return new Promise(
      (resolve, reject) => {
        if (!file.type.startsWith('text')) {
          console.error('Only text files are accepted.');
          reject(new Error('Only text files are accepted.'));
        }
  
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const fileContent = event.target.result;
          const words = fileContent.split(/\s+/).filter(word => word.trim() !== ''); // Split text into words and remove empty strings
          const wordCount = words.length;
  
          if (wordCount < 10) {
            console.error('Please upload a file that contains at least 10 words.');
            reject(new Error('Please upload a file that contains at least 10 words.'));
          } else {
            resolve(fileContent);
          }
        };
  
        reader.onerror = (event) => {
          console.error(`FileReader Error: ${event.target.error.name} ${event.target.error.message}`);
          reject(new Error(`FileReader Error: ${event.target.error.message}`));
        };
  
        reader.readAsText(file);
      }
    );
  }