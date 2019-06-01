import serial
import time
import json

ser = serial.Serial('ttyS10', 115200, timeout=1)
asdf = {}
asdf['test'] = 'asdf'
while True:
    s = json.dumps(asdf) + '\n'
    ser.write(bytes(s, encoding='utf-8'))
    time.sleep(.5)
