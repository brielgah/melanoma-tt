import base64

import cv2
import numpy as np


def convertToOpenCVFormat(image):
    base64_string = image['data'].split(b",")[1]
    image_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(image_data, np.uint8)

    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    scale_percent = 10  # percent of original size
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    # resize image
    return cv2.resize(img, dim, interpolation=cv2.INTER_AREA)


def convertOpenCVToBase64(img):
    img_str = base64.b64encode(cv2.imencode('.jpg', img)[1]).decode()
    return 'data:image/jpg;base64,' + img_str
