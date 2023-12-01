import os

import pandas as pd
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobClient, BlobServiceClient, ContainerClient

# Set your storage account details
account_name = ''
account_key = ''
container_name = ''
local_directory_path = os.path.join(os.getenv("DATASET_PATH"), 'TRAIN_DATASET')
train_csv = "train_augmented_2.csv"
test_csv = "test.csv"

credential = DefaultAzureCredential()

# Create a BlobServiceClient
blob_service_client = BlobServiceClient(
    account_url=f"https://{account_name}.blob.core.windows.net",
    credential=account_key)

# Create a ContainerClient
container_client = blob_service_client.get_container_client(container_name)

# Read csv filename
train = pd.read_csv(os.path.join(os.getenv("DATASET_PATH"), train_csv))
test = pd.read_csv(os.path.join(os.getenv("DATASET_PATH"), test_csv))

train_labeled = {}
for index, row in train.iterrows():
    train_labeled[row['file_path']] = row['melanoma']

# Upload files from the local directory to Azure Blob Storage
target_folder = "train"
count = 0
for root, dirs, files in os.walk(local_directory_path):
    for file in files:
        if file not in train_labeled:
            continue
        label = "melanoma" if train_labeled[file] == 1 else "other"
        local_file_path = os.path.join(root, file)
        blob_name = f"{target_folder}/{label}/{file}"
        blob_client = container_client.get_blob_client(blob_name)
        with open(local_file_path, "rb") as data:
            count += 1
            blob_client.upload_blob(data, overwrite=True)
print("Train Data uploaded successfully.")
print(f"Uploaded {count} files")

count = 0
target_folder = "test"
for index, row in test.iterrows():
    file = row["name"]
    path = row["path"]
    label = "melanoma" if row["melanoma"] == 1 else "other"
    local_file_path = os.path.join(path, file)
    blob_name = f"{target_folder}/{label}/{file}"
    blob_client = container_client.get_blob_client(blob_name)
    with open(local_file_path, "rb") as data:
        count += 1
        blob_client.upload_blob(data, overwrite=True)
print("Test Data uploaded successfully.")
print(f"Uploaded {count} files")
