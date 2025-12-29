

// Make simple HTTP request and read response back
const http = require('http');
const https = require('https');


const getHeaders = async (url) => {
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {  
            res.setEncoding('utf8');
            const headers = res.headers;    
            let body = '';   
            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                resolve({headers: headers, body: body});
            });
        }).on('error', (error) => {
            // console.log("Message: " + error.message);
    
            reject(error);
        });
    });
}

const fetchWithRetry = async (url) => {
    let retries = 0;
    const maxRetries = 3;
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    while (retries <= maxRetries) {
        if (retries === 2) {
            url = "https://www.example.com/";
        }
        try {
            const response = await getHeaders(url);
            console.log(response.headers);
            console.log(response.body);
            return;
        } catch (error) {
            retries++;
            console.log("Message: " + error.message);
            if (retries < maxRetries) {
                console.log(`Retrying... (${retries}/${maxRetries})`);
                await delay(5000);
            } else {
                console.log("Max retries reached. Exiting.");
                return;
            }
        }
    }
}

async function main() {
    const url = "https://ww.example.com/";

    await fetchWithRetry(url);
}

main();