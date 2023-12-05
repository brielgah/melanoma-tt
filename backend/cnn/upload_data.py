import os

import pandas as pd
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobClient, BlobServiceClient, ContainerClient

# Set your storage account details
account_name = ''
account_key = ''
container_name = ''
train_directory = os.path.join(
    os.getenv("DATASET_PATH"),
    'TRAIN_DATASET_AUGMENTED')
test_directory = os.path.join(
    os.getenv("DATASET_PATH"),
    'TEST_DATASET_AUGMENTED')
train_csv = "train_augmented.csv"
test_csv = "test_augmented.csv"

credential = DefaultAzureCredential()

# Create a BlobServiceClient
blob_service_client = BlobServiceClient(
    account_url=f"https://{account_name}.blob.core.windows.net",
    credential=account_key)

# Create a ContainerClient
container_client = blob_service_client.get_container_client(container_name)


def read_csv(file_name):
    data = pd.read_csv(os.path.join(os.getenv("DATASET_PATH"), file_name))
    return data


def label_data(data):
    labeled_data = {}
    for index, row in data.iterrows():
        labeled_data[row['file_path']] = row['melanoma']
    return labeled_data


def upload_files(local_directory_path, target_folder, labeled_data):
    count = 0
    for root, dirs, files in os.walk(local_directory_path):
        for file in files:
            print(file)
            if file not in labeled_data:
                continue
            label = "melanoma" if labeled_data[file] == 1 else "other"
            local_file_path = os.path.join(root, file)
            blob_name = f"{target_folder}/{label}/{file}"
            blob_client = container_client.get_blob_client(blob_name)
            with open(local_file_path, "rb") as data:
                count += 1
                print(f"Uploading {local_file_path}")
                blob_client.upload_blob(data, overwrite=True)
    print("Data uploaded successfully.")
    print(f"Uploaded {count} files")


def main():
    train_data = read_csv(train_csv)
    test_data = read_csv(test_csv)
    train_data_labeled = label_data(train_data)
    test_data_labeled = label_data(test_data)
    upload_files(train_directory, "train_no_segmented", train_data_labeled)
    upload_files(test_directory, "test_no_segmented", test_data_labeled)


if __name__ == '__main__':
    main()
