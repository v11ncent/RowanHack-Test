'use strict';

const { getCommand, getCommandValue, executeCommand } = require('./commands');

function main() {
    const command = getCommand(process.argv);
    const value = getCommandValue(process.argv);
    executeCommand(command, value);
}

main();
