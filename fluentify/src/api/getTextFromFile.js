export function getTextFromFile(file) {
    return new Promise(
      (resolve, reject) => {
        if (!file.type.startsWith('text')) {
          console.error('Only text files are accepted.');
          reject(new Error('Only text files are accepted.'));
        }
  
        const reader = new FileReader();
  
        reader.onload = (event) => {
          resolve(event.target.result);
        };
  
        reader.onerror = (event) => {
          console.error(`FileReader Error: ${event.target.error.name} ${event.target.error.message}`);
          reject(new Error(`FileReader Error: ${event.target.error.message}`));
        };
  
        reader.readAsText(file);
      }
    );
  }