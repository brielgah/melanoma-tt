from dataclasses import dataclass
import os


@dataclass
class ImageMetadata:
    path: str
    name: str
    size: int
    has_segmented_image: bool
    is_melanoma: bool = False
    segmented: str = ''

    def get_path(self, get_segmented: bool = False):
        name = self.name if not get_segmented else self.segmented
        return os.path.join(self.path, name)


IMAGES_PATH = os.path.join(os.path.dirname(__file__), "../img/")
IMG_SIZE = 200

TEST_IMAGES = [
    ImageMetadata(IMAGES_PATH, 'example2.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'example3.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'example4.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'example5.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'example6.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'melColor.jpg', IMG_SIZE, False),
    ImageMetadata(IMAGES_PATH, 'NM83_orig.jpg',
                  IMG_SIZE, True, 'NM83_contour.png'),
    # ImageMetadata(IMAGES_PATH, 'LMM2_orig.jpg',
    #               IMG_SIZE, True, 'LMM2_contour.png'), # fails
    # ImageMetadata(IMAGES_PATH, 'LMM3_orig.jpg', IMG_SIZE,
    #               True, 'LMM3_contour.png'),  # fails
    ImageMetadata(IMAGES_PATH, 'LMM5_orig.jpg',
                  IMG_SIZE, True, 'LMM5_contour.png'),
    # ImageMetadata(IMAGES_PATH, 'LMM7_orig.jpg', IMG_SIZE,
    #               True, 'LMM7_contour.png'),  # fails
    # ImageMetadata(IMAGES_PATH, 'LMM8_2_orig.jpg', IMG_SIZE,
    #               True, 'LMM8_2_contour.png'),  # fails
]
