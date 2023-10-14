import { SecretClient } from '@azure/keyvault-secrets';
import { ClientSecretCredential } from '@azure/identity';
import config from '../lib/config';

type SecretsKeys = 'dummySecret' |
'AIConnectionString' |
'dbConnectionString';

const getSecrets = async () => {
  const keyVaultName = config.azure.keyvault.name;
  const clientSecret = config.azure.keyvault.clientSecret;
  const clientId = config.azure.keyvault.clientId;
  const tenantId = config.azure.keyvault.tenantId;

  if (keyVaultName == null) throw new Error('config.azure.keyvault.name is empty');
  if (clientId == null) throw new Error('config.azure.keyvault.clientId is empty');
  if (clientSecret == null) throw new Error('config.azure.keyvault.clientSecret is empty');
  if (tenantId == null) throw new Error('config.azure.keyvault.tenantId is empty');

  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const url = 'https://' + keyVaultName + '.vault.azure.net';

  const client = new SecretClient(url, credential);

  const keys: SecretsKeys[] = ['dummySecret', 'dbConnectionString', 'AIConnectionString'];
  const secrets = new Map<SecretsKeys, string | undefined>();

  await Promise.all(keys.map(async (key) => {
    const secret = await client.getSecret(key);
    secrets.set(key, secret.value);
    return [key, secret.value];
  }));

  return secrets;
};

export default getSecrets;
