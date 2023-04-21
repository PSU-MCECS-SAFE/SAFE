import { Client } from 'pg';
import {
    safeJSONProps as sjp,
    getConfigProp,
    safeConfigPath as scp
} from '../safeUtil/Util'

// Create database connection 
export const messageDBConnect = new Client({

    user: getConfigProp(sjp.username, scp),
    password: getConfigProp(sjp.password, scp),
    host: getConfigProp(sjp.db_address, scp),
    database: getConfigProp(sjp.db_name, scp),
    port: 5432,

    // only use this option for development purposes
    ssl: { rejectUnauthorized: false },
});

