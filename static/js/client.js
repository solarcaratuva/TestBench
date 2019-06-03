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
                    console.log(key);
                    var colIndex = $("#input-headers").children().index($("#" + key));
                    $("#input-values").children().eq(colIndex).html(msg.data[key]);
                    //console.log($("#input-values").children().eq(colIndex));
                    console.log(colIndex);
                    //$("#" + key).html(msg.data[key]);
                    break;
                case "can0":
                    break;
                case "can1":
                    break;
            }
        }
    });
});
