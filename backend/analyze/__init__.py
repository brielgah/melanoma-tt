import logging
import json
import azure.functions as func
import dispatcher

app = func.FunctionApp()

@app.function_name(name="operation")
@app.route(route="analyze", methods=['GET', 'POST'])
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
    except:
        return func.HttpResponse(
                'internal error',
                mimetype="application/json",
                status_code=500
        )
