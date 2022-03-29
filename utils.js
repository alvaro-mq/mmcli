const searchModem = (text) => {
  if (text) {
    const [ nameModem ] = text.trim().split(' ') ;
    if (nameModem && nameModem.indexOf('Modem') >= 0) {
      const separateText = nameModem.split('/');
      return separateText[separateText.length - 1];
    }
  }
  return null;
}


module.exports = {
  searchModem,
}