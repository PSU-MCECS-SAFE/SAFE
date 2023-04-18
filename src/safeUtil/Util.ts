async function SendEmail()
{
    var message = 'This is supposed to be a message from the db';
    const { exec } = require('child_process');
    //Fill out email address below.
    exec(`mail -s 'You have received new feedback!' @pdx.edu <<< "${message}"`,
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
}

SendEmail()
.catch(e => console.log(e));