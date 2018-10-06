# Zivilschutz-Karte 2
Zivilschutz-Karte is a javascript application (based on Angular) which allows to draw situation maps for disaster management. It has been developed for the Swiss civil defense organisation "Zivilschutzorganisation Bern Plus". The drawing application can be used either with standard computers or with interactive whiteboards and is ready to be executed - e.g. in case of interrupted connections - in offline mode (with prepared offline maps and a restricted set of functionalities) as well as in online mode with the full capacities of modern map features. 

It is the successor of [Zivilschutz-Karte](https://github.com/olinux/zskarte) and is meant to be an update to a more modern technological stack.

##Installation
Zivilschutzkarte 2 is optimized and tested for use with Google Chrome - nevertheless other browsers might work as well and are supported in a best effort manner.

If you don't have a Google Chrome installation and do not have the permissions to install software, please see http://portableapps.com/apps/internet/google_chrome_portable

First, download the latest release from the projects' [release section](https://github.com/olinux/zskarte2/releases) and unzip the folder to any place you like.

##Configuration
You can add offline maps to the folder "offlinemap" and register them in the file "offlinemap/offlinemap.jsonp". Please see the provided example. All you need for configuration is the coordinates of the upper left and lower right corner of your map defined in [Mercator projection](http://en.wikipedia.org/wiki/Mercator_projection) as well as the image size in pixels. You can also define for which zoom levels a specific image shall be used and therefore define different levels of detailedness according to the zoom.

##Terms of use
Please note, that this application integrates several different map provider services. Since the terms of use of the different services usually restrict the extent of use (limited quotas, restricted access to data layers), it's the liability of the user to make sure that the corresponding limitations and/or preconditions are fulfilled.

## For developers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3. For the following commands, please navigate to the sub-directory "zskarte2"

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
