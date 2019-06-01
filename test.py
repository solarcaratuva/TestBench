import serial
import time

ser = serial.Serial('/dev/ttyS11', 115200, timeout=1)

while True:
    ser.write(b'hi\n')
    time.sleep(.5)
