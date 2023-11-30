from adapters.blob_storage import download_image
import image_processing.processor as img_proc


def verify_image_content(img, blobName):
    if 'error' in img:
        result = {
                'error': f'Error with img: {blobName} {img["error"]} ',
        }
        return result
    return None

def compare(blobNameBefore, blobNameAfter):
    img_before = download_image(blobNameBefore)
    err_before = verify_image_content(img_before, blobNameBefore)
    if err_before:
        return {
                'status': 500,
                'data' : err_before,
        }

    img_after = download_image(blobNameAfter)
    err_after = verify_image_content(img_after, blobNameAfter)
    if err_after:
        return {
                'status': 500,
                'data' : err_after,
        }

    result = img_proc.extract_and_compare(img_before, img_after)

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

    result = {
        'result': 0,
    }
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

