from dataclasses import dataclass
import cv2
from skimage import img_as_float
from skimage.segmentation import chan_vese

@dataclass
class DullRazorConfig:
    ksize: int = 1
    kanchor: tuple[int,int] = (9, 9)
    gaussian_ksize: tuple[int,int] = (3,3)
    threshold: int = 10
    threshold_max_val: int = 255
    inpaint_radius: int = 6

def dull_razor(
    img,
    config=DullRazorConfig()
):
    #Gray scale
    gray_scale = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY )

    #Black hat filter
    kernel = cv2.getStructuringElement(config.ksize, config.kanchor)
    blackhat = cv2.morphologyEx(gray_scale, cv2.MORPH_BLACKHAT, kernel)

    #Gaussian filter
    bhg = cv2.GaussianBlur(blackhat, config.gaussian_ksize, cv2.BORDER_DEFAULT)

    #Binary thresholding (MASK)
    _ret, mask = cv2.threshold(bhg, config.threshold, config.threshold_max_val, cv2.THRESH_BINARY)

    #Replace pixels of the mask
    dst = cv2.inpaint(img, mask, config.inpaint_radius, cv2.INPAINT_TELEA)

    return dst, bhg

def median_filtering(img, ksize=5):
    return cv2.medianBlur(img, ksize)

def otsu_method(img, gaussian_ksize=(5,5), threshold=0, threshold_max_val=255):
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(gray, gaussian_ksize, 0)
    _, ret = cv2.threshold(blur, threshold, threshold_max_val, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    return ret

def closing(img, kernel=(3,3)):
    img = invert_bitwise(img)
    return cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)

def opening(img, kernel=(3,3)):
    img = invert_bitwise(img)
    return cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)

def invert_bitwise(img):
    return cv2.bitwise_not(img)

def and_bitwise(img, msk):
    return cv2.bitwise_and(img, img, mask = msk)

@dataclass
class ChanVeseConfig:
    edge_length: float = 0.95
    lambda1: int = 1
    lambda2: int = 2
    tolerance: float = 1e-3
    iterations: int = 200
    delta: float = 0.5

def chan_vese_segmentation(
    img,
    config=ChanVeseConfig()
):
    image_float = img_as_float(img)
    mask = chan_vese(image_float, mu=config.edge_length, lambda1=config.lambda1,
                     lambda2=config.lambda2, tol=config.tolerance, max_num_iter=config.iterations,
                     dt=config.delta, init_level_set="checkerboard", extended_output=False)
    return img * mask

def hair_removal(img):
    processed_img, _bhf = dull_razor(img)
    return median_filtering(processed_img)

def lession_segmentation(img):
    segmented_image = otsu_method(img)
    segmented_image = invert_bitwise(chan_vese_segmentation(invert_bitwise(segmented_image)))
    enclosed_image = closing(segmented_image)
    return opening(invert_bitwise(enclosed_image))
