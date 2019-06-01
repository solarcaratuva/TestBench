$(document).ready(function() {
    var namespace = '/test';
    console.log(document.domain);
    console.log(location.port);
    var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);
    socket.on('connect', function() {
        console.log("connected!");
    });
    socket.on('update', function(msg) {
        console.log(msg.data);
        $("#status").append('<p>' + msg.data + '</p>');
    });
});
