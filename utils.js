const searchModemId = (text) => {
  if (text) {
    const [ nameModem ] = text.trim().split(' ') ;
    if (nameModem && nameModem.indexOf('Modem') >= 0) {
      return separateText(nameModem);
    }
  }
  return null;
}

const searchSmsId = (text) => {
  if (text && text.indexOf('/SMS') >= 0) {
    return separateText(text);
  }
  return null;
}

const separateText = (text) => {
  const separate = text.trim().split('/');
  return separate[separate.length -1];
}

const $t = (text, obj) => {
  let temp = text;
  for (let prop in obj) {
    if (text.indexOf(`{${prop}}`) >= 0) {
      temp = temp.replace(new RegExp('{'+ prop + '}', 'g'), obj[prop]);
    }
  }
  return temp;
}


module.exports = {
  searchModemId,
  searchSmsId,
  $t,
}