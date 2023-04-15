import cv2
import numpy as np
from collections import defaultdict

def get_centroid(img):
   # Find the contours in the binary image
    contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Compute the moments of the contours
    largest_contour = max(contours, key=cv2.contourArea)

    # Calculate the centroid coordinates
    moments = cv2.moments(largest_contour)
    x = int(moments['m10'] / moments['m00'])
    y = int(moments['m01'] / moments['m00']) 
    return x, y

def traslate_img(img, x, y):
    rows, cols = img.shape 
    mov_x = rows//2 - x
    mov_y = cols//2 - y

    M = np.float32([[1, 0, mov_x], [0, 1, mov_y]])

    # Apply the translation to the image
    return cv2.warpAffine(img, M, (img.shape[1], img.shape[0]))

def count_ones(img):
    num_ones = 0
    for row in img:
        for pixel in row:
            if pixel != 0:
                num_ones = num_ones + 1
    return num_ones

# It must be a binary image
def get_simetry(img):
    x, y = get_centroid(img)
    img = traslate_img(img, x, y)
    vertical_mirror = cv2.flip(img, 1)
    horizontal_mirror = cv2.flip(img, 0)

    and_img_vert = cv2.bitwise_xor(img, vertical_mirror)
    and_img_hori = cv2.bitwise_xor(img, horizontal_mirror)

    percentage_vert = 1.0 - count_ones(and_img_vert) / count_ones(img)
    percentage_hort = 1.0 - count_ones(and_img_hori) / count_ones(img)

    return percentage_hort, percentage_vert, and_img_hori

class Threshold:
    def __init__(self, label: str, red_thresh: tuple[float,float], green_thresh: tuple[float,float], blue_thresh: tuple[float,float]):
        self.label = label
        low_r, up_r = red_thresh
        low_g, up_g = green_thresh
        low_b, up_b = blue_thresh
        self.red = (int(low_r * 255), int(up_r * 255))
        self.green = (int(low_g * 255), int(up_g * 255))
        self.blue = (int(low_b * 255), int(up_b * 255))

    def is_inside_red(self, r):
        return self.red[0] <= r and r <= self.red[1]
    def is_inside_green(self, g):
        return self.green[0] <= g and g <= self.green[1]
    def is_inside_blue(self, b):
        return self.blue[0] <= b and b <= self.blue[1]

    def is_inside(self, r, g, b):
        return self.is_inside_red(r) and self.is_inside_blue(b) and self.is_inside_green(g)

# Will receive the segmented lession in color. All of the boundaries
# wich are not part of the lession must have an rgb(0,0,0) color
def get_color_score(img, msk):
    rows, cols = msk.shape
    min_app = int(count_ones(msk) * 0.05)
    thresholds = [
        Threshold('white', (0.8, 1), (0.8, 1), (0.8, 1)),
        Threshold('red', (0.588, 1), (0, 0.2), (0, 0.2)),
        Threshold('light_brown', (0.588, 0.94), (0.2, 0.588), (0, 0.392)),
        Threshold('dark_brown', (0.243, 0.56), (0, 0.392), (0, 0.392)),
        Threshold('blue_gray', (0, 0.588), (0.392, 0.588), (0.49, 0.588)),
        Threshold('black', (0, 0.243), (0, 0.243), (0, 0.243)),
    ]
    colors = defaultdict(int)

    for i in range(0, rows):
        for j in range(0, cols):
            if(msk[i][j] == 0):
                continue
            b, g, r = img[i][j]
            for threshold in thresholds:
                if threshold.is_inside(r, g, b):
                    colors[threshold.label] += 1

    color_score = 0
    for value in colors.values():
        if value > min_app:
            color_score += 1

    return color_score