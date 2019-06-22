$(document).ready(function() {
    //ATTENTION
    //will cap the charts. They can auto-scale but its jank
    //adjust to real values as needed    
    var max_heights = [6000,1000,1000,50,25]
    $.each( $("#kls-l-values").children(), function(i){
        console.log(i);
        $( this ).html("<div style=\"height: 370px; width: 100%;\"></div>")
        $( this ).first().CanvasJSChart(
            {
                axisY:{
                    maximum: max_heights[i]
                },
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
            }
        );
    });
    $.each( $("#kls-r-values").children(), function(i){
        $( this ).html("<div style=\"height: 370px; width: 100%;\"></div>")
        $( this ).first().CanvasJSChart(
            {
                axisY:{
                    maximum: max_heights[i]
                },
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
            }
        );
    });
    $(".canvasjs-chart-credit").remove();


    var namespace = "/test";
    var socket = io.connect("http://" + document.domain + ":" + location.port + namespace);
    socket.on("connect", function() {
        console.log("connected!");
    });
    socket.on("update", function(msg) {
        if (!("type" in msg.data)) {
            // console.log(msg.data);
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
                    var colindex_left = $("#kls-l-headers").children().index($("#kls-l-" + key));
                    
                    $("#kls-l-values").children().eq(colindex_left).first().CanvasJSChart().data[0].set("dataPoints", 
                        [{  y: msg.data[key] }]
                    );
                     $("#kls-l-values").children().eq(colindex_left).first().CanvasJSChart().render();
                    
                    break;
                case "kls_r":
                    var colindex_right = $("#kls-r-headers").children().index($("#kls-r-" + key));
                    
                    $("#kls-r-values").children().eq(colindex_right).first().CanvasJSChart().data[0].set("dataPoints", 
                        [{  y: msg.data[key] }]
                    );
                     $("#kls-r-values").children().eq(colindex_right).first().CanvasJSChart().render();
                    
                    break;
            }
                $(".canvasjs-chart-credit").remove();

        }
    });
});
