import { SecretClient } from '@azure/keyvault-secrets';
import { ClientSecretCredential } from '@azure/identity';
import config from '../lib/config';

type SecretsKeys =
  | 'dummySecret'
  | 'AIConnectionString'
  | 'blobStorageConnectionString'
  | 'imageContainerName'
  | 'dbHost'
  | 'dbPassword'
  | 'dbUsername'
  | 'dbName'
  | 'dbConnectionString';

const secrets = new Map<SecretsKeys, string | undefined>();

const getSecrets = async () => {
  if (secrets.size !== 0) return secrets;

  const keyVaultName = config.azure.keyvault.name;
  const clientSecret = config.azure.keyvault.clientSecret;
  const clientId = config.azure.keyvault.clientId;
  const tenantId = config.azure.keyvault.tenantId;

  if (keyVaultName == null) {
    throw new Error('config.azure.keyvault.name is empty');
  }
  if (clientId == null) {
    throw new Error('config.azure.keyvault.clientId is empty');
  }
  if (clientSecret == null) {
    throw new Error('config.azure.keyvault.clientSecret is empty');
  }
  if (tenantId == null) {
    throw new Error('config.azure.keyvault.tenantId is empty');
  }

  const credential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret,
  );
  const url = 'https://' + keyVaultName + '.vault.azure.net';

  const client = new SecretClient(url, credential);

  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    const secret = await client.getSecret(secretProperties.name);
    secrets.set(secretProperties.name as SecretsKeys, secret.value);
  }

  return secrets;
};

export default getSecrets;
