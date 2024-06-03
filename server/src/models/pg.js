import pg from 'pg';
import config from 'config';

const { Pool } = pg;

export default (callback = null) => {
    const pool = new Pool({
        user: config.get('database.user'),
        password: config.get('database.password'),
        port: config.get('database.db_port'),
        database: config.get('database.db_name'),
        host: config.get('database.db_host'),
        connectionTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
        max: 100
    });

    const connection = {
        pool,
        query: (...args) => {
            return pool.connect().then((client) => {
                return client.query(...args).then((res) => {
                    console.log(pool.totalCount)
                    console.log(pool.idleCount)
                    console.log(pool.waitingCount)

                    return res.rows;
                }).catch(err => {
                    console.log(err);
                    client.release();
                    return err;
                }).finally(() => {
                    console.log('closed')
                    client.release();
                });
            });
        }
    };

    process.pg = connection;

    if (callback) {
        callback(connection);
    }

    return connection;
}
