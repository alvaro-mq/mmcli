const DataObjectParser = require('dataobject-parser');

const separateText = (text) => {
  const separate = text.trim().split('/');
  return separate[separate.length - 1];
};

const searchModemId = (text) => {
  if (text) {
    const [nameModem] = text.trim().split(' ');
    if (nameModem && nameModem.indexOf('Modem') >= 0) {
      return separateText(nameModem);
    }
  }
  return null;
};

const searchSmsId = (text) => {
  if (text && text.indexOf('/SMS') >= 0) {
    return separateText(text);
  }
  return null;
};

const $t = (text, obj) => {
  let temp = text;
  Object.keys(obj).forEach((prop) => {
    if (text.indexOf(`{${prop}}`) >= 0) {
      temp = temp.replace(new RegExp(`{${prop}}`, 'g'), obj[prop]);
    }
  });
  return temp;
};

const cleanText = (text) => text.replace(/[\n\t\r]/g, '');

const parseLegacyStatus = (text) => {
  var result = new DataObjectParser();
  text.split('\n').forEach(function(KeyValuePair) {
    let [Key, ...Values] = KeyValuePair.split(':');
    Key = Key.trim()
    Values = Values.join(':').trim();
    let KeyComponents = Key.split('.');
    if (KeyComponents[KeyComponents.length - 1] == 'length') {
      return;
    }
    if (KeyComponents[KeyComponents.length - 1].match(/value\[[0-9]+\]/)) {
      let keyValueIndex = parseInt(KeyComponents[KeyComponents.length - 1].replace(/^\D+/g, '')) - 1;
      Key = Key.replace('.' + KeyComponents[KeyComponents.length - 1], '[' + keyValueIndex + ']');
    }
    result.set(Key, Values);
  });
  return result.data();
};

module.exports = {
  searchModemId,
  searchSmsId,
  $t,
  cleanText,
  parseLegacyStatus,
};
