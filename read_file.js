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

