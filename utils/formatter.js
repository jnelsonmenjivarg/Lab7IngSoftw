/**
 * @module formatter
 * @description Wrapper sobre chalk para presentación estándar.
 * Componente reutilizado: chalk v4 (MIT License).
 */
const chalk = require('chalk');

const formatter = {
  exito  : (msg) => console.log(chalk.green('✔  ' + msg)),
  error  : (msg) => console.log(chalk.red('✖  ' + msg)),
  info   : (msg) => console.log(chalk.cyan('ℹ  ' + msg)),
  titulo : (msg) => console.log(chalk.bold.blue('\n' + msg + '\n' + '─'.repeat(40))),
};

module.exports = formatter;