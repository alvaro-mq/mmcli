const { searchModemId, searchSmsId, $t } = require('../lib/utils');

describe('searchModemId', () => {
  it('Should return a number when there is some modem', () => {
    const modemId = '1';
    const text = `/org/freedesktop/ModemManager1/Modem/${modemId} [ZTE CORPORATION] MF190`;
    const result = searchModemId(text);
    expect(modemId).toEqual(result);
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


describe('searchSmsId', () => {
  it('Should return a number when there is some sms created', () => {
    const smsId = '1';
    const text = `Successfully created new SMS: /org/freedesktop/ModemManager1/SMS/${smsId}`;
    const result = searchSmsId(text);
    expect(smsId).toEqual(result);
  });

  it('Should return null when there are modems', () => {
    const text = `error: couldn't find modem`;
    const result = searchSmsId(text);
    expect(result).toBeNull();
  });
  
  it('Should return null when the input argument is falsy', () => {
    const text = null;
    const result = searchSmsId(text);
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