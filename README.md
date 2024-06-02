# Mobile Automation Testing - Real Application
This project was created to complete the QAE Take Home Test assignment using JavaScript, WebDriverIO, and Mocha.

## How to set up and run the code
- Clone this repo
- Run `npm i`
- Install `C-Access` application on your phone
- Change the `deviceName` and `platformVersion` in `wdio.conf.js` file according to the phone that will be used
- Run `appium -p 4727` on your terminal to start Appium server
- Run `npx wdio wdio.conf.js` to run the test
