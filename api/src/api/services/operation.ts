import {type RequestOptions } from '../../lib/types'
import * as path from 'path'
import {spawn} from 'child_process';
import log from '../../lib/logger';

export const spawnProcess = async(
        options: RequestOptions<unknown, {cmd : { cmd : string, id1: string, id2: string}}>,
) => {
    const cmd = options.params.cmd;
    const pythonProcess = spawn('python3', [
        path.join(__dirname, '../../../../backend/dispatcher.py'),
        cmd.cmd,
        cmd.id1,
        cmd.id2,
    ]);

    let dataRes = '';
    let errorRes = '';

    const handleProcessCompletion = () => {
        if (errorRes.length) {
            log.info(`stderr data: ${errorRes}`);
            return Promise.resolve({
                status: 500,
                data: {
                    result: false,
                    message: errorRes,
                },
            });
        }

        log.info(`stdout data: ${dataRes}`);
        return Promise.resolve({
            status: 200,
            data: dataRes,
        });
    };

    // Attach event handlers
    pythonProcess.stdout.on('data', data => {
        const parsedData = JSON.parse(data);
        dataRes += JSON.stringify(parsedData);
    });
    pythonProcess.stderr.on('data', data => {
        const parsedData = JSON.parse(data);
        errorRes += JSON.stringify(parsedData);
    });

    // Wrap the process completion logic in a promise
    const processCompletionPromise = new Promise((resolve, reject) => {
        pythonProcess.on('close', () => {
            const result = handleProcessCompletion();
            resolve(result);
        });

        // Handle process errors
        pythonProcess.on('error', (err) => {
            reject(err);
        });
    });

    // Wait for the process to complete and return the result
    return processCompletionPromise;
}
