const fsp = require('fs').promises;
const fs = require('fs')
let fileName = ".gitignores"

const readFileAsync = async (fileName) => {

console.log("Reading file asynchronously | Promise version")
  try {
    let data = await fsp.readFile(fileName)
    console.log("Content of the file is: \n")
    console.log(data.toString())
    return data
  } catch (error) {
    console.log("[!] Error: ", error.message);
    return ''
  }
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sync version of readFile
const readFileSync = (fileName) => {  
  try {
    console.log("\nReading file synchronously")
    let data = fs.readFileSync(fileName)
    console.log("Content of the file is: \n")
    console.log(data.toString())
  } catch (error) {
    console.log("[!] Error: ", error.message);
    return '';
  }
}

readFileAsync(fileName).then(() => { 
    readFileSync(fileName);
})

fileName = ".gitignore"


// Practice: Replace text in a file
  
const replaceInFile = (pathToFile, textToReplace, textToInsert) => {
  // Read file content as string
  let contents = fs.readFileSync(pathToFile, 'utf-8');
  // Replace all occurrences of textToReplace (as a string, not the literal 'textToReplace')
  // If textToReplace is a string, we need to escape special regex chars and create a global regex
  const escaped = textToReplace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  contents = contents.replace(regex, textToInsert);

  fs.writeFileSync(pathToFile, contents);
  console.log(`Replaced ${textToReplace} with ${textToInsert} in ${pathToFile}`);
  return contents;
}

replaceInFile('./test.txt', 'test', 'test2');