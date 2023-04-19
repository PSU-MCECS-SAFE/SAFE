import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';

export const safeConfigPath = '../../../safeConfig/safeConfig.json'

/* Use me when calling getConfigProp! Import like this if you want to use me!
 * import { safeJSONProps as sjp } from "../safeUtil/Util";
 */
export const enum safeJSONProps {
  username = "username",
  password = "password",
  db_address = "db_address",
  db_name = "db_name",
  rcvr_email = "rcvr_email"
}

export async function sendEmail() {
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

/**
 * Get specific information from a json file and its properties.
 * @param prop From enum config_props. Used as a key to id which json property
 * the code is hunting for
 * @returns a string containing the information being requested based on prop
 */
export function getConfigProp(prop: string, path: string): string {
  const PROP = prop;
  const PATH = path;
  const cfgString = fs.readFileSync(PATH, 'utf-8');
  const cfgObjbect = JSON.parse(cfgString);
  return cfgObjbect[PROP];
}