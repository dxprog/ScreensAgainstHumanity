var WebSocketServer = require('websocket').server,
    http = require('http'),
    _ = require('underscore'),

    GameManager = require('./model/gamemanager'),

    LISTEN_PORT = 8001,

    gameManager = new GameManager(),

    server = http.createServer(function(req, res) {
        // HTTP CODE HERE
        res.end();
    }),

    socket;

server.listen(LISTEN_PORT, function() {
    console.log('Listening on ' + LISTEN_PORT);
});

socket = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

socket.on('request', function(request) {

    var connection = request.accept('echo-protocol', request.origin);
    connection.on('message', function(msg) {

        var retVal = null,
            game = null;

        try {

            msg = JSON.parse(msg.utf8Data);
            if (_.has(msg, 'action')) {
                console.log('Incoming request: ' + msg.action);
                retVal = gameManager.handleMessage(msg, connection);
            } else {

            }

        } catch (ex) {
            console.log('Invalid data: ' + ex);
        }

        connection.send(JSON.stringify(retVal));

    });

    connection.on('close', function(reasonCode, description) {

    });

});