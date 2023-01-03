import { default as Pino } from 'pino';
import pretty from 'pino-pretty';
import config from '../../config/config';

const options = {
  name: 'borsappc',
  level: config.pinoLogLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
};

const logger = Pino(options);

const loggerJest = Pino(options, pretty({ sync: true }));

export { logger, loggerJest };
