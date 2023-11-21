from adapters.blob_storage import download_image
import sys
import image_processing.processor as img_proc
import json
from cnn.ResNet.ResNet import predict


def verify_image_content(img, blobName):
    if 'error' in img:
        result = {
                'error': f'Error with img: {blobName} {img["error"]} ',
        }
        print(json.dumps(result), file=sys.stderr)
        exit(-1)

def compare(blobNameBefore, blobNameAfter):
    result1 = extract(blobNameBefore)
    result2 = extract(blobNameAfter)

    result = {
            'result1': result1,
            'result2': result2,
    };

    return json.dumps(result)


def classify(blobName):
    img = download_image(blobName)
    verify_image_content(img, blobName)
    predict(img)
    result = predict(img)
    return json.dumps(result)

def extract(blobName):
    img = download_image(blobName)
    verify_image_content(img, blobName)

    result = img_proc.extract(img)

    return json.dumps(result)


def main():
    op = sys.argv[1]
    if op == 'compare':
        blobNameBefore = sys.argv[2]
        blobNameAfter = sys.argv[3]
        print(compare(blobNameBefore, blobNameAfter))
    elif op == 'classify':
        blobName = sys.argv[2]
        print(classify(blobName))
    elif op == 'extract':
        blobName = sys.argv[2]
        print(extract(blobName))
    else:
        result = {
                'error': 'bad request',
        }
        print(json.dumps(result), file=sys.stderr)

if __name__ == '__main__':
    main()
