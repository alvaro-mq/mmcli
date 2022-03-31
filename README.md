# mmcli
Library for ModemManager CLI (mmcli) 

## Documentation
You can find for more details, and other docs on [mmcli](https://www.freedesktop.org/software/ModemManager/man/1.0.0/mmcli.8.html) page.

## Installation
```
$ npm i modem-manager --save
```
## Api

```js
const modemManager = require('modem-manager');

modemManager.sendSms('77777777', 'hello text message').then((res) => {
  ...
});
```
