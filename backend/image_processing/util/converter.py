import cv2
import numpy as np

def tocv2Img(image):
    nparr = np.fromstring(image, np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)
