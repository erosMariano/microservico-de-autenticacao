import { Pool } from "pg";

const connectionString = ""; //Chave Connection do banco postgress
const db = new Pool({ connectionString });

export default db;