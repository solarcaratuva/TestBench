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
    var colindex = $("#kls-r-headers").children()
    $.each( $("#kls-r-values").children(), function(){
        $( this ).html("<div style=\"height: 370px; width: 100%;\"></div>")
        $( this ).first().CanvasJSChart(basic_options);
    });

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
                    $("#input-values").children().eq(colIndex).CanvasJSChart();
                    break;
                case "kls_l":
                    var colindex = $("#kls-l-headers").children().index($("#kls-l-" + key));
                    
                    $("#kls-l-values").children().eq(colindex).first().CanvasJSChart().data[0].set("dataPoints", 
                        [{  y: msg.data[key] }]
                    );
                     $("#kls-l-values").children().eq(colindex).first().CanvasJSChart().render();
                    
                    break;
                case "kls_r":
                    var colindex = $("#kls-r-headers").children().index($("#kls-r-" + key));
                    
                    $("#kls-r-values").children().eq(colindex).first().CanvasJSChart().data[0].set("dataPoints", 
                        [{  y: msg.data[key] }]
                    );
                     $("#kls-r-values").children().eq(colindex).first().CanvasJSChart().render();
                    
                    break;
            }
        }
    });
});
