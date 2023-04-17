import cv2

from image_processing.image import TEST_IMAGES

from matplotlib import pyplot as plt


for image_metadata in TEST_IMAGES:
    img = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (image_metadata.size, image_metadata.size))
    hist = cv2.calcHist([img], [0], None, [256], [0, 256])
    plt.plot(hist)
    plt.show()
