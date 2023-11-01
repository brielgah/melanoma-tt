import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'mydatabase',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  host: 'localhost',
  models: [__dirname + '/models'], // or [Player, Team],
});
