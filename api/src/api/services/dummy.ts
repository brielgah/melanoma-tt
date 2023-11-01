import { type RequestOptions } from '../../lib/types';
import type Dummy from '../../models/dummy';
import log from '../../lib/logger';

// add in src/services the logic handler for each http request
// perform business logic, database queries, etc. here

type DummyRequestOptions = RequestOptions<Dummy, { id: number }>;

export const postDummy = async (options: DummyRequestOptions) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });
  log.debug('request ok');
  return {
    status: 200,
    data: 'postDummy ok!',
  };
};

export const getDummybyId = async (options: DummyRequestOptions) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });
  log.debug('request ok');
  return {
    status: 200,
    data: 'postDummy ok!',
  };
};

export const patchDummyById = async (options: DummyRequestOptions) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });
  log.debug('request ok');
  return {
    status: 200,
    data: 'postDummy ok!',
  };
};

export const deleteDummyById = async (options: DummyRequestOptions) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });
  log.debug('request ok');
  return {
    status: 200,
    data: 'postDummy ok!',
  };
};
