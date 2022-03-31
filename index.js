const debug = require('debug')('index');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const {
  LIST_MODEMS, ENABLE_MODEM, CREATE_SMS, SEND_SMS,
} = require('./lib/commands');
const {
  searchModemId, $t, searchSmsId, cleanText,
} = require('./lib/utils');

const execCommand = async (command) => {
  try {
    debug('execute the command', command);
    const { stdout } = await exec(command);
    if (stdout) {
      const cleanStdout = cleanText(stdout);
      debug('result for the command', cleanStdout);
      return cleanStdout;
    }
    return stdout;
  } catch (error) {
    return error;
  }
};

const getResult = (result) => {
  if (result && result.stderr) {
    throw cleanText(result.stderr);
  }
  return cleanText(result);
};

const getModemId = async () => {
  const result = await execCommand(LIST_MODEMS);
  const modemId = searchModemId(getResult(result));
  debug('modem found ==>', modemId);
  return modemId;
};

const enableModemId = async (modemId) => {
  debug('enable modem id =>', modemId);
  const result = await execCommand($t(ENABLE_MODEM, { modemId }));
  return getResult(result);
};

const createSms = async (modemId, number, text) => {
  const result = await execCommand($t(CREATE_SMS, { modemId, number, text }));
  const smsId = searchSmsId(getResult(result));
  debug('sms created ==>', smsId);
  return smsId;
};

const sendSmsById = async (smsId) => {
  debug('send sms id =>', smsId);
  const result = await execCommand($t(SEND_SMS, { smsId }));
  return getResult(result);
};

const sendSms = async (number, message) => {
  const modemId = await getModemId();
  await enableModemId(modemId);
  const smsId = await createSms(modemId, number, message);
  const result = await sendSmsById(smsId);
  return result;
};

module.exports = {
  getModemId,
  enableModemId,
  createSms,
  sendSmsById,
  sendSms,
};
