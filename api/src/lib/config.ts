import * as path from 'path';
import { load } from 'node-yaml-config';
import type IConfig from '../config';

const config = load(
  path.join(__dirname, '../../config/common.yml'),
  process.env.ENVIRONMENT,
) as IConfig;

if (process.env.PORT != null) {
  config.api.port = process.env.PORT;
}

export default config;
