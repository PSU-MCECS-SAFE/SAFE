// async function SendEmail()
// {
//     var message = 'This is supposed to be a message from the db';
//     const { exec } = require('child_process');
//     //Fill out email address below.
//     exec(`mail -s 'You have received new feedback!' @pdx.edu <<< "${message}"`,
//             (error, stdout, stderr) => {
//                 console.log(stdout);
//                 console.log(stderr);
//                 if (error !== null) {
//                     console.log(`exec error: ${error}`);
//                 }
//             });
// }

// SendEmail()
// .catch(e => console.log(e));

import { promisify } from 'util';
import { exec } from 'child_process';

export class util {
  public async SendEmail() {
    var message = 'This is supposed to be a message from the db';
    const command = `mail -s 'You have received new feedback!' leshi@pdx.edu <<< "${message}"`;
    const execPromise = promisify(exec);

    //Fill out email address below.
    try {
      const { stdout, stderr } = await execPromise(command);
      console.log(stdout);
      console.log(stderr);
    } catch (error) {
      console.error(`exec error: ${error}`);
    }
  }
}

export default util;
