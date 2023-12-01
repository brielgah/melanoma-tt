from dataclasses import dataclass

import cv2
import numpy as np


@dataclass
class DullRazorConfig:
    ksize: int = 1
    kanchor: tuple[int, int] = (9, 9)
    gaussian_ksize: tuple[int, int] = (3, 3)
    threshold: int = 10
    threshold_max_val: int = 255
    inpaint_radius: int = 6


def dull_razor(
    img,
    config=DullRazorConfig()
):
    # Gray scale
    gray_scale = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    # Black hat filter
    kernel = cv2.getStructuringElement(config.ksize, config.kanchor)
    blackhat = cv2.morphologyEx(gray_scale, cv2.MORPH_BLACKHAT, kernel)

    # Gaussian filter
    bhg = cv2.GaussianBlur(blackhat, config.gaussian_ksize, cv2.BORDER_DEFAULT)

    # Binary thresholding (MASK)
    _ret, mask = cv2.threshold(
        bhg, config.threshold, config.threshold_max_val, cv2.THRESH_BINARY)

    # Replace pixels of the mask
    dst = cv2.inpaint(img, mask, config.inpaint_radius, cv2.INPAINT_TELEA)

    return dst, bhg


def median_filtering(img, ksize=5):
    return cv2.medianBlur(img, ksize)


def otsu_method(img, gaussian_ksize=(5, 5), threshold=0,
                threshold_max_val=255):
    # gray = img
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    blur = cv2.GaussianBlur(gray, gaussian_ksize, 0)
    _, ret = cv2.threshold(blur, threshold, threshold_max_val,
                           cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    return ret


def closing(img, kernel=(3, 3)):
    img = invert_bitwise(img)
    return cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)


def opening(img, kernel=(3, 3)):
    img = invert_bitwise(img)
    return cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)


def invert_bitwise(img):
    return cv2.bitwise_not(img)


def and_bitwise(img, msk):
    return cv2.bitwise_and(img, img, mask=msk)


@dataclass
class ChanVeseConfig:
    edge_length: float = 0.95
    lambda1: int = 1
    lambda2: int = 2
    tolerance: float = 1e-3
    iterations: int = 200
    delta: float = 0.5


def hair_removal(img):
    processed_img, _bhf = dull_razor(img)
    return median_filtering(processed_img)


def homomorphic_filtering(image):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    # Compute the size of the input image
    rows, cols = image.shape

    d0 = 0.1 * rows
    gamma_h = 1.2
    gamma_l = 0.4
    C = 1.2
    # Compute the center of the image
    crow, ccol = rows // 2, cols // 2

    # Perform the logarithmic transformation
    image_log = np.log(image + 1.0)

    # Compute the DFT of the log-transformed image
    image_dft = np.fft.fft2(image_log)

    # Create a binary mask
    mask = np.zeros((rows, cols), dtype=np.uint8)
    mask[int(crow - d0):int(crow + d0), int(ccol - d0):int(ccol + d0)] = 1

    # Convert the mask to a floating-point array
    mask = mask.astype(np.float32)

    # Create a complex array for the filter with the same size as the input
    # image
    filter_array = np.zeros((rows, cols), dtype=np.complex64)

    # Set the filter values based on the formula
    center = (crow, ccol)
    u = np.arange(rows)
    v = np.arange(cols)
    u, v = np.meshgrid(u, v, indexing='ij')
    filter_array = (gamma_h - gamma_l) * \
        (1 - np.exp(-C * ((u - center[0])**2 +
         (v - center[1])**2) / (d0**2))) + gamma_l

    # Perform the element-wise multiplication in the frequency domain
    image_dft_filtered = image_dft * filter_array

    # Perform the inverse DFT to obtain the filtered image
    filtered_image = np.real(np.fft.ifft2(
        np.fft.ifftshift(image_dft_filtered)))

    # Perform exponential transformation to obtain the final filtered image
    filtered_image = np.exp(filtered_image) - 1.0

    # Normalize the filtered image to the range [0, 255]
    filtered_image = np.clip(filtered_image, 0, 1)
    filtered_image = (filtered_image * 255).astype(np.uint8)

    return filtered_image


def glare_removal(img):
    lower = (130, 130, 130)
    upper = (255, 255, 255)
    thresh = cv2.inRange(img, lower, upper)

    height, width = img.shape[:2]

    # apply morphology close and open to make mask
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    morph = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=1)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    morph = cv2.morphologyEx(morph, cv2.MORPH_DILATE, kernel, iterations=1)

    # floodfill the outside with black
    black = np.zeros([height + 2, width + 2], np.uint8)
    mask = morph.copy()
    mask = cv2.floodFill(mask, black, (0, 0), 0, 0, 0, flags=8)[1]

    # use mask with input to do inpainting
    # result1 = cv2.inpaint(img, mask, 101, cv2.INPAINT_TELEA)
    result2 = cv2.inpaint(img, mask, 101, cv2.INPAINT_NS)

    return result2


def adaptive_histogram_equalization(img):
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(3, 3))
    return clahe.apply(img)


def histogram_equalization(img):
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    img = cv2.GaussianBlur(img, (9, 9), 0)
    return cv2.equalizeHist(img)
