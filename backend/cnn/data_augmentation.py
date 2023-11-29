import os
import cv2
import csv
import numpy as np
import random
from image_processing.processor import process_image

# Constants
DATASET_PATH = os.getenv('DATASET_PATH')
TRAIN_CSV_FILE = os.getenv('TRAIN_CSV')
TEST_CSV_FILE = os.getenv('TEST_CSV')
TRAIN_DATASET_AUGMENTED_DIR = "TRAIN_DATASET"
TEST_DATASET_AUGMENTED_DIR = "TEST_DATASET"
TRAIN_CSV_FILE_AUGMENTED = "train_augmented_2.csv"
TEST_CSV_FILE_AUGMENTED = "test_augmented.csv"
ANGLES = {45, 90, 135, 180, 225, 270, 315, 360}
HEADER_CSV = ["file_path","melanoma"]

def read_csv(file_path):
  data = []
  with open(file_path,'r') as csv_file:
      csv_reader = csv.reader(csv_file, delimiter=',', quotechar='|')
      next(csv_reader)
      for row in csv_reader:
        img_name,path,is_melanoma = row
        data.append((os.path.join(path,img_name), is_melanoma))
  return data

def verify_dir_exists():
  output_directory = os.path.join(DATASET_PATH, TRAIN_DATASET_AUGMENTED_DIR)
  if not os.path.exists(output_directory):
      os.makedirs(output_directory)
  return output_directory

def write_csv(data):
  output_csv_path = os.path.join(DATASET_PATH,TRAIN_CSV_FILE_AUGMENTED)
  # Write the list to the CSV file
  with open(output_csv_path, 'w', newline='') as csvfile:
      csv_writer = csv.writer(csvfile)
      csv_writer.writerow(HEADER_CSV)
      csv_writer.writerows(data)

def main():
   dataset_dir = verify_dir_exists()
   data = read_csv(os.path.join(DATASET_PATH, TRAIN_CSV_FILE))
   count = 1
   new_images_data = []
   for image_path, label in data:
    file_name,file_extension = os.path.splitext(image_path)
    _, file_name = os.path.split(file_name)
    count += 1
    image = ""
    #image = cv2.imread(image_path)
    #image,_ = process_image(image)
    # Check if the image was successfully loaded
    if image is not None:
      # Get image height, width
      #height, width = image.shape[:2]

      # Define the angle of rotation (in degrees)
      for angle in ANGLES:
        img_name = file_name + '_' + str(angle) + file_extension
        file_path = os.path.join(dataset_dir, img_name)
        new_images_data.append((img_name, label))
      # Calculate the rotation matrix
        #rotation_matrix = cv2.getRotationMatrix2D((width / 2, height / 2), angle, 1)
        #rotated_image = cv2.warpAffine(image, rotation_matrix, (width, height))
        # Display the original and modified images

        # Apply the rotation to the image

        # Display the original and rotated images
        #cv2.imshow('Original Image', image)
        #cv2.imshow('Rotated Image', rotated_image)
        #cv2.waitKey(0)
        #cv2.destroyAllWindows()
        #cv2.imwrite(file_path, rotated_image)
    random.shuffle(new_images_data)
    write_csv(new_images_data)
    
if __name__ == '__main__':
  main()
