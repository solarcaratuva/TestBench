# TestBench #
Test bench code to manually set values and perform diagnostics

## Contents of this repository ##

Testing the test bench webapp without physical serial hardware can be done with the following steps:
* `create_pty.sh` creates two fake serial ports using pseudo-teletypes
* `test.py` sends test JSON payloads to one of the two fake serial ports
* `app.py` needs to be configured to connect to the other fake serial port

## Setting up development environment ##
* `virtualenv -p python3 env`
* `source env/bin/activate`
* `pip install -r requirements.txt`

## Running TestBench ##
* `python app.py`
