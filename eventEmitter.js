const EventEmitter = require('events');

const eventEmitter = new EventEmitter();


const getResponsePromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('inside getResponsePromise');
        }, 1000);
    }).then((result) => {
        console.log("Location : ", result);
        return result;
    });
}


const promiseWithParams = (param, data) => {
    // console.log("Promise with params: ", param, data);
    return new Promise((resolve, reject) => {
        if (param === 'test') { 
            // Correct approach: resolve the promise when the event fires, and remove the listener after firing.
            const handler = (data) => {
                console.log("Data: ", data);
                resolve(data); // resolve only when 'test' event is emitted
                eventEmitter.removeListener('test', handler); // cleanup
            };
            eventEmitter.on('test', handler);
            eventEmitter.emit('test', data); // <-- Emit the event with the provided data so the promise can resolve
        } else {
            reject(new Error('Invalid parameter'));
        }
    });
}

getResponsePromise().then((result) => {
    console.log("Location: ", result);
});

promiseWithParams('test', "inside promiseWithParams").then((result) => {
    console.log("Location: ", result);
});

console.log("--------------------------------");

eventEmitter.on('test', (data) => {
    console.log("Data: ", data);
});

eventEmitter.emit('test', "This is how it ends !!");
