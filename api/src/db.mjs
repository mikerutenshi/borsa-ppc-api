import promise from 'bluebird';
import pgPromise from 'pg-promise';
import monitor from 'pg-monitor';
import config from '../config/config.mjs';

const options = {
  promiseLib: promise,
};

const pgp = pgPromise(options);

if (config.nodeEnv !== 'production') {
  monitor.attach(options);
}

const db = pgp(config.postgres.url);

export { db, pgp };
