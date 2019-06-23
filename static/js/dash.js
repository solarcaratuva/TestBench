var speedOpts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.02, // The thickness
      color: '#FFFFFF' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    // renderTicks is Optional
    renderTicks: {
      divisions: 10,
      divWidth: 1,
      divLength: 1,
      divColor: '#EFEFEF',
      subDivisions: 5,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: '#EEEEEE'
    },
    percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    staticLabels: {
        font: "10px sans-serif",  // Specifies font
        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],  // Print labels at these values
        color: "#FFFFFF",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    staticZones: [
       {strokeStyle: "#30B32D", min: 0, max: 30}, // Green
       {strokeStyle: "#FFDD00", min: 30, max: 60}, // Yellow
       {strokeStyle: "#F03E3E", min: 60, max: 100}  // Red
    ],
    
};

var rpmOpts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.02, // The thickness
      color: '#FFFFFF' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    // renderTicks is Optional
    renderTicks: {
      divisions: 6,
      divWidth: 1,
      divLength: 1,
      divColor: '#EFEFEF',
      subDivisions: 5,
      subLength: 0.5,
      subWidth: 0.6,
      subColor: '#EEEEEE'
    },
    percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    staticLabels: {
        font: "10px sans-serif",  // Specifies font
        labels: [0, 1, 2, 3, 4, 5, 6],  // Print labels at these values
        color: "#FFFFFF",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    staticZones: [
       {strokeStyle: "#30B32D", min: 0, max: 5.0}, // Green
       {strokeStyle: "#FFDD00", min: 5.0, max: 5.75}, // Yellow
       {strokeStyle: "#F03E3E", min: 5.75, max: 6}  // Red
    ],
    
};

let rpm = 0;
let leftRPM = 0;
let rightRPM = 0;
let speed = 0;
let leftPower = 0;
let rightPower = 0;
let throttle = 0;
let leftCTemp = 0;
let rightCTemp = 0;
let leftMTemp = 0;
let rightMTemp = 0;

$(document).ready(function() {

    var leftGauge = document.getElementById("left-gauge"); 
    var speedGauge = new Gauge(leftGauge).setOptions(speedOpts);
    speedGauge.maxValue = 100; // set max gauge value
    speedGauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    speedGauge.animationSpeed = 128; // set animation speed (32 is default value)
    speedGauge.set(0); // set actual value

    var rightGauge = document.getElementById("right-gauge"); 
    var rpmGauge = new Gauge(rightGauge).setOptions(rpmOpts);
    rpmGauge.maxValue = 6; // set max gauge value
    rpmGauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    rpmGauge.animationSpeed = 128; // set animation speed (32 is default value)
    rpmGauge.set(0); // set actual value

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
        switch(msg.data["type"]) {
            case "kls_l":
                leftRPM = parseInt(msg.data["rpm"]);
                leftPower = parseInt(msg.data["voltage"]) * parseInt(msg.data["current"]);
                throttle = parseInt(msg.data["throttle"]);
                leftCTemp = parseInt(msg.data["controller_temp"]);
                leftMTemp = parseInt(msg.data["motor_temp"]);
                break;
            case "kls_r":
                rightRPM = parseInt(msg.data["rpm"]);
                rightPower = parseInt(msg.data["voltage"]) * parseInt(msg.data["current"]);
                throttle = parseInt(msg.data["throttle"]);
                rightCTemp = parseInt(msg.data["controller_temp"]);
                rightMTemp = parseInt(msg.data["motor_temp"]);
                break;
        }
        rpm = (leftRPM + rightRPM) / 2.0;
        speed = (rpm * 60) * (15 * Math.PI) / 63360;
        rpmGauge.set(rpm / 2000.0);
        speedGauge.set(speed);
        $("#rpm-display").html(rpm);
        $("#speed-display").html(Math.round(speed));
        $("#left-power").html(leftPower + " W");
        $("#right-power").html(rightPower + " W");
    });
});
