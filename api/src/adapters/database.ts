import getSecrets from './keyvault';
import { Sequelize } from 'sequelize-typescript';
import log from '../lib/logger';

let sequelize: Sequelize | null = null;

const getSequelize = async () => {
  if (sequelize !== null) {
    return sequelize;
  }
  const secrets = await getSecrets();
  const dbName = secrets.get('dbName');
  const dbHost = secrets.get('dbHost');
  const dbUsername = secrets.get('dbUsername');
  const dbPassword = secrets.get('dbPassword');

  if (dbHost === undefined) {
    throw new Error('dbHost is empty');
  }
  if (dbName === undefined) {
    throw new Error('dbName is empty');
  }
  if (dbUsername === undefined) {
    throw new Error('dbUsername is empty');
  }
  if (dbPassword === undefined) {
    throw new Error('dbPassword is empty');
  }

  sequelize = new Sequelize({
    database: dbName,
    username: `${dbUsername}@${dbHost}`,
    password: dbPassword,
    host: dbHost,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        requestTimeout: 30000,
      },
    },
    models: [__dirname + './../models/*.model.ts'],
  });
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    log.error(error, 'Unable to connect to database');
  }
  return sequelize;
};

export default getSequelize;
