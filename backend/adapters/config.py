import os
from pathlib import Path

import yaml
from dotenv import load_dotenv


def load():
    load_dotenv()
    path = Path(__file__).parents[0] / './config.yml'
    with path.open() as file:
        config = yaml.safe_load(file)

    azure_key_vault = config['defaults']['azure']['keyvault']

    azure_key_vault['name'] = azure_key_vault['name'] or os.environ['KEY_VAULT_NAME']
    azure_key_vault['clientSecret'] = azure_key_vault['clientSecret'] or os.environ['CLIENT_SECRET']
    azure_key_vault['clientId'] = azure_key_vault['clientId'] or os.environ['CLIENT_ID']
    azure_key_vault['tenantId'] = azure_key_vault['tenantId'] or os.environ['TENANT_ID']

    config['defaults']['azure']['keyvault'] = azure_key_vault
    return config
