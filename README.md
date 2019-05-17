# Minimal-dark theme for Alf-F firmware
![Alt text](/DNS-320-Mockup.jpg "Minimal-dark mockup")

## What is it?
This is a theme project for alternative firmware for D-Link NAS device series (DNS320/320L/323 etc.). Main theme file is pure CSS, however the project makes use of following technologies all of which are included in theme files:
* Bootstrap 4.3.1
* jQuery 3.4.1
* a few Fontawesome icons 

## Installation instructions (2 steps)
### Installing theme
#### install `minimal-dark.zip` in the System --> Utilities --> Theme section
* open Alf-F admin panel in browser
* navigate to `System --> Utilities --> Theme`
* upload `minimal-dark.zip`

### Getting responsive design for mobile devices
#### modify `index.html` file located in `/usr/www/` folder 
* SSH to your device
* navigate to `/usr/www/`
* open `index.html` with your editor of choice
* add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to the `<head>...</head>` section of HTML

### Useful links
* [Alt-F Download](https://sourceforge.net/projects/alt-f/)
* [Alt-F Google Group](https://groups.google.com/forum/#!forum/alt-f)