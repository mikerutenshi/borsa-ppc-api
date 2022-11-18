import promise from 'bluebird';
import pgPromise from 'pg-promise';
import monitor from 'pg-monitor';
import config from '../../../../config/config.mjs';

const options = {
  promiseLib: promise,
};

export const pgp = pgPromise(options);

//if (config.nodeEnv !== 'production') {
//  monitor.attach(options);
//}

const databaseUrl = config.postgres.url;
const cn = {
  connectionString: databaseUrl,
  allowExitOnIdle: true,
};
export const db = pgp(cn);
