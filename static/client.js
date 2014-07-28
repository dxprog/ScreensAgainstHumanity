(function() {

    var body = document.getElementsByTagName('body')[0],
        gameId = window.gameId,

        joinClick = function(evt) {
            var input = document.querySelector('[name="name"]');
            sendMessage('request_join', { name: input.value, gameId: gameId });
        },

        handleMessage = function(evt) {
            console.log(evt.detail);
        };

    body.innerHTML = '<input type="text" name="name" placeholder="Enter your name" /><button id="joinGame">Join Game</button>';

    document.getElementById('joinGame').addEventListener('click', joinClick);
    window.addEventListener('socket_message', handleMessage);

}());