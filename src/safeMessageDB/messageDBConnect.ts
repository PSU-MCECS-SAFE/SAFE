import { Pool } from 'pg';
import {
  safeJSONProps as sjp,
  getConfigProp,
  safeConfigPath as scp,
} from '../safeUtil/Util';

export const protocol: string = 'https://';
export const addr: string = '131.252.208.28';
export const port: number = 7563;

/** 
 * Create database connection using Util.ts `getConfigProp` and the enum 
 * `safeJSONProps`. This const exists to keep secret information secret! We
 * really do not want to leak usernames and passwords ever!
 */
export const messageDBConnect = new Pool({
  user: getConfigProp(sjp.username, scp),
  database: getConfigProp(sjp.db_name, scp),
  port: 5432,
  host: getConfigProp(sjp.db_address, scp),
  password: getConfigProp(sjp.password, scp),
  // only use this option for development purposes
  ssl: { rejectUnauthorized: false },
});
