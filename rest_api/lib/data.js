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
module.exports = lib;