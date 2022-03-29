const debug = require('debug')('index');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { COMMAND_LIST_MODEMS } = require('./commands');
const { searchModem } = require('./utils');

const execCommand = async (command) => {
  try {
    debug('execute the command', command);
    const { stdout, stderr } = await exec(command);
    if (stdout) {
      console.log('result', stdout);
      const cleanStdout = stdout.replace(/[\n\t\r]/g, '');
      return cleanStdout;
    }
    throw stderr;
  } catch (error) {
    return error;
  }
}
