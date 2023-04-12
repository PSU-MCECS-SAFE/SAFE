import { Client } from 'pg';

// Create database connection 
const messageDBConnect = new Client({
    user: 'haosheng',
    password: 'pw3m3pb#Dp',
    host: 'db.cecs.pdx.edu',
    database: 'haosheng',
    port: 5432,
    ssl: { rejectUnauthorized: false }, // only use this option for development purposes
});

export { messageDBConnect };