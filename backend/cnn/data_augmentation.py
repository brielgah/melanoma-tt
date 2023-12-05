import csv
import os
import random

import cv2
import numpy as np

from image_processing.processor import process_image

# Constants
DATASET_PATH = os.getenv('DATASET_PATH')
TRAIN_CSV_FILE = os.getenv('TRAIN_CSV')
TEST_CSV_FILE = os.getenv('TEST_CSV')
TRAIN_DATASET_AUGMENTED_DIR = "TRAIN_DATASET_AUGMENTED"
TEST_DATASET_AUGMENTED_DIR = "TEST_DATASET_AUGMENTED"
TRAIN_CSV_FILE_AUGMENTED = "train_augmented.csv"
TEST_CSV_FILE_AUGMENTED = "test_augmented.csv"
TRAIN_ANGLES = {360}
TEST_ANGLES = {360}
HEADER_CSV = ["file_path", "melanoma"]


def read_csv(file_path):
    data = []
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',', quotechar='|')
        next(csv_reader)
        for row in csv_reader:
            img_name, path, is_melanoma = row
            data.append((os.path.join(path, img_name), is_melanoma))
    return data


def verify_dir_exists(dir_name):
    output_directory = os.path.join(DATASET_PATH, dir_name)
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    return output_directory


def write_csv(data, csv_file_name):
    output_csv_path = os.path.join(DATASET_PATH, csv_file_name)
    # Write the list to the CSV file
    with open(output_csv_path, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(HEADER_CSV)
        csv_writer.writerows(data)


def augment_data(data, dataset_dir, csv_file_name, angles):
    count = 1
    new_images_data = []
    for image_path, label in data:
        file_name, file_extension = os.path.splitext(image_path)
        _, file_name = os.path.split(file_name)
        count += 1
        image = ""
        image = cv2.imread(image_path)
        # image, _ = process_image(image)
        # Check if the image was successfully loaded
        if image is not None:
            # Get image height, width
            height, width = image.shape[:2]

            # Define the angle of rotation (in degrees)
            for angle in angles:
                img_name = file_name + '_' + str(angle) + file_extension
                file_path = os.path.join(dataset_dir, img_name)
                new_images_data.append((img_name, label))
                # Calculate the rotation matrix
                rotation_matrix = cv2.getRotationMatrix2D(
                    (width / 2, height / 2), angle, 1)
                rotated_image = cv2.warpAffine(
                    image, rotation_matrix, (width, height))
                # Write rotated image
                print(f"Saving file {file_path}")
                cv2.imwrite(file_path, rotated_image)
        random.shuffle(new_images_data)
        write_csv(new_images_data, csv_file_name)


def main():
    train_dataset_dir = verify_dir_exists(TRAIN_DATASET_AUGMENTED_DIR)
    test_dataset_dir = verify_dir_exists(TEST_DATASET_AUGMENTED_DIR)
    train_data = read_csv(os.path.join(DATASET_PATH, TRAIN_CSV_FILE))
    test_data = read_csv(os.path.join(DATASET_PATH, TEST_CSV_FILE))
    augment_data(
        train_data,
        train_dataset_dir,
        TRAIN_CSV_FILE_AUGMENTED,
        TRAIN_ANGLES)
    augment_data(
        test_data,
        test_dataset_dir,
        TEST_CSV_FILE_AUGMENTED,
        TEST_ANGLES)


if __name__ == '__main__':
    main()
