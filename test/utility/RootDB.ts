import { readFile } from 'fs/promises';
import mysql from 'mysql2/promise';
import { PoolOptions } from 'mysql2/typings/mysql';
import { join } from 'path';

/** Class utilitaire pour réinitialiser la base de données 
 * - On DROP la base existant, si elle existe, 
 * - on en crée une nouvelle, 
 * - on importe le DDL
 * - (optionnelle) on fait executer les instructions SEED (remplir la base avec les données de test)
*/
export class RootDB {
  static async Reset() {

    const database = process.env.DB_DATABASE || "db_country_test";

    const config: PoolOptions = {         
      host: process.env.DB_HOST || "dbms",
      user: process.env.DB_ROOT_USER || "root",      
      password: process.env.DB_ROOT_PASSWORD || "rootpassword",
      multipleStatements: true
    };
    const POOL = mysql.createPool(config);

    const setup = await readFile(join('dbms', 'ddl', 'init-test.sql'), { encoding: 'utf-8'});   
    console.log(config);
    console.log(setup); 
    await POOL.query(setup);

    const ddl = await readFile(join('dbms', 'ddl', 'ddl.sql'), { encoding: 'utf-8'});
    console.log("QUERY")
    const query = `use ${database}; ${ddl}`
    console.log(query)
    await POOL.query(query);

    await POOL.end();
  }
}