const express = require('express');
const { getProjectData } = require('./project');


// project.js
// function getProject() {
//     
// }

module.exports = {
    startService() {
        const app = express();
        const port = 3223;

        // endpoints
        // https://localhost:3223/ (GET) -- send <project>.json in the body
        // https://localhost:3223/ (POST) -- write <project.json> from the body

        app.get('/', (req, res) => {
            const name = 'newTest';
            const data = getProjectData(name);
            res.send('GET request successful...');
            res.send(`Data sent: ${data}`);
        });
        app.post('/', (req, res) => {
            // req.body.project == updated project
            const project = saveProject(JSON.parse(req.body));    
            res.send('POST request successful...');
            res.send(`Data sent: ${project}`);
        });
        
        app.listen(port, () => {
            
        });
    },

}