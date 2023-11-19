import yaml
from pathlib import Path
from dotenv import load_dotenv
import os

Config = {}

def load():
    load_dotenv()
    # TODO: is there a better way to do this
    path = Path(__file__).parents[2] / './api/config/common.yml'
    with path.open() as file:
        Config = yaml.safe_load(file)

    azure_key_vault = Config['defaults']['azure']['keyvault']

    azure_key_vault['name'] = azure_key_vault['name'] or os.environ['KEY_VAULT_NAME']
    azure_key_vault['clientSecret'] = azure_key_vault['clientSecret'] or os.environ['CLIENT_SECRET']
    azure_key_vault['clientId'] = azure_key_vault['clientId'] or os.environ['CLIENT_ID']
    azure_key_vault['tenantId'] = azure_key_vault['tenantId'] or os.environ['TENANT_ID']

    Config['defaults']['azure']['keyvault'] = azure_key_vault
    return Config
