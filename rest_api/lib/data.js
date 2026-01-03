const fs = require("fs");
const path = require("path");

const lib = {};
lib.baseDir = path.join(__dirname, '..', '.data');

lib.create = (dir, file, data, callback) => {

    if (!dir || !file || !data) {
        callback(400, { 'error': 'Missing required fields' });
        return;
    }

    const filePath = path.join(lib.baseDir, dir, file + '.json');

    fs.open(filePath, 'wx', (err, fd) => {
        if (err && err.code === 'EEXIST') {
            callback(400, { 'error': 'File already exists' });
            return;
        } else if (err) {
            callback(500, { 'error': 'Failed to create file' });
            return;
        } else {
           const stringData = JSON.stringify(data);
           fs.write(fd, stringData, (err) => {
            if (err) {
                callback(500, { 'error': 'Failed to write to file' });
            } else {
                callback(200, { 'message': 'File created successfully' });
                fs.close(fd, (err) => {
                    if (err) {
                        callback(500, { 'error': 'Failed to close file' });
                    }
                });
            }
           });
        }
    });
}

lib.read = (dir, file, callback) => {
    const filePath = path.join(lib.baseDir, dir, `${file}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            callback(500, { 'error': 'Failed to read file' });
        } else {
            callback(200, { 'data': JSON.parse(data) });
        }
    });
}

/**
 * Updates an existing JSON file with new data.
 * 
 * @param {string} dir - The directory within the .data folder where the file is stored.
 * @param {string} file - The name of the file (without .json extension) to update.
 * @param {object} data - The new data to write to the file.
 * @param {function} callback - A callback function that receives a status code and a message or error.
 * 
 * Steps:
 * 1. Build the full file path for the target JSON file.
 * 2. Attempt to open the file for reading and writing ('r+'). If the file does not exist or cannot be opened, respond with an error (code 500).
 * 3. If opening succeeds, convert the new data into a JSON string.
 * 4. Truncate (clear) the file's contents to prepare for new data.
 * 5. Write the JSON string to the (now empty) file.
 * 6. If writing succeeds, call the callback with a success message. If any error occurs during truncation or writing, call the callback with an error message describing the failure.
 */
lib.update = (dir, file, data, callback) => {
    const filePath = path.join(lib.baseDir, dir, `${file}.json`);
    fs.open(filePath, 'r+', (err, fd) => {
        if (!err && fd) { // File opened successfully
            const stringData = JSON.stringify(data); // Prepare new data
            fs.ftruncate(fd, (err) => { // Truncate the file
                if (!err) {
                    fs.write(fd, stringData, (err) => { // Write new data
                        if (!err) {
                            callback(200, { 'message': 'File updated successfully' });
                        } else {
                            callback(500, { 'error': 'Failed to write to file' });
                        }
                    });
                } else {
                    callback(500, { 'error': 'Failed to truncate file' });  
                }
            });
        } else { // File could not be opened
            callback(500, { 'error': 'Failed to open file' });
        }
    });
}

lib.delete = (dir, file, callback) => {
    const filePath = path.join(lib.baseDir, dir, `${file}.json`);
    fs.unlink(filePath, (err) => {
        if (err) {
            callback(500, { 'error': 'Failed to delete file' });
        } else {
            callback(200, { 'message': 'File deleted successfully' });
        }
    });
}
module.exports = lib;