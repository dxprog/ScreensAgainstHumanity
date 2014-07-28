/**
 * Game manager
 */

var _ = require('underscore'),

    Game = require('./game'),

    GameManager = function() {
        this.games = {};
    };

/**
 * Game router
 */
GameManager.prototype.handleMessage = function(msg, connection) {
    var retVal = null;

    switch (msg.action) {
        case 'create_game':
            retVal = this.createGame(connection);
            break;
        case 'get_game':
            retVal = this.getGameById(msg.gameId);
            break;
        default:
            this.sendMessageToGame(msg.gameId, msg, connection);
            break;
    }

    return retVal;
};

/**
 * Creates a new game
 * @method createGame
 * @param {WebSocketConnection} connection The socket connection to the server client
 * @return {Object} The game object
 */
GameManager.prototype.createGame = function(connection) {

    var games = this.games,
        gameId = Date.now() + Math.floor(Math.random() * 10000);

    while (_.has(games, gameId)) {
        gameId = Date.now() + Math.floor(Math.random() * 10000);
    }

    games[gameId] = new Game(gameId, connection);

    return games[gameId];
};

GameManager.prototype.sendMessageToGame = function(gameId, msg, connection) {
    var retVal = null,
        game = this.getGameById(gameId);
console.log(gameId);
    if (game) {
        game.handleMessage(msg, connection);
    }

    return retVal;
};

GameManager.prototype.getGameById = function(gameId) {
    var retVal = null;

    if (gameId && _.has(this.games, gameId)) {
        retVal = this.games[gameId];
    }

    return retVal;
};

module.exports = GameManager;