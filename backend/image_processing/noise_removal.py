import cv2

def dull_razor(img):

    #Gray scale
    grayScale = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY )

    #Black hat filter
    kernel = cv2.getStructuringElement(1, (9,9))
    blackhat = cv2.morphologyEx(grayScale, cv2.MORPH_BLACKHAT, kernel)

    #Gaussian filter
    bhg = cv2.GaussianBlur(blackhat, (3,3), cv2.BORDER_DEFAULT)

    #Binary thresholding (MASK)
    ret, mask = cv2.threshold(bhg, 10, 255, cv2.THRESH_BINARY)

    #Replace pixels of the mask
    dst = cv2.inpaint(img, mask, 6, cv2.INPAINT_TELEA)

    return dst, bhg

def median_filtering(img):
    return cv2.medianBlur(img, 5)

def otsu_method(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, ret = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    return ret

def closing(img):
    img = invert_bitwise(img)
    return cv2.morphologyEx(img, cv2.MORPH_OPEN, (3,3))

def invert_bitwise(img):
    return cv2.bitwise_not(img)

def and_bitwise(img, msk):
    return cv2.bitwise_and(img, img, mask = msk)
