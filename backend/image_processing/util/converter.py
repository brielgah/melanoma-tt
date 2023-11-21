import cv2
import base64
import numpy as np

def convertToOpenCVFormat(image):
    base64_string = image['data'].split(b",")[1]
    image_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(image_data, np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
