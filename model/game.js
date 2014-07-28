/**
 * Screens Against Humanity Game Code
 */

var _ = require('underscore'),

    Game = function(id, connection) {
        this.gameId = id;
        this.getServer = function() { return connection };
        this.players = {};
        this.cards = [];
    };

Game.prototype.handleMessage = function(msg, connection) {

    switch (msg.action) {
        case 'request_join':
            this.requestJoin(msg, connection);
            break;
        case 'accept_join':
            break;
        case 'start_game':
            break;
        case 'play_card':
            break;
        case 'select_card':
            break;
    }

};

Game.prototype.requestJoin = function(msg, connection) {
    if (_.has(msg, 'name')) {
        this.getServer().send(JSON.stringify({ action: 'request_join', name: msg.name }));
    }
};

Game.prototype.acceptPlayer = function(name, msg) {

};

module.exports = Game;