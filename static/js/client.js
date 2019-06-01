$(document).ready(function() {
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/update');
    socket.on('update', function(msg) {
        $("#status").append('<p>' + msg.data + '</p>');
    });
});
