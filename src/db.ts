import { Pool } from "pg";
require("dotenv").config;

const connectionString = process.env.CONNECT_STRING;

const db = new Pool({ connectionString });

export default db;
