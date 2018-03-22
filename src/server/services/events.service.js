let config = require('config.json');
let request = require('request');
let fs = require('fs');
let service = {};
let auth = {
    'user': config.username,
    'pass': config.password,
    'sendImmediately': false
};
let events;

fs.readFile('events.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    events = JSON.parse(data);
}});

service.getEvents = getEvents;
service.getMediaById = getMediaById;
service.getStatusById = getStatusById;

module.exports = service;



function getEvents() {
    return new Promise(function (resolve, reject) {
        if(events) {
            console.log("SENDING STORED EVENTS!");
            resolve(events);
            return;
        }

        request.get(`${config.apiRoot}/events`,
            {
                'auth': auth
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                    return;
                } else {
                    if (body) {
                        body = {
                            timeStamp: Date.now(),
                            events: JSON.parse(body)
                        };

                        fs.writeFile('events.json', JSON.stringify(body), 'utf8', function(err) {
                            console.log(err);
                        });

                        resolve(body);
                    } else {
                        reject();
                    }
                }   
            });
    });
}

function getMediaById(eventId, mediaId) {
    return new Promise(function (resolve, reject) {
        request.get(`${config.apiRoot}/events/${eventId}/media/${mediaId}`,
            {
                'auth': auth,
                'encoding': null
            }, function (error, response, body) {
                if (error) {
                    console.log("service error: ", error);
                    reject(error);
                } else {
                    console.log(body);
                    if (body) {
                        resolve(body);
                    } else {
                        reject();
                    }
                }
            });
    });
}

function getStatusById(eventId) {
    return new Promise(function (resolve, reject) {
        request.get(`${config.apiRoot}/events/${eventId}/status/${config.username}`,
            {
                'auth': auth
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (body) {
                        resolve(JSON.parse(body));
                    } else {
                        reject();
                    }
                }
            });
    });
}

function setStatusById(eventId, statusObj) {
    return new Promise(function (resolve, reject) {
        request.put(`${config.apiRoot}/events/${eventId}/status/${config.username}`,
            {
                'auth': auth,
                'json': statusObj
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (body) {
                        resolve(JSON.parse(body));
                    } else {
                        reject();
                    }
                }
            });
    });
}
