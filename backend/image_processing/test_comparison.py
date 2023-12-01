import cv2

from .comparison_img import add_imgs, get_color_score_pallet, get_contour_img
from .feature_extraction import center
from .processor import process_image
from .util.image import TEST_IMAGES


def main():
    image_metadata = TEST_IMAGES[1]

    img = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    [processed_img, msk] = process_image(img)

    img1 = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    image_metadata = TEST_IMAGES[2]
    img2 = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    [processed_img1, msk1] = process_image(img1)
    [processed_img2, msk2] = process_image(img2)

    msk, processed_img = center(msk, processed_img)
    pallete = get_color_score_pallet(processed_img, msk)
    contour1 = get_contour_img(processed_img1, msk1)
    contour2 = get_contour_img(processed_img2, msk2, (255, 0, 0))
    dst = add_imgs(contour1, contour2)
    # print(img)

    cv2.imshow('1', contour1)
    cv2.imshow('2', contour2)
    cv2.imshow('join', dst)
    # cv2.imshow('Org', img)
    cv2.imshow('Processed', processed_img)
    cv2.imshow('Mask', msk)
    cv2.imshow('Pallete', pallete)
    # cv2.imshow('Symetry horizontal', hor)
    # cv2.imshow('Symetry vertical', vert)
    # cv2.imshow('Symetry', symetries)
    # cv2.imshow('Ellipse', img_ellipse)
    cv2.waitKey(0)


if __name__ == '__main__':
    main()
