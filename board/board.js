module.exports = {
    createProject(name) {
        const project = require('./template.json');
        project['projectName'] = name;
       
        // get current directory
        // check if .kanban exists, if not create it
        // Add logic to create .kanban/[name].json (fs module)
        
        
        return project;
    }
}