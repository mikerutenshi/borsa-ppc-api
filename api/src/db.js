import promise from 'bluebird';
import pgPromise from 'pg-promise';
import monitor from 'pg-monitor';

const options = {
  promiseLib: promise,
};

const pgp = pgPromise(options);

if (process.env.NODE_ENV !== 'production') {
  monitor.attach(options);
}

const dbConfig = process.env.RDS_CONNECTION_URL || {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = pgp(dbConfig);

export { db, pgp };
