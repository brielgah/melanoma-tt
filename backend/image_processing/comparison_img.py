from .util.colors import COLOR_SCORE_PERCENTAGES
from .feature_extraction import center, get_color_score_freqs, get_simetry_images
import numpy as np
import cv2


def get_color_score_pallet(processed_img, msk):
    rows = 800
    cols = 800
    img = np.zeros([rows, cols, 3])
    colors = get_color_score_freqs(processed_img, msk)
    total_freq = sum(colors.values())
    lst_width = 0
    for color, cnt in sorted(colors.items()):
        width = lst_width + int(cnt / total_freq * cols)
        r, g, b = COLOR_SCORE_PERCENTAGES[color]
        img[:,lst_width:width,2] = np.ones([rows, width - lst_width]) * r * 255
        img[:,lst_width:width,1] = np.ones([rows, width - lst_width]) * g * 255
        img[:,lst_width:width,0] = np.ones([rows, width - lst_width]) * b * 255
        lst_width = width
    return img

def get_symetry_img(msk):
    hor, vert = get_simetry_images(msk)
    images = [hor, vert]
    symetries = cv2.vconcat(images)
    return symetries

def get_contour_img(color_img, msk, color=(0,255,0)):
    msk, color_img = center(msk, color_img)
    contours, _hierarchy = cv2.findContours(msk, 1, 2)
    contour_img = color_img.copy() * 0
    cv2.drawContours(contour_img, contours, -1, color, 2)
    return contour_img

def add_imgs(img1, img2, alpha=0.5):
    beta = 1 - alpha
    dst = cv2.addWeighted(img1, alpha, img2, beta, 0)
    return dst

def compare_symetry(img_before, img_after):
    sym_before = get_symetry_img(img_before)
    sym_after = get_symetry_img(img_after)
    sym_compare = cv2.hconcat([sym_before, sym_after])
    return sym_before, sym_after, sym_compare

def compare_contour(imgs_before, imgs_after):
    img_before, msk_before = imgs_before
    img_after, msk_after = imgs_after
    contour_before = get_contour_img(img_before, msk_before)
    contour_after = get_contour_img(img_after, msk_after, (255, 0, 0))
    contour_compare = add_imgs(contour_before, contour_after)
    return contour_before, contour_after, contour_compare

def compare_color_score_palletes(imgs_before, imgs_after):
    img_before, msk_before = imgs_before
    img_after, msk_after = imgs_after
    pallete_before = get_color_score_pallet(img_before, msk_before)
    pallete_after = get_color_score_pallet(img_after, msk_after)
    pallete_compare = cv2.vconcat([pallete_before, pallete_after])
    return pallete_before, pallete_after, pallete_compare
