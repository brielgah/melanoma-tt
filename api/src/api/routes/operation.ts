import { type RequestHandler, Router } from 'express';
import { makeHttpRequest } from '../services/operation';

const operationRouter = Router({ mergeParams: true });
operationRouter.post('/analyze/:operation', (async (req, res, next) => {
  if (req.params.operation == null) {
    return res.status(400).send({
      result: false,
      message: 'missing operation to do',
    });
  }
  const badRequest = () => {
    return res.status(400).send({
      result: false,
      message: 'bad request',
    });
  };
  const operation = req.params.operation;
  if (
    req.body.blobNames == null ||
    req.body.blobNames.length < 1 ||
    req.body.blobNames.length > 2
  ) {
    return badRequest();
  }
  const cmd = {
    blobNameBefore: '',
    blobNameAfter: '',
    cmd: '',
  };
  switch (operation) {
    case 'compare':
      cmd.cmd = 'compare';
      cmd.blobNameBefore = req.body.blobNames[0];
      cmd.blobNameAfter = req.body.blobNames[1];
      break;
    case 'classify':
      cmd.cmd = 'classify';
      cmd.blobNameBefore = req.body.blobNames[0];
      break;
    case 'extract':
      cmd.cmd = 'extract';
      cmd.blobNameBefore = req.body.blobNames[0];
      break;
    default:
      return badRequest();
  }
  const options = {
    params: {
      cmd,
    },
    body: null,
  };
  makeHttpRequest(options)
    .then((result) => {
      res.status(result.status).send(result.data);
    })
    .catch((error) => {
      next(error);
    });
}) as RequestHandler);

export default operationRouter;
