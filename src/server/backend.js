const server = require("socket.io")(process.env.PORT || 8080);
var request = require("request");
var axios = require("axios").default;

var tokenOptions = {
    method: 'POST',
    url: 'https://dev-xgi1ni6k23x87bgd.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"MCYR9AtKszYPkXeWeFGupowMgulfHdVw","client_secret":"356hVGmpqAH5tsRLiD16arUMnVrA7ufAAKwyIYxORHYrLSzCM6nr9BpBqonXNZTn","audience":"https://dev-xgi1ni6k23x87bgd.us.auth0.com/api/v2/","grant_type":"client_credentials"}'
};

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('givetoken', () => {
        request(tokenOptions, function (error, response, body) {
            if (error) throw new Error(error);
            socket.emit('token', JSON.parse(body))
        });
    });

    socket.on('updateData', (details) => {
        var Updateoptions = {
            method: 'PATCH',
            url: `https://dev-xgi1ni6k23x87bgd.us.auth0.com/api/v2/users/${details[0]}`,
            headers: { authorization: `Bearer ${details[1]}`, 'content-type': 'application/json' },
            data: { user_metadata: { tasks: details[2] } }
        };

        axios.request(Updateoptions).then(function (response) {
            // Handle the response if needed
        }).catch(function (error) {
            console.error(error);
        });
    });

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        socket.emit('messageResponse', 'Response from server: ' + message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
