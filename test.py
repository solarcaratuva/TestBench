import serial
import time
import json
import random

ser = serial.Serial('ttyS10', 115200, timeout=1)
inputs_json = {}
while True:
    inputs_json["type"] = "inputs"
    inputs_json["BRAKE_CTRL"] = random.randint(0, 2**14)
    inputs_json["REGEN_CTRL"] = random.randint(0, 2**14)
    inputs_json["GEARSHIFT_CTRL"] = random.randint(-1, 1)
    inputs_json["TURNSIG_CTRL"] = random.randint(-1, 1)
    inputs_json["THROTTLE_CTRL"] = random.randint(0, 2**14)
    inputs_json["STEER_CTRL"] = random.randint(0, 2**14)
    inputs_json["HAZARD_CTRL"] = random.randint(0, 1)
    inputs_json["DOWN_CTRL"] = random.randint(0, 1)
    inputs_json["UP_CTRL"] = random.randint(0, 1)
    inputs_json["SEL_CTRL"] = random.randint(0, 1)
    inputs_json["KILL_SENSE"] = random.randint(0, 1)
    inputs_json["HORN_CTRL"] = random.randint(0, 1)
    inputs_json["HEADLIGHT_CTRL"] = random.randint(0, 1)
    inputs_json["BRAKE_CTRL"] = random.randint(0, 1)
    inputs = json.dumps(inputs_json) + '\n'
    ser.write(bytes(inputs, encoding='utf-8'))
    time.sleep(.5)
