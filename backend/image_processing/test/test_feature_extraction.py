import cv2

from backend.image_processing.feature_extraction import (get_centroid,
                                                         get_color_score,
                                                         get_major_axis,
                                                         get_roughness,
                                                         get_simetry)
from backend.image_processing.image import TEST_IMAGES
from backend.image_processing.noise_removal import (hair_removal,
                                                    lession_segmentation)


def get_segmented_test_image():
    images = list(filter(lambda img: img.name == 'example3.jpg', TEST_IMAGES))
    image_metadata = images[0]
    img_org = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
    img_org = cv2.resize(img_org, (image_metadata.size, image_metadata.size))
    img_color = hair_removal(img_org)
    img_seg = lession_segmentation(img_color)
    return img_seg, img_org


def test_get_major_axis():
    img, _ = get_segmented_test_image()

    ellipse, _ = get_major_axis(img)
    center, axes, angle = ellipse
    x, y = center
    minor, major = axes
    assert int(x) == 109
    assert int(y) == 99
    assert int(minor) == 81
    assert int(major) == 106
    assert angle == 21.639307022094727


def test_get_centroid():
    img, _ = get_segmented_test_image()

    x, y = get_centroid(img)
    assert x == 109
    assert y == 99


def test_get_symetry():
    img, _ = get_segmented_test_image()

    sim_x, sim_y = get_simetry(img)

    assert sim_x == 0.8421201014942205
    assert sim_y == 0.7820693543839865


def test_get_roughness():
    img, _ = get_segmented_test_image()

    roughness = get_roughness(img)
    assert roughness == 0.958896443127865


def test_get_color_score():
    msk, img_color = get_segmented_test_image()

    score = get_color_score(img_color, msk)
    assert score == 2
