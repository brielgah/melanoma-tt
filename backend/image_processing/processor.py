from .comparison_img import compare_color_score_palletes, compare_contour, compare_symetry
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

def extract_and_compare(img_base64_before, img_base64_after):
    img_before = converter.convertToOpenCVFormat(img_base64_before)
    img_after = converter.convertToOpenCVFormat(img_base64_after)
    [processed_before, msk_before] = process_image(img_before)
    [processed_after, msk_after] = process_image(img_after)

    features_before = extract(img_base64_before)
    features_after = extract(img_base64_after)

    sym_before, sym_after, sym_compare = compare_symetry(msk_before, msk_after)
    contour_before, contour_after, contour_compare = compare_contour((processed_before, msk_before), (processed_after, msk_after))
    pallete_before, pallete_after, pallete_compare = compare_color_score_palletes((processed_before, msk_before), (processed_after, msk_after))

    return {
        'features': {
            'before': features_before,
            'after': features_after,
        },
        'imgs': {
            'before': {
                'roughness': converter.convertOpenCVToBase64(contour_before),
                'symetry': converter.convertOpenCVToBase64(sym_before),
                'color': converter.convertOpenCVToBase64(pallete_before),
            },
            'after': {
                'roughness': converter.convertOpenCVToBase64(contour_after),
                'symetry': converter.convertOpenCVToBase64(sym_after),
                'color': converter.convertOpenCVToBase64(pallete_after),
            },
            'compare': {
                'roughness': converter.convertOpenCVToBase64(contour_compare),
                'symetry': converter.convertOpenCVToBase64(sym_compare),
                'color': converter.convertOpenCVToBase64(pallete_compare),
            },
        }
    }
