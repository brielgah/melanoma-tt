import cv2

def border_with_sobel(img):
    # gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    img_blurred = cv2.GaussianBlur(img, (21, 21), 0)
    # Apply the Sobel operator to compute gradients in x and y directions
    sobel_x = cv2.Sobel(img_blurred, cv2.CV_64F, 1, 0)
    sobel_y = cv2.Sobel(img_blurred, cv2.CV_64F, 0, 1)

    # Compute the magnitude of the gradient using both x and y directions
    gradient_magnitude = cv2.magnitude(sobel_x, sobel_y)

    # Normalize the gradient magnitude to 0-255 range
    gradient_magnitude = cv2.normalize(gradient_magnitude, None, 0, 255, cv2.NORM_MINMAX)

    # Convert the gradient magnitude to an 8-bit unsigned integer (uint8) data type
    gradient_magnitude = gradient_magnitude.astype('uint8')

    # Apply a threshold to create a binary edge map
    threshold_value = 100  # Adjust this value to control the sensitivity of edge detection
    edges = cv2.threshold(gradient_magnitude, threshold_value, 255, cv2.THRESH_BINARY)[1]

    return edges

def canny(img):
    # gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    img_blurred = cv2.GaussianBlur(img, (21,21), 0)

    threshold1 = 60
    threshold2 = 60

    edges = cv2.Canny(img_blurred, threshold1, threshold2)

    return edges
