import * as path from 'path';
import { load } from 'node-yaml-config';
import type IConfig from '../config';
import 'dotenv/config';

const config = load(
  path.join(__dirname, '../../config/common.yml'),
  process.env.ENVIRONMENT,
) as IConfig;

export default config;
