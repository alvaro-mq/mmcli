# mmcli
Library for ModemManager CLI (mmcli) 

## Documentation
You can find for more details, and other docs on the [mmcli](https://www.freedesktop.org/software/ModemManager/man/1.0.0/mmcli.8.html) man page.

You can find a sample of the modem status JSON output [here](https://gitlab.freedesktop.org/mobile-broadband/ModemManager/-/issues/153#note_276857).

## Installation
```
$ npm i modem-manager --save
```

## Api
```js
getModemId()                                        // Returns the ID of the first modem found
enableModemId(modemId);                             // Enables the specified modem
createSms(modemId, 'number', 'message to send');    // Creates an SMS in ModemManager and returns its ID
sendSmsById(smsId);                                 // Sends the specified SMS by ID
sendSms('number', 'message to send');               // Wraps getModemId => enableModemId => createSms => sendSmsById
modemStatus(modemId);                               // Returns the modem status ie. signal strength as an object
```

## Examples
### Simple example to send an SMS and get the modem status of the first modem we find (using promises):
```js
// Require modemManager
const modemManager = require('modem-manager');

// Send SMS
modemManager.sendSms('77777777', 'hello text message').then((res) => {
  console.log("SMS send result: " + res);
});

// Print the first modem 0 status as a JSON object
modemManager.modemStatus(0).then((res) => {
  console.log("Modem Status", res);
});
```

### Advanced examples using a modem by it's ID (using await):
```js
// Require modemManager
const modemManager = require('modem-manager');

// Get our first modem - You can just set modem to an integer
// or the full path ie. /org/freedesktop/ModemManager1/Modem/0
const modem = await modemManager.getModemId();

// Enable the modem (you may not need to do this but it's documented just in case)
await modemManager.enableModemId(modem);

// Create an SMS ready to send
let sms = await modemManager.createSms(modem, '77777777', 'hello text message');

// Sends that SMS
let smsSendResult = await modemManager.sendSmsById(sms);
console.log("SMS send result: " + smsSendResult);

// Get the modem status ie. signal strength, IMEI, access technology
let modemStatus = await modemManager.modemStatus(modem);

// This returns a JSON object even if mmcli is missing support for it
// Note that all returned values are strings even if they seem numeric - you may need to parseInt()
console.log(modemStatus['modem']['generic']['equipment-identifier']);    // "868820123456789"
console.log(modemStatus['modem']['generic']['state']);                   // "connected"
console.log(modemStatus['modem']['generic']['access-technologies']);     // ["lte"]
console.log(modemStatus['modem']['generic']['signal-quality']['value']); // "100"

console.log(modemStatus['modem']['3gpp']['imei']);                       // "868820123456789"
console.log(modemStatus['modem']['3gpp']['operator-code']);              // "23410"
```

