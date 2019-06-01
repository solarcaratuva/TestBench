from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from multiprocessing import Process
import serial

#ser = serial.Serial('/dev/ttyACM0', 115200, timeout=1)
#ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
ser = serial.Serial('ttyS10', 115200, timeout=1)

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('update')
def update_values(message):
    print(message)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/test")
def test():
    return(ser.readline())
    

if __name__ == "__main__":
    socketio.run(app)
