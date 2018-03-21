let config = require('config.json');
let request = require('request');
let service = {};

// Buffer.from(`${config.username}:${config.password}`).toString('base64');

service.getEvents = getEvents;
// service.submitFeedback = submitFeedback;

module.exports = service;
 
function getEvents() {
    return new Promise(function (resolve, reject) {
        request.get(`${config.apiRoot}/events`, 
        {
            'auth': {
              'user': config.username,
              'pass': config.password,
              'sendImmediately': false
            }
        }, function(error, response, body) {
            console.log("body", body);
            if (error) {
                console.log("error", error);
                reject(error);
            } else {
                if (body) {
                    resolve(JSON.parse(body));
                } else {
                    console.log("no body");
                    reject();
                }
            }
        });
    });
}

// function submitFeedback(emailObj) {
//     let deferred = Q.defer(),
//         fromEmail = new helper.Email('feedback@finapp.com'),
// 	    toEmail = new helper.Email('chale@knowledgebanknashville.org'),
// 	    subject = "Application Feedback",
// 	    content = new helper.Content('text/plain', "name: " + emailObj.name + "\n\n" + "message: " + emailObj.message),
// 	    mail = new helper.Mail(fromEmail, subject, toEmail, content);

// 	var sg = require('sendgrid')(process.env.FINAPP_API_KEY || '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');
// 	var request = sg.emptyRequest({
// 		method: 'POST',
// 		path: '/v3/mail/send',
// 		body: mail.toJSON(),
// 	});

// 	sg.API(request, function(error, response) {
// 		console.log(response.statusCode);
// 		console.log(response.body);
// 		console.log(response.headers);

// 		deferred.resolve(response);
// 	});

//     return deferred.promise;
// }

