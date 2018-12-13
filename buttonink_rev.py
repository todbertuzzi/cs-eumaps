################################################################################
#
# Bare Conductive Pi Cap
# ----------------------
#
# touch-mp3.py - polyphonic touch triggered MP3 playback
#
# Written for Raspberry Pi.
#
# Bare Conductive code written by Stefan Dzisiewski-Smith and Szymon Kaliski.
#
# This work is licensed under a Creative Commons Attribution-ShareAlike 3.0
# Unported License (CC BY-SA 3.0) http://creativecommons.org/licenses/by-sa/3.0/
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
#################################################################################

#!/usr/bin/python

from time import sleep
import locale
import curses
import sys
import time

from pySpacebrew.spacebrew import Spacebrew


from time import sleep
from subprocess import call
import signal, sys, pygame, MPR121
import RPi.GPIO as GPIO


try:
  sensor = MPR121.begin()
except Exception as e:
  print e
  sys.exit(1)

num_electrodes = 12

# this is the touch threshold - setting it low makes it more like a proximity trigger default value is 40 for touch
touch_threshold = 80

# this is the release threshold - must ALWAYS be smaller than the touch threshold default value is 20 for touch
release_threshold = 30 

# set the thresholds
sensor.set_touch_threshold(touch_threshold)
sensor.set_release_threshold(release_threshold)

#sensor.set_touch_threshold(6, 80)
#sensor.set_release_threshold(6, 50) 

#sensor.set_touch_threshold(4, 80)
#sensor.set_release_threshold(4, 50) 

#sensor.set_touch_threshold(5, 80)
#sensor.set_release_threshold(5, 50) 

# handle ctrl+c gracefully
def signal_handler(signal, frame):
  light_rgb(0, 0, 0)
  sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

# set up LED
red_led_pin = 6
green_led_pin = 5
blue_led_pin = 26

def light_rgb(r, g, b):
  # we are inverting the values, because the LED is active LOW
  # LOW - on
  # HIGH - off
  GPIO.output(red_led_pin, not r)
  GPIO.output(green_led_pin, not g)
  GPIO.output(blue_led_pin, not b)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(red_led_pin, GPIO.OUT)
GPIO.setup(green_led_pin, GPIO.OUT)
GPIO.setup(blue_led_pin, GPIO.OUT)

# convert mp3s to wavs with picap-samples-to-wav
light_rgb(0, 0, 1)
call("picap-samples-to-wav tracks", shell = True)
light_rgb(0, 0, 0)

# initialize mixer and pygame
#pygame.mixer.pre_init(frequency = 44100, channels = 12, buffer = 1024)
pygame.mixer.init(48000, -16, 1, 1024)
pygame.init()

# load paths
paths = []
electrods = []
channel=[0,1,2,3,4,5,6,7,8,9,10,11]

trackLabels=["thomA","track_bimbi_","set_t_","set_v_","set_p_","track_p_","set_o_","TRACK"]
id_trackLables = 0
max_tracks_set = 7

# PULL UP RESISTOR SU PIN 13 - btn 
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)


def puliscoEcarico ():
  print ("carico scarico")
  global id_trackLables
  if id_trackLables < max_tracks_set:
    id_trackLables = id_trackLables +1
  else:
    id_trackLables = 0


  pygame.mixer.stop()
  pygame.quit()
  pygame.init()

  

  paths = []
  for i in range(num_electrodes):
    print i 
    path = "tracks/.wavs/"+trackLabels[id_trackLables]+"{0:03d}.wav".format(i)
    print "loading file: " + path
    #electrods[i]= "no"
   # channel [i] = 0
    paths.append(path)

    path = paths[i]
    sound = pygame.mixer.Sound(path)
    pygame.mixer.set_num_channels(12)

    channel[i] = sound
    if trackLabels[id_trackLables] == "track_bimbi_" :
      #channel[i].play(1)
      channel[i].set_volume(1)
    else :
      channel[i].play(-1)
      channel[i].set_volume(0)
    if i==11:
     print ("FINITO")  
     pygame.mixer.music.load('foo.mp3')
     pygame.mixer.music.play(0)


for i in range(num_electrodes):
  #path = "tracks/.wavs/"+trackLabels[id_trackLables]+"{0:03d}.wav".format(i)
  path = "tracks/.wavs/set_t_{0:03d}.wav".format(i)
  
  
  print "loading file: " + path
  #electrods[i]= "no"
 # channel [i] = 0
  paths.append(path)

  path = paths[i]
  sound = pygame.mixer.Sound(path)
  pygame.mixer.set_num_channels(12)

  channel[i] = sound
  channel[i].play(-1)
  channel[i].set_volume(0) 

  #if i > 8:
  #  channel[i].set_volume(0) 
  #  print i
  #else :
  #   channel[i].set_volume(1)
counterPressed = 0

#initialise a previous input variable to 0 (assume button not pressed last)
prev_input = 0

while True:
  input_state = GPIO.input(22)
  if ((not prev_input) and input_state) == True:
      #counterPressed = counterPressed + 1
      #update previous input
      print('Button Pressed') 
      puliscoEcarico()
      time.sleep(0.1) 
      if counterPressed==50 : 
          counterPressed = 0 
          print('Button Pressed')
          puliscoEcarico()
          time.sleep(0.3)
  
  prev_input = input_state
  #slight pause to debounce
  time.sleep(0.05)

  if sensor.touch_status_changed():
    sensor.update_touch_data()
    is_any_touch_registered = False

    for i in range(num_electrodes):
      if sensor.get_touch_data(i):
        # check if touch is registred to set the led status
        is_any_touch_registered = True
      if sensor.is_new_touch(i):
        if i == 9 :
          print "change sound: " + str(i) 
          print('Button Pressed') 
          puliscoEcarico()
          time.sleep(0.1) 
        else:  
          # play sound associated with that touch
          print "playing sound: " + str(i)
          print "treshold: "+str(sensor.get_touch_threshold(i))
          print channel[i]
          # electrods[i]= "si" 
          #path = paths[i]
          #sound = pygame.mixer.Sound(path)
          #channel[i] = sound
          #sound.play(-1)
          channel[i].set_volume(1) 
      
      elif sensor.is_new_release(i):
        if i != 9 :
          print "stop sound: " + str(i) 
          # electrods[i]= "no"
          #soundStop = channel[i]
          channel[i].set_volume(0)
          #soundStop.stop()
    # light up red led if we have any touch registered currently
    if is_any_touch_registered:
      light_rgb(1, 0, 0)
    else:
      light_rgb(0, 0, 0)

  # sleep a bit
  sleep(0.01)
