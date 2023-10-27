import { BlobServiceClient, type ContainerClient } from '@azure/storage-blob';
import getSecrets from './keyvault';
import type Image from '../models/image';
import log from '../lib/logger';

let blobServiceClient: BlobServiceClient | null = null;
let imageContainerClient: ContainerClient | null = null;

const createBlobServiceClient = async () => {
  if (blobServiceClient !== null) {
    return blobServiceClient;
  }
  const secrets = await getSecrets();
  const connectionString = secrets.get('blobStorageConnectionString');
  if (connectionString === undefined) {
    throw new Error('Blob connection string is undefined');
  }
  return BlobServiceClient.fromConnectionString(connectionString);
};

const createImageContainerClient = async () => {
  if (imageContainerClient !== null) {
    return imageContainerClient;
  }
  blobServiceClient = await createBlobServiceClient();
  const secrets = await getSecrets();
  const containerName = secrets.get('imageContainerName');
  if (containerName === undefined) {
    throw new Error('Image container name is undefined');
  }
  return blobServiceClient.getContainerClient(containerName);
};

async function streamToText(readable: NodeJS.ReadableStream) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk instanceof Buffer ? chunk.toString() : chunk;
  }
  return data;
}

export const uploadImage = async (image: Image) => {
  const blobName = `${image.name}.${image.ext}`;
  imageContainerClient = await createImageContainerClient();
  const blockBlobClient = imageContainerClient.getBlockBlobClient(blobName);
  log.info({ blobName }, 'Uploading image');
  const uploadResponse = await blockBlobClient.upload(
    image.data,
    image.data.length,
  );
  log.info(
    { blobName, requestId: uploadResponse.requestId },
    'Upload completed',
  );
};

export const downloadImage = async (blobName: string): Promise<Image> => {
  imageContainerClient = await createImageContainerClient();
  const blockBlobClient = imageContainerClient.getBlockBlobClient(blobName);
  log.info({ blobName }, 'Downloading image');
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  if (downloadBlockBlobResponse.readableStreamBody === undefined) {
    log.error({ blobName }, 'Errod downloading image');
    throw new Error('readableStreamBody is undefined');
  }
  const imagaData = await streamToText(
    downloadBlockBlobResponse.readableStreamBody,
  );
  log.info({ blobName }, 'Downloaded image');
  const splitedBlobName = blobName.split('.');
  return {
    name: splitedBlobName[0],
    ext: splitedBlobName[1],
    data: imagaData,
  };
};
