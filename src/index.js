const program = require('commander');
const package = require('../package.json');

/** Set program version with version placed on package.json file. */
program.version(package.version);

/** Avaliable commands in program. */
const commands = require('./core/commands');

commands.forEach(command => {
  program
    .command(command.command)
    .description(command.description)
    .action(command.action);
});

program.parse(process.argv);
