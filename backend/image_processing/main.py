import cv2
from noise_removal import dull_razor, median_filtering, otsu_method, closing, and_bitwise
from testing import getMSSISM

IMAGES_PATHS = ["example3.jpg", "example4.jpg", "melColor.jpg"]
IMG_SIZE = 200

for i, path in enumerate(IMAGES_PATHS):
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    processed_img, bhf = dull_razor(img)
    blurred_image = median_filtering(processed_img)
    segmented_image = otsu_method(blurred_image)
    enclosed_image = closing(segmented_image)
    segmented_color = and_bitwise(blurred_image, enclosed_image)

    # cv2.imshow(f'Processed {i + 1}', processed_img)
    # cv2.imshow(f'Blurred {i + 1}', blurred_image)
    # cv2.imshow(f'Segmented {i + 1}', segmented_image)
    # cv2.imshow(f'Enclosed {i + 1}', enclosed_image)
    cv2.imshow(f'Segmented lession {i + 1}', segmented_color)
    cv2.imshow(f'Original {i + 1}', img)

    mssimv = getMSSISM(img, blurred_image)
    print("MSSISM: R {}% G {}% B {}%".format(round(mssimv[2] * 100, 2), round(mssimv[1] * 100, 2), round(mssimv[0] * 100, 2)))

cv2.waitKey(0)


cv2.destroyAllWindows()
