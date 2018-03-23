let config = require('config.json');
let express = require('express');
let router = express.Router();
let eventsService = require('services/events.service');
let fs = require('fs');
let path = require('path');
 
// routes
router.get('/events', getEvents);
router.get('/media/:eventId/:mediaId*', getMediaById);
router.get('/status/:eventId', getStatusById);
router.get('/event/:eventId', getEventById);
router.put('/status/:eventId', setStatusById);
 
module.exports = router;
 
function getEvents(req, res) {
    console.log("ran it: evts")
    eventsService.getEvents()
        .then(function (eventsObj) {
            if (eventsObj) {
                eventsObj = duplicate(eventsObj);

                eventsObj.events = mapEvents(eventsObj.events);
                res.send(eventsObj);
            } else {
                res.status(404).send('Request was unsucessful. Could not get events.');
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
}

function getMediaById(req, res) {
    let mediaId = req.param('mediaId') + req.param(0);
    eventsService.getMediaById(req.params.eventId, mediaId)
        .then(function (media) {
            if (media) {
                res.set('Content-Type', 'image/jpeg');
                res.send(media); 
            } else {
                res.status(404).send('Request was unsucessful, Media not found.');
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

function getStatusById(req, res) {
    eventsService.getStatusById(req.params.eventId)
        .then(function (status) {
            if (status) {
                res.send(status);
            } else {
                res.status(404).send('Request was unsucessful. Status not found.');
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

function setStatusById(req, res) {
    eventsService.setStatusById(req.params.eventId, req.body)
        .then(function (status) {
            if (status) {
                res.send(status);
            } else {
                res.status(404).send('Update was unsucessful. Status not found.');
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });
}

function getEventById(req, res) {
    eventsService.getEventById(req.params.eventId)
        .then(function (singleEvent){
            if (singleEvent) {
                res.send(singleEvent)
            } else {
                res.status(404).send('Request was unsucessful. Event not found.');
            }
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
}

function mapEvents(arr) {
    if(arr.constructor !== Array) return arr;

    return arr.map(function(e) {

        let newEvt = {
            id: e.id,
            name: e.name,
            location: e.location,
            description: e.description
        };

        if (e.images && e.images.length) newEvt.image = e.images[0];

        return newEvt;
    });
}

function duplicate(original) {
    return Object.assign({}, original);
}