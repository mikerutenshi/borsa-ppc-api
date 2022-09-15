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

const dbConfig = process.env.RDS_CONNECTION_URL || config.get('db');

const db = pgp(dbConfig);

export { db, pgp };
