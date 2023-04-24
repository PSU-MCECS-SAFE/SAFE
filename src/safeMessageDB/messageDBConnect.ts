import { Client } from 'pg';
import {
  safeJSONProps as sjp,
  getConfigProp,
  safeConfigPath as scp,
} from '../safeUtil/Util';

// Create database connection
export const messageDBConnect: Client = new Client({
  user: getConfigProp(sjp.username, scp),
  database: getConfigProp(sjp.db_name, scp),
  port: 5432,
  host: getConfigProp(sjp.db_address, scp),
  password: getConfigProp(sjp.password, scp),
  // only use this option for development purposes
  ssl: { rejectUnauthorized: false },
});
