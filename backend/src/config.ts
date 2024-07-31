import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  // data base configuration
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT)

};



export default config;
