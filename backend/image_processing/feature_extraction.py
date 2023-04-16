import cv2
import numpy as np
from collections import defaultdict

def get_centroid(img) -> tuple[int,int]:
   # Find the contours in the binary image
    contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Compute the moments of the contours
    largest_contour = max(contours, key=cv2.contourArea)

    # Calculate the centroid coordinates
    moments = cv2.moments(largest_contour)
    x = int(moments['m10'] / moments['m00'])
    y = int(moments['m01'] / moments['m00']) 
    return x, y

def rotate_img(img, x: int, y: int, angle: float):
    rotation_matrix = cv2.getRotationMatrix2D((x, y), angle, 1.0)
    return cv2.warpAffine(img, rotation_matrix, (img.shape[1], img.shape[0]))

def traslate_img(img, x: int, y: int):
    rows, cols = img.shape 
    mov_x = rows//2 - x
    mov_y = cols//2 - y

    traslation_matrix = np.float32([[1, 0, mov_x], [0, 1, mov_y]])

    # Apply the translation to the image
    return cv2.warpAffine(img, traslation_matrix, (img.shape[1], img.shape[0]))

def count_ones(img) -> int:
    num_ones = 0
    for row in img:
        for pixel in row:
            if pixel != 0:
                num_ones = num_ones + 1
    return num_ones

# It must be a binary image
def get_simetry(img) -> float:
    rows, cols = img.shape
    _center, _axes, angle = get_major_axis(img)
    img = rotate_img(img, rows // 2, cols // 2, angle)

    x, y = get_centroid(img)
    img = traslate_img(img, x, y)
    ret = img
    vertical_mirror = cv2.flip(img, 1)
    horizontal_mirror = cv2.flip(img, 0)

    and_img_vert = cv2.bitwise_xor(img, vertical_mirror)
    and_img_hori = cv2.bitwise_xor(img, horizontal_mirror)

    percentage_vert = 1.0 - count_ones(and_img_vert) / count_ones(img)
    percentage_hort = 1.0 - count_ones(and_img_hori) / count_ones(img)

    return percentage_hort, percentage_vert, ret

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
def get_color_score(img, msk) -> int:
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

def has_border(img, x: int, y: int, len: int) -> int:
    rows, cols = img.shape
    cnt = [0, 0]
    for i in range(x, x + len):
        for j in range(y, y + len):
            if i >= rows or j >= cols:
                continue
            cnt[min(img[i][j], 1)] += 1
    return cnt[0] > 0 and cnt[1] > 0

def count_border(img, len: int) -> int:
    cnt = 0
    rows, cols = img.shape
    for i in range(0, rows, len):
        for j in range(0, cols, len):
            if has_border(img, i, j, len):
                cnt += 1
    return cnt

def get_roughness(img) -> float:
    counts = []
    sizes = []
    for i in range (2, 7):
        len = 2**i
        count = count_border(img, len)
        counts.append(np.log(count))
        sizes.append(np.log(len))
    slope = -np.polyfit(sizes, counts, 1)[0]
    return slope

def get_major_axis(img, img_org=None):
    contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    largest_contour = max(contours, key=cv2.contourArea)
    major_ellipse = cv2.fitEllipse(largest_contour)
    if img_org is None:
        return major_ellipse
    for contour in contours:
        if len(contour) < 5:
            continue
        # Fit an ellipse to the contour
        ellipse = cv2.fitEllipse(contour)

        # Extract the ellipse parameters
        center, axes, angle = ellipse
        major_axis = max(axes)
        minor_axis = min(axes)

        # Draw the ellipse on the original image
        cv2.ellipse(img_org, ellipse, (0, 255, 0), 2)
        
        # Draw the major and minor axes on the original image
        cv2.line(img_org, (int(center[0]), int(center[1])),
                (int(center[0] + 0.5 * minor_axis * np.cos(np.deg2rad(angle))),
                int(center[1] + 0.5 * minor_axis * np.sin(np.deg2rad(angle)))), (0, 0, 255), 2)
        cv2.line(img_org, (int(center[0]), int(center[1])),
                (int(center[0] - 0.5 * major_axis * np.sin(np.deg2rad(angle))),
                int(center[1] + 0.5 * major_axis * np.cos(np.deg2rad(angle)))), (255, 0, 0), 2)

    return major_ellipse, img_org
