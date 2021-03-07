const { exec } = require('child_process');


exec('MYCOMMAND', err => {
    const date = new Date();
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Successfully autocommitted on ${date}`;)
})