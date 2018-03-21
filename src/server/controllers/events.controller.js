let config = require('config.json');
let express = require('express');
let router = express.Router();
let eventsService = require('services/events.service');
 
// routes
router.get('/events', getEvents);
 
module.exports = router;
 
function getEvents(req, res) {
    eventsService.getEvents()
        .then(function (events) {
            if (events) {
                res.send(events);
                console.log(events.length);
            } else {
                res.status(400).send('Request was unsucessful.');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
