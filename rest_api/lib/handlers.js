/* Request handlers */
const _data = require('./data');
const _helpers = require('./helpers');

let handlers = {};
// Users handler
handlers.users = (data, callback) =>{
    const acceptedMethods = ['post', 'get', 'put', 'delete'];
    if(acceptedMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    } else {
        callback(405, {'error': 'Method not allowed'});
    }
}
// Kind of a private methods
handlers._users = {};
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = (data, callback) =>{
    let { firstName, lastName, phone, password, tosAgreement } = data.payload;
    
    firstName = typeof(firstName) === 'string' && firstName.trim().length > 0 ? firstName.trim() : false;
    lastName = typeof(lastName) === 'string' && lastName.trim().length > 0 ? lastName.trim() : false; 
    phone = typeof(phone) === 'string' && phone.trim().length === 10 ? phone.trim() : false;
    password = typeof(password) === 'string' && password.trim().length > 0 ? password.trim() : false;
    tosAgreement = typeof(tosAgreement) === 'boolean' && tosAgreement === true ? true : false;
    
    if(firstName && lastName && phone && password && tosAgreement){
        _data.read('users', phone, (err, data) => {
           if (err){
            // hash password
            hashedPassword = _helpers.hash(password);
            if(hashedPassword){
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hashedPassword,
                    tosAgreement
                }
                _data.create('users', phone, userObject, (statusCode, payload) => {
                    if(statusCode !== 200){
                        console.log("Error: ", payload);
                        callback(500, {'error': 'Failed to create user'});
                    }else{
                        callback(200, {'message': 'User created successfully'});
                    }
                });
            }else{
                callback(400, {'error': 'Failed to hash password'});
            }
           }else{
            callback(400, {'error': 'User already exists'});
           }
        });
    }else{
        callback(400, {'error': 'Missing required fields'});
    }
}
handlers._users.get = (data, callback) =>{
    callback(200, {'name': 'John Doe'});
}
handlers._users.put = (data, callback) =>{
    callback(200, {'name': 'John Doe'});
}


// calback return statusCode and payload
handlers.ping = (data, callback) =>{
  callback(200);
}
// Not found handler
handlers.notFound = (data, callback) =>{
  callback(404, {'error': 'Not Found'})
}

module.exports = handlers;
