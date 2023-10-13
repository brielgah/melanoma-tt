import sql from 'mssql';
import getSecrets from './keyvault';

const getDatabasePool = async () => {
  const secrets = await getSecrets();
  const connectionString = secrets.get('dbConnectionString');
  if (connectionString === undefined) throw new Error('connectionString is empty');
  return await sql.connect(connectionString);
};

export default getDatabasePool;
