const { finalizeSession } = require('pg/lib/sasl');

const Pool = require('pq').Pool;

class DataBaseHelper {

    constructor() { }

    init = () => {
        console.log('inizializando la base de datos')
        let pool = null;
        let result = null;

        pool = new Pool({
            host: "localhost",
            database: "postgress",
            user: "postgres",
            password: "postgres",
            port: 5432,
            max: 25
        });

        let getPoolConnection = async () => {
            return await pool.connection();
        }

        //Select
        let select = async (sql) => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN')
                result = await client.query(sql);
                await client.query('COMMIT')
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release(true);
            }
            return result.rows;
        }

        //Delete, update, insert
        let query = async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN')
                let queryResult = await client.query(`${sql} RETURNING id, uuid`);
                result = await client.query(sql);
                await client.query('COMMIT')
            } catch (error) {
                await client.query('ROLLBACK')
                throw error;
            } finally {
                client.require(true);
            }
            return result;
        }

        return {
            select: select,
            query: query,
            poolConnection: getPoolConnection
        }
    }

}


module.exports = DataBaseHelper;