import serial
import time
import json
import random

ser = serial.Serial('ttyS10', 115200, timeout=1)
inputs_json = {}
kls_l_json = {}
kls_r_json = {}
while True:

    kls_l_json["type"] = "kls_l"
    kls_l_json["rpm"] = random.randint(0, 6000)
    kls_l_json["current"] = random.randint(0, 400)
    kls_l_json["voltage"] = random.randint(0, 1800)
    kls_l_json["throttle"] = random.randint(0, 255)
    kls_l_json["controller_temp"] = random.randint(0, 100)
    kls_l_json["motor_temp"] = random.randint(0, 100)
    kls_l_json["command_status"] = random.randint(0, 3)
    kls_l_json["feedback_status"] = random.randint(0, 3)
    kls_l_json["count"] = random.randint(0, 16)
    kls_l = json.dumps(kls_l_json) + '\n'

    kls_r_json["type"] = "kls_r"
    kls_r_json["rpm"] = random.randint(0, 6000)
    kls_r_json["current"] = random.randint(0, 400)
    kls_r_json["voltage"] = random.randint(0, 1800)
    kls_r_json["throttle"] = random.randint(0, 255)
    kls_r_json["controller_temp"] = random.randint(0, 100)
    kls_r_json["motor_temp"] = random.randint(0, 100)
    kls_r_json["command_status"] = random.randint(0, 3)
    kls_r_json["feedback_status"] = random.randint(0, 3)
    kls_r_json["count"] = random.randint(0, 16)
    kls_r = json.dumps(kls_r_json) + '\n'

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

    ser.write(bytes(kls_l, encoding='utf-8'))
    time.sleep(.2)
    ser.write(bytes(kls_r, encoding='utf-8'))
    time.sleep(.2)
    ser.write(bytes(inputs, encoding='utf-8'))
    time.sleep(.2)
