from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
from celery import Celery
import serial
import json


app = Flask(__name__)
app.debug = True
socketio = SocketIO(app)

#port = "/dev/ttyACM0"
port = "ttyS11"
ser = serial.Serial(port, 115200, timeout=1)


def check_serial():
    while True:
        data = ser.readline()
        if len(data) > 0:
            try:
                data = data.decode("utf-8")
                json_data = json.loads(data)
                print(json_data)
                socketio.emit("update", {'data': json_data}, namespace="/test")
                print("sent")
            except:
                continue
    ser.close()


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("client_connected")
def client_connected(data):
    print("connected~")
    print(str(data))


@socketio.on("connected", namespace="/test")
def connected():
    print("connected")


@socketio.on("disconnected", namespace="/test")
def disconnected():
    print("disconnected")


if __name__ == "__main__":
    socketio.start_background_task(target=check_serial)
    socketio.run(app)
