const { searchModem } = require('../utils');
describe('searchModem', () => {
  it('Should return a number when there is some modem', () => {
    const idModem = '1';
    const text = `/org/freedesktop/ModemManager1/Modem/${idModem} [ZTE CORPORATION] MF190`;
    const result = searchModem(text);
    expect(idModem).toEqual(result);
  });

  it('Should return null when there are modems', () => {
    const text = 'No modems were found';
    const result = searchModem(text);
    expect(result).toBeNull();
  });

  it('Should return null when the input argument is falsy', () => {
    const text = null;
    const result = searchModem(text);
    expect(result).toBeNull();
  });

});