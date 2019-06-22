$(document).ready(function() {
    // global, dynamic mapping of labels to value for left
    var basic_options = {
        axisX:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            labelFormatter: function(){
              return " ";
            }
          },
        data: [              
        {
            type: "column",
            dataPoints: []
        }
        ]
    };

    var colindex = $("#kls-l-headers").children()
    $.each( $("#kls-l-values").children(), function(){
        $( this ).html("<div style=\"height: 370px; width: 100%;\"></div>")
        $( this ).first().CanvasJSChart(basic_options);
    });

    // $("#kls-l-values").children().eq(colindex).html(msg.data[key]);
    console.log(colindex);
 

    // $("#left-motor-chart").CanvasJSChart(left_motor_options);
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
                    // $("#input-values").children().eq(colIndex).CanvasJSChart();
                    break;
                case "kls_l":
                    var colindex = $("#kls-l-headers").children().index($("#kls-l-" + key));
                    
                    $("#kls-l-values").children().eq(colindex).first().CanvasJSChart().data[0].set("dataPoints", 
                        [{  y: msg.data[key] }]
                    );
                     $("#kls-l-values").children().eq(colindex).first().CanvasJSChart().render();
                    // var dat = msg.data;
                    // left_motor_data[2].y = dat.controller_temp;
                    // // "count": -1,
                    // left_motor_data[3].y = dat.current;
                    // // "feedback_status": -1,
                    // left_motor_data[1].y = dat.motor_temp;
                    // left_motor_data[0].y = dat.rpm;
                    // left_motor_data[4].y = dat.voltage;
                    // $("#left-motor-chart").CanvasJSChart().render();
                    // "throttle": -1,
                    // "type": -1,
                    break;
                case "kls_r":
                    var colindex = $("#kls-r-headers").children().index($("#kls-r-" + key));
                    $("#kls-r-values").children().eq(colindex).html(msg.data[key]);
                    break;
            }
        }
    });
});
