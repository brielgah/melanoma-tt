import json
import logging

import azure.functions as func

import dispatcher


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        body = req.get_json()
        logging.info('body: ', body)
        if 'blobNames' not in body:
            return func.HttpResponse("bad request", status_code=400)
        if 'op' not in body:
            return func.HttpResponse("bad request", status_code=400)

        result = dispatcher.dispatch(body['op'], body['blobNames'])
        return func.HttpResponse(
            json.dumps(result['data']),
            mimetype="application/json",
            status_code=result['status']
        )
    except Exception as err:
        logging.error(err)
        return func.HttpResponse(
            'internal error',
            mimetype="application/json",
            status_code=500
        )
