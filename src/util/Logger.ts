import { default as Pino } from 'pino';
import pretty from 'pino-pretty';

export const logger = Pino({
  name: 'borsappc',
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const loggerJest = Pino(pretty({ sync: true }));
