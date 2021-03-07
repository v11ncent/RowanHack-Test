const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { updateProject, getProjectData } = require('./project');

module.exports = {
    startService(name) {
        return new Promise((resolve, reject) => {
            const app = express();
            const port = 3223;

            app.use(cors());
            app.use(bodyParser.json());

            app.get('/', async (request, response) => {
                const project = await getProjectData(name);
                if (project) {
                    response.send(project);
                }
            });

            app.post('/', (request, response) => {
                const project = request.body;
                updateProject(name, project);    
                if (project) {
                    response.send({ "successful": true });
                } else {
                    response.send({ "successful": false });
                }
            });
            
            app.listen(port, () => {
                resolve(true);
            })
        })
    }
}