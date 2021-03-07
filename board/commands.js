const { createProject, removeProject } = require('./project');
const { startService } = require('./service.js');

module.exports = {

    getCommand(arguments) {
        const args = [...arguments];
        args.splice(0, 2);
        return args[0];
    },

    getCommandValue(arguments) {
        const args = [...arguments];
        args.splice(0, 3);
        return args.pop();
    },

    executeCommand(command, value) {
        if (command && value) {
            switch (command) {
                case 'create':
                    console.log(`Creating new project ${value}...`);
                    createProject(value)
                        .then(() => console.log('Project created'))
                        .catch(() => console.error('Failed to create project'))
                        break;
                case 'remove':
                    console.log(`Removing project ${value}...`);
                    removeProject(value)
                        .then(() => console.log(`Removed ${value}`))
                        .catch(() => console.error(`Failed to remove ${value}`))
                    break;
                case 'start':
                    console.log(`Starting project ${value}`);
                    startService(value)
                        .then(() => console.log(`View your project on http://localhost:3223`))
                        .catch(() => console.error('Failed to start project'))
                    break;
                default:
                    console.error(`'${command}' is not a valid command.`);
            }

            return;
        }

        console.log(
            `
                Task Manager Commands \n
                create - Create a new task manager project \n
                remove - Removes a task manager project \n
                start - Starts a task manager project \n
            `
        );
    }

}