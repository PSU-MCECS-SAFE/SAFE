import fs from 'fs';
import * as path from 'path';

/* This const is required to be done this way because of how getting file
 * paths can be, especially when interfacing from the client to the schools
 * network.
 * 
 * Remember, the website is all client ran and computed, but when requesting
 * resources from the network, that must be done by the machine hosting the
 * service.
 * - Alex (Capstone team Spring '23)
 */
export const safeConfigPath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'safeConfig',
  'safeConfig.json'
);

/**
 * Use me when calling getConfigProp! Import like this if you want to use me!
 * import { safeJSONProps as sjp } from "../safeUtil/Util";
 */
export const enum safeJSONProps {
  username = 'username',
  password = 'password',
  db_address = 'db_address',
  db_name = 'db_name',
  rcvr_email = 'rcvr_email',
}

/**
 * Get specific information from a json file and its properties, 
 * known as a `prop`.
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
