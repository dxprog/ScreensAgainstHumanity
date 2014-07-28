(function() {

    var SOCKET_MESSAGE = 'socket_message',
        GET_GAME = 'get_game',

        connection = new WebSocket('ws://192.168.1.81:8001', 'echo-protocol'),
        playerId = null,

        include = function(file) {
            var script = document.createElement('script');
            script.src = 'static/' + file + '.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        },

        createGameClick = function(evt) {
            sendMessage('create_game');
            window.addEventListener(SOCKET_MESSAGE, createGameResponse);
        },

        createGameResponse = function(evt) {
            window.removeEventListener(SOCKET_MESSAGE, createGameResponse);
            if (evt.detail.gameId) {
                window.gameId = evt.detail.gameId;
                include('server');
            }
        },

        checkJoin = function() {
            var qs = window.location.href.split('?');

            if (qs.length > 1) {
                qs = qs[qs.length - 1];
                if (qs.indexOf('gameId=') !== -1) {
                    joinGame(qs.replace('gameId=', ''));
                }
            }

        },

        joinGame = function(gameId) {
            console.log(gameId);
            sendMessage(GET_GAME, { gameId: gameId });
            window.addEventListener(SOCKET_MESSAGE, joinGameResponse);
        },

        joinGameResponse = function(evt) {
            window.removeEventListener(SOCKET_MESSAGE, joinGameResponse);
            if (evt.detail) {
                window.gameId = evt.detail.gameId;
                include('client');
            }
        },

        sendMessage = function(action, data) {
            data = data || {};
            data.action = action;
            connection.send(JSON.stringify(data));
        };


    connection.onopen = function() {
        document.getElementById('createGame').addEventListener('click', createGameClick);
        checkJoin();
    };

    connection.onerror = function(err) {

    };

    connection.onmessage = function(msg) {

        try {
            msg = JSON.parse(msg.data);
            window.dispatchEvent(new CustomEvent('socket_message', { detail: msg }));
        } catch (exc) {
            console.log('There was an error with the data: ' + exc);
        }

    };

    window.sendMessage = sendMessage;

}());