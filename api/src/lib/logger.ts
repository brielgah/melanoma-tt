import bunyan, { type Stream, type LogLevelString } from 'bunyan';
import { type ILevels, type ILoggerConfig } from '../config';
import config from './config';

const createLogger = (config: ILoggerConfig) => {
  const bunyanConfig: Stream[] = [];
  const keys = Object.keys(config.levels);

  keys.forEach((level) => {
    const bunyanLevel = config.levels[level as keyof ILevels];
    if (bunyanLevel === null) return;

    if (level === 'debug' && config.level !== 'debug') return;

    let logger: Stream;

    if (bunyanLevel === 'STDOUT') {
      logger = { stream: process.stdout };
    } else if (bunyanLevel === 'STDERR') {
      logger = { stream: process.stderr };
    } else if (bunyanLevel) {
      logger = { path: bunyanLevel };
    } else {
      return;
    }

    logger.level = level as LogLevelString;

    bunyanConfig.push(logger);
  });

  return bunyan.createLogger({
    name: config.name ?? 'logger',
    level: config.level,
    streams: bunyanConfig,
  });
};

const log = createLogger(config.logger);

export default log;
