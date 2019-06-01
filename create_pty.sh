#!/bin/sh

touch ttyS10
touch ttyS11

chmod 666 ttyS10
chmod 666 ttyS11

socat -u -u pty,raw,echo=0,link=ttyS10 pty,raw,echo=0,link=ttyS11
