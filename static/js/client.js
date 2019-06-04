$(document).ready(function() {
    var namespace = "/test";
    var socket = io.connect("http://" + document.domain + ":" + location.port + namespace);
    socket.on("connect", function() {
        console.log("connected!");
    });
    socket.on("update", function(msg) {
        if (!("type" in msg.data)) {
            console.log(msg.data);
            return;
        }
        for (var key in msg.data) {
            if (key === "" || key === "type") {
                continue;
            }
            switch(msg.data["type"]) {
                case "inputs":
                    var colIndex = $("#input-headers").children().index($("#" + key));
                    $("#input-values").children().eq(colIndex).html(msg.data[key]);
                    break;
                case "kls_l":
                    var colindex = $("#kls-l-headers").children().index($("#kls-l-" + key));
                    $("#kls-l-values").children().eq(colindex).html(msg.data[key]);
                    break;
                case "kls_r":
                    var colindex = $("#kls-r-headers").children().index($("#kls-r-" + key));
                    $("#kls-r-values").children().eq(colindex).html(msg.data[key]);
                    break;
            }
        }
    });
});
