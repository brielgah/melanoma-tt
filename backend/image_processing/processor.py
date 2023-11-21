from .util import converter
from .util import noise_removal
from . import feature_extraction

def process_image(img):
    processed_img, _ = noise_removal.dull_razor(img)
    blurred_img = noise_removal.median_filtering(processed_img)
    segmented_image = noise_removal.otsu_method(blurred_img)
    enclosed_image = noise_removal.closing(segmented_image)
    enclosed_image = noise_removal.opening(noise_removal.invert_bitwise(enclosed_image))
    segmented_color = noise_removal.and_bitwise(blurred_img, enclosed_image)
    return [segmented_color, enclosed_image]


def extract(img):
    img_cv2 = converter.convertToOpenCVFormat(img)
    [processed_img, msk] = process_image(img_cv2)

    return {
            'roughness' : feature_extraction.get_roughness(msk),
            'color': feature_extraction.get_color_score(processed_img, msk),
            'symetry' : feature_extraction.get_simetry(msk),
    }
