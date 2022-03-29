const searchModemId = (text) => {
  if (text) {
    const [ nameModem ] = text.trim().split(' ') ;
    if (nameModem && nameModem.indexOf('Modem') >= 0) {
      const separateText = nameModem.split('/');
      return separateText[separateText.length - 1];
    }
  }
  return null;
}

const $t = (text, obj) => {
  let temp = text;
  for (let prop in obj) {
    console.log(obj[prop], prop, text.indexOf(prop));
    if (text.indexOf(`{${prop}}`) >= 0) {
      temp = temp.replace(new RegExp('{'+ prop + '}', 'g'), obj[prop]);
    }
  }
  return temp;
}


module.exports = {
  searchModemId,
  $t,
}