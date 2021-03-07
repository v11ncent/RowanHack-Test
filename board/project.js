const { spawn } = require('child_process');
const fs = require('fs');
const shortid = require('shortid');

//doesn't need to be exported
//true if checking for file, else false
function exists(fileName) {
    fileName = fileName || null;
    if (!(fs.existsSync('./.kanban'))) {
        return false;
    }
    if (fileName !== null) {
        if (!(fs.existsSync(`./.kanban/${fileName}.json`))) {
            return false;
        }
    }
    return true;
}

module.exports = {
    createProject(name) {
        return new Promise((resolve, reject) => {
            const project = require('./template.json');
            project['projectName'] = name;
            
            project.buckets.forEach(e => {
                e.id = shortid.generate();
                e.tasks.forEach(t => {
                    t.id = shortid.generate();
                });
            });

            try {
                //If kanban dir does not exist, create it
                if (!exists()) {
                    fs.mkdirSync('./.kanban');
                }
                //Writes new file with project data
                fs.writeFile(`./.kanban/${name}.json`, JSON.stringify(project), err => {
                    err && reject(err);
                    resolve(project);
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    },
    updateProject(name, obj) {
        return new Promise((res, rej) => {
            if (!exists()) {
                rej(new Error('Kanban folder does not exist.'));
            }
            if (!exists(name)) {
                rej(new Error(`${name} file does not exist.`));
            }
            try {
                fs.writeFile(`./.kanban/${name}.json`, JSON.stringify(obj), err => {
                    err && rej(err);
                    // spawn('git', ['-am', `"Update ${name} Project"`]);
                });
            } catch (err) {
                console.error(err);
                rej(err);
            }
        });
    },
    removeProject(name) {
        return new Promise((res, rej) => {
            if (!exists()) {
                rej(new Error('Kanban folder does not exist.'));
            }
            if (!exists(name)) {
                rej(new Error(`${name} file does not exist.`));
            }
            try {
                fs.unlink(`./.kanban/${name}.json`, err => {
                    err && rej(err);
                });
            } catch (err) {
                console.error(err);
                rej(err);
            }
        })
    },
    renameProject(name, newName) {
        return new Promise((res, rej) => {
            if (!exists()) {
                rej(new Error('Kanban folder does not exist.'));
            }
            if (!exists(`${name}`)) {
                rej(new Error(`${name} file does not exist.`));
            }
            try {
                fs.rename(`./.kanban/${name}.json`, `./.kanban/${newName}.json`, err => {
                    err && rej(err);
                })
            } catch (err) {
                console.error(err);
                rej(err);
            }
        })
    },
    getProjectData(name) {
        return new Promise((res, rej) => {
            if (!exists()) {
                rej(new Error('Kanban folder does not exist.'));
            }
            if (!exists(`${name}`)) {
                rej(new Error(`${name} file does not exist.`));
            }
            try {
                fs.readFile(`./.kanban/${name}.json`, 'utf-8', (err, data) => {
                    err && rej(err);
                    res(JSON.parse(data));
                })
            } catch (err) {
                console.error(err);
                rej(err);
            }
        })
    }
}