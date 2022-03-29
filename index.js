const debug = require('debug')('index');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { LIST_MODEMS } = require('./commands');
const { searchModem } = require('./utils');

const execCommand = async (command) => {
  try {
    debug('execute the command', command);
    const { stdout, stderr } = await exec(command);
    if (stdout) {
      const cleanStdout = stdout.replace(/[\n\t\r]/g, '');
      debug('result for the command', cleanStdout);
      return cleanStdout;
    }
    throw stderr;
  } catch (error) {
    return error;
  }
}

const getModemId = async () => {
  const result = await execCommand(LIST_MODEMS);
  const id = searchModem(result);
  debug('modem found ==>', id)
  return id;
}

getModemId();