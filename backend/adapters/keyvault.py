from . import config
from azure.identity import ClientSecretCredential
from azure.keyvault.secrets import SecretClient

secrets = {}

def get_secrets():
    if len(secrets) != 0:
        return secrets

    conf = config.load()
    azure_key_vault = conf['defaults']['azure']['keyvault']

    keyvault_name = azure_key_vault['name']
    client_secret = azure_key_vault['clientSecret']
    client_id = azure_key_vault['clientId']
    tenant_id = azure_key_vault['tenantId']

    credential = ClientSecretCredential(
            tenant_id=tenant_id,
            client_secret=client_secret,
            client_id=client_id,
    )

    url = 'https://' + keyvault_name + '.vault.azure.net'
    client = SecretClient(vault_url=url, credential=credential)

    for secret_properties in client.list_properties_of_secrets():
        name = secret_properties.name if secret_properties.name is not None else ''
        if len(name) == 0:
            continue
        secret = client.get_secret(name=name)
        secrets[secret_properties.name] = secret.value
    return secrets

