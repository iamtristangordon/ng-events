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
let eventsMap;

fs.readFile('events.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        events = JSON.parse(data);
    }
});

service.getEvents = getEvents;
service.getMediaById = getMediaById;
service.getStatusById = getStatusById;
service.getEventById = getEventById;
service.setStatusById = setStatusById;

module.exports = service;



function getEvents() {
    return new Promise(function (resolve, reject) {
        if (events && events.events) {
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

                        createEventsMap(body.events);

                        fs.writeFile('events.json', JSON.stringify(body), 'utf8', function (err) {
                            console.log(err);
                        });

                        resolve(body);
                    } else {
                        reject("An error occurred");
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
                    if (body) {
                        resolve(body);
                    } else {
                        reject("An error occurred");
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
                        reject("An error occurred");
                    }
                }
            });
    });
}

function setStatusById(eventId, statusObj) {
    console.log("Status obj:", { url: `${config.apiRoot}/events/${eventId}/status/${config.username}`, method: 'PUT', auth: auth, json: JSON.stringify(statusObj)});

    return new Promise(function (resolve, reject) {
        request({ url: `${config.apiRoot}/events/${eventId}/status/${config.username}`, method: 'PUT', auth: auth, json: [JSON.stringify(statusObj)]}, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    if (body && typeof(body) !== "string") {
                        resolve(JSON.parse(body));
                    } else {
                        reject("An error occurred");
                    }
                }
            });
    });
}

function getEventById(eventId) {
    if (events.events && typeof events.events !== "string" && eventsMap) {
        console.log("retrieving by map");
        let idx = eventsMap[eventId];
        let evt = events.events[idx];
        console.log("evt by id 2: ", evt);
        return new Promise(function (resolve, reject) {
            if (evt) {
                resolve(evt);
            }
            else {
                reject("An error occurred");
            }
        });

    } else {
        return new Promise(function (resolve, reject) {
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

                            createEventsMap(body.events);

                            fs.writeFile('events.json', JSON.stringify(body), 'utf8', function (err) {
                                console.log(err);
                            });

                            let selectedEvent;

                            for (let i = 0; i < body.events.length; ++i) {
                                if (body.events[i].id === eventId) {
                                    selectedEvent = body.events[i];
                                    break;
                                }
                            }

                            console.log("evt by id 2: ", selectedEvent);

                            resolve(selectedEvent);
                        } else {
                            reject("An error occurred");
                        }
                    }
                });
        });
    }
}

function createEventsMap(arr) {
    eventsMap = {};

    for (let i = 0; i < arr.length; ++i) {
        eventsMap[arr[i].id] = i;
    }

    console.log("evtMap: ", eventsMap);
}
