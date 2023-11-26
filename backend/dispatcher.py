from adapters.blob_storage import download_image
import image_processing.processor as img_proc
from cnn.ResNet.ResNet import predict


def verify_image_content(img, blobName):
    if 'error' in img:
        result = {
                'error': f'Error with img: {blobName} {img["error"]} ',
        }
        return result
    return None

def compare(blobNameBefore, blobNameAfter):
    result1 = extract(blobNameBefore)
    result2 = extract(blobNameAfter)

    if result1['status'] != 200:
        return result1
    if result2['status'] != 200:
        return result2

    result = {
            'result1': result1['data'],
            'result2': result2['data'],
    };

    return {
            'status': 200,
            'data' : result,
    }

def classify(blobName):
    img = download_image(blobName)
    err = verify_image_content(img, blobName)
    if err:
        return {
                'status': 500,
                'data' : err,
        }

    predict(img)
    result = predict(img)
    return {
            'status' : 500 if 'error' in result else 200,
            'data': result,
    }

def extract(blobName):
    img = download_image(blobName)
    err = verify_image_content(img, blobName)
    if err:
        return {
                'status': 500,
                'data' : err,
        }
    result = img_proc.extract(img)
    return {
            'status': 200,
            'data': result,
    }

def dispatch(op, blobNames):
    if op == 'compare':
        blobNameBefore = blobNames[0]
        blobNameAfter = blobNames[1]
        return compare(blobNameBefore, blobNameAfter)
    elif op == 'classify':
        blobName = blobNames[0]
        return classify(blobName)
    elif op == 'extract':
        blobName = blobNames[0]
        return extract(blobName)
    else:
        result = {
                'status': 400,
                'error': 'bad request',
        }
        return result

