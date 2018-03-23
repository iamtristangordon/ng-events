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

service.getEvents = getEvents;
service.getMediaById = getMediaById;
service.getStatusById = getStatusById;
service.getEventById = getEventById;
service.setStatusById = setStatusById;

module.exports = service;



function getEvents() {
    checkForStoredEvents();

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

                        if(body.events && typeof body.events !== "string") {
                            fs.writeFile('events.json', JSON.stringify(body), 'utf8', function (err) {
                                console.log(err);
                            });
                        }

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
    console.log(statusObj);
    let options = {
        url: `${config.apiRoot}/events/${eventId}/status/${config.username}`,
        auth: auth,
        body: statusObj,
        json: true,
        method: 'put'
    };

    return new Promise(function (resolve, reject) {
        request.put(options, function (error, response, body) {
            console.log(response.statusCode);
            if (error) {
                reject(error);
                console.log(response.statusCode);
                console.log(response.body);
            } else {
                console.log(body);
                if (response.statusCode === 204) {
                    resolve({message: "Update was successful"});
                } else {
                    reject("An error occurred");
                }
            }
        });
    });
}

function getEventById(eventId) {
    if (events && eventsMap) {
        console.log("retrieving by map");
        let idx = eventsMap[eventId];
        let evt = events.events[idx];
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

                            if(body.events && typeof body.events !== "string") {
                                fs.writeFile('events.json', JSON.stringify(body), 'utf8', function (err) {
                                    console.log(err);
                                });
                            }

                            let selectedEvent;

                            for (let i = 0; i < body.events.length; ++i) {
                                if (body.events[i].id === eventId) {
                                    selectedEvent = body.events[i];
                                    break;
                                }
                            }

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

function checkForStoredEvents() {
    if (!events) {
        fs.readFile('events.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log("events.json file has yet to be generate through events request:", err);
            } else {
                events = JSON.parse(data);
            }
        });
    }
}