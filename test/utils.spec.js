const { searchModemId, $t } = require('../utils');

describe('searchModem', () => {
  it('Should return a number when there is some modem', () => {
    const idModem = '1';
    const text = `/org/freedesktop/ModemManager1/Modem/${idModem} [ZTE CORPORATION] MF190`;
    const result = searchModemId(text);
    expect(idModem).toEqual(result);
  });

  it('Should return null when there are modems', () => {
    const text = 'No modems were found';
    const result = searchModemId(text);
    expect(result).toBeNull();
  });

  it('Should return null when the input argument is falsy', () => {
    const text = null;
    const result = searchModemId(text);
    expect(result).toBeNull();
  });
});

describe('$t', () => {
  it('Should return a command with the argument replaced', () => {
    const obj = { id: 1 };
    const text = 'mmcli -m {id} -e';
    const result = $t(text, obj);
    expect(`mmcli -m ${obj.id} -e`).toEqual(result);
  });

  it('Should return a command without the argument replaced by an invalid object', () => {
    const obj = { id1: 1 };
    const text = 'mmcli -m {id} -e';
    const result = $t(text, obj);
    expect(text).toEqual(result);
  });
});