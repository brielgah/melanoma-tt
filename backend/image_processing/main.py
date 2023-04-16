import cv2
from .noise_removal import (
    dull_razor,
    median_filtering,
    otsu_method, closing,
    and_bitwise,
    chan_vese_segmentation,
    invert_bitwise,
    opening,
    homomorphic_filtering,
    glare_removal,
    adaptive_histogram_equalization,
    histogram_equalization,
)
from .feature_extraction import (
    get_color_score,
    get_simetry,
    get_roughness,
    get_major_axis
)
from .testing import get_mssism, get_f1_score
from .image import TEST_IMAGES

from .border_detection import (
    border_with_sobel,
    canny,
)

def main():
    for i, image_metadata in enumerate(TEST_IMAGES):
        img = cv2.imread(image_metadata.get_path(), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (image_metadata.size, image_metadata.size))

        # aux = glare_removal(img)
        processed_img, _bhf = dull_razor(img)
        blurred_image = median_filtering(processed_img)
        # equalized = adaptive_histogram_equalization(blurred_image)
        # edges = border_with_sobel(equalized)
        # edges_canny = canny(equalized)
        # homomorphic = homomorphic_filtering(blurred_image)
        # homomorphic = median_filtering(homomorphic)
        # segmented_image = otsu_method(blurred_image)
        segmented_image = otsu_method(blurred_image)
        # segmented_image = invert_bitwise(chan_vese_segmentation(invert_bitwise(segmented_image)))
        enclosed_image = closing(segmented_image)
        enclosed_image = opening(invert_bitwise(enclosed_image))
        segmented_color = and_bitwise(blurred_image, enclosed_image)

        # cv2.imshow(f'Processed {i + 1}', processed_img)
        # cv2.imshow(f'Blurred {i + 1}', blurred_image)
        # cv2.imshow(f'Segmented {i + 1}', segmented_image)
        # cv2.imshow(f'Segmented chan vese {i + 1}', segmented_image2)
        # cv2.imshow(f'Enclosed {i + 1}', enclosed_image)
        cv2.imshow(f'Segmented lession {i + 1}', segmented_color)
        # cv2.imshow(f'equalized image {i + 1}', equalized)
        # cv2.imshow(f'homomorphic {i + 1}', homomorphic)
        cv2.imshow(f'Original {i + 1}', img)
        # cv2.imshow(f'Edges {i + 1}', edges)
        # cv2.imshow(f'Edges canny {i + 1}', edges_canny)

        u, v, volt = get_simetry(enclosed_image)
        roughness = get_roughness(enclosed_image)
        img_with_elip, _ = get_major_axis(enclosed_image, img)

        # cv2.imshow(f'Elips {i + 1}', img_with_elip)
        cv2.imshow(f'Simetry {i + 1}', volt)
        print(f'Color_score: {get_color_score(segmented_color, enclosed_image)} Symetry: {u}, {v} Roughness: {roughness}')

        # mssimv = get_mssism(img, blurred_image)
        # print(f"MSSISM: R {round(mssimv[2] * 100, 2)}% G {round(mssimv[1] * 100, 2)}% B "
        #      + f"{round(mssimv[0] * 100, 2)}%")

        # if image_metadata.has_segmented_image:
        #    img_seg = cv2.imread(image_metadata.get_path(True), cv2.IMREAD_GRAYSCALE)
        #    img_seg = cv2.resize(img_seg, (image_metadata.size, image_metadata.size))

        #    f1_score = get_f1_score(img_seg, enclosed_image)
        #    print(f'F1 Score: {f1_score}')

            # cv2.imshow(f'Original segmented {i + 1}', img_seg)

    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
