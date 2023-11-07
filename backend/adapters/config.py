import yaml
from pathlib import Path

Config = {}

def load():
    # TODO: is there a better way to do this
    path = Path(__file__).parents[2] / './api/config/common.yml'
    with path.open() as file:
        Config = yaml.safe_load(file)

    return Config
