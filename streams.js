const fs = require('fs');

/* 
 * Read a file using a readable stream
 * @param {string} fileName - The name of the file to read from
 * @returns {Promise} - A promise that resolves when the file is read from
 */
const readFileStream = (fileName) => {
    return new Promise((resolve, reject) => {
        console.log("Stream | Reading file: ", fileName);
        const readableStream = fs.createReadStream(fileName);

        readableStream.on('data', (chunk) => {
            // Split the chunk into lines and log the lines that start with 'Test'
            chunk.toString().split('\n').forEach(line => {
                if (line.startsWith('Test')) {
                    console.log("Chunk: ", line.trim());
                }
            });
        });

        readableStream.on('end', () => {
            console.log('End of stream');
            resolve();
        });
        readableStream.on('error', (error) => {
            console.log('Error: ', error.message);
            reject(error);
        });
    });
}

/* 
 * Write to a file using a writable stream
 * @param {string} fileName - The name of the file to write to
 * @returns {void} - This function does not return a Promise
 */

const writeFileStream = (fileName) => {
    console.log("Stream | Writing to file: ", fileName);
    const writableStream = fs.createWriteStream(fileName);

    writableStream.on('data', (chunk) => {
        console.log("Chunk: ", chunk.toString());
    });

    writableStream.on('end', () => {
        console.log('End of stream');
    });
    
    writableStream.on('error', (error) => {
        console.log('Error: ', error.message);
        throw new Error(error.message);
    });

    writableStream.write('Hello, world!');
    writableStream.end();
}

main = () =>{
    const fileNames = ['input.txt', 'outpu.txt'];
   
    readFileStream(fileNames[0]).then(() => {
        writeFileStream(fileNames[1]);
    });
}

main();