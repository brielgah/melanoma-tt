from azure.storage.blob import BlobServiceClient

from . import keyvault


def create_blob_service_client():
    secrets = keyvault.get_secrets()
    connection_string = secrets.get('blobStorageConnectionString')
    if connection_string is None:
        raise Exception('Blob connection string is undefined')
    return BlobServiceClient.from_connection_string(connection_string)


def create_image_container_client():
    blob_service_client = create_blob_service_client()
    secrets = keyvault.get_secrets()
    container_name = secrets.get('imageContainerName')
    if container_name is None:
        raise Exception('Image container string is undefined')
    image_container_client = blob_service_client.get_container_client(
        container_name)
    return image_container_client


def download_image(blob_name: str):
    try:
        image_container_client = create_image_container_client()
        block_blob_client = image_container_client.get_blob_client(blob_name)

        download_block_blob_response = block_blob_client.download_blob()
        blob_content = download_block_blob_response.readall()
    except Exception as error:
        return {
            'error': f'Error downloading blob: {str(error)}',
        }
    splited_blob_name = blob_name.split('.')
    return {
        'name': splited_blob_name[0],
        'ext': splited_blob_name[1],
        'data': blob_content,
    }
