import { type RequestOptions } from '../../lib/types';
import log from '../../lib/logger';
import axios, { type AxiosResponse } from 'axios';

interface Operation {
  op: string;
  blobNames: string[];
}

export const makeHttpRequest = async (
  options: RequestOptions<
  unknown,
  { cmd: { cmd: string; blobNameBefore: string; blobNameAfter: string } }
  >,
) => {
  try {
    const azFunc = process.env.AZURE_FUNCTION_URL ?? '';
    if (azFunc === '') {
      return {
        status: 500,
        data: {
          result: false,
          message: "Azure function URL isn't defined",
        },
      };
    }
    const cmd = options.params.cmd;
    const { data, status }: AxiosResponse<Operation> = await axios.post(
      azFunc,
      {
        op: cmd.cmd,
        blobNames: [cmd.blobNameBefore, cmd.blobNameAfter],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return {
      status,
      data,
    };
  } catch (error) {
    log.error('Error:', error);
    return {
      status: 500,
      data: {
        result: false,
        message: error,
      },
    };
  }
};
