(function() {

    var gameId = window.gameId,

        handleMessage = function(evt) {
            console.log(evt.detail);
            switch (evt.detail.action) {
                case 'request_join':
                    break;
            }
        };

    document.getElementsByTagName('body')[0].innerHTML = 'The game ID is ' + gameId.toString(36);

    window.addEventListener('socket_message', handleMessage);

}());