import sys
import os
import cv2
import csv
import random
from image_processing.image import IMG_SIZE,ImageMetadata

class Image():
  
  def __init__(self,content,metadata):
    self.content = content
    self.metadata = metadata
    
  def __str__(self):
    return f"name: {self.metadata.name} melanoma:{'Y' if self.metadata.is_melanoma else 'N'}" 

# Constants 
DATASET_PATH = os.getenv('DATASET_PATH')

# Globals
dataset = []

def create_image_object(img,is_melanoma):
  content = None
  path, name = os.path.split(img)
  metadata = ImageMetadata(path,name,IMG_SIZE,False,is_melanoma)
  return Image(content,metadata)

def read_melanoma_dataset(files,is_melanoma):
  images = []
  for img in files:
    images.append(create_image_object(img,is_melanoma))
  return images

def read_ham_dataset(ham_filenames,files):
  for img in files:
    _,name = os.path.split(img)
    name = name.split('.')[0]
    ham_filenames[name] = create_image_object(img,False)
    
def label_ham_dataset(ham_filenames,ham_csv):
  dataset_labeled = []
  with open(ham_csv,'r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',', quotechar='|')
    next(csv_reader)
    for row in csv_reader:
      img_name,label= row[1], row[2]
      if img_name in ham_filenames:
        ham_filenames[img_name].metadata.is_melanoma = label == 'mel'
        dataset_labeled.append(ham_filenames[img_name])
      else:
        print(img_name)
  return dataset_labeled

def process_dataset():
  ham_csv = ""
  ham_filenames = {}
  ham_dataset = []
  melanoma_dataset = []
  for root, dirs, files in os.walk(DATASET_PATH):
    if "HAM" in root:
      ham_paths = [os.path.join(root,filename) for filename in files]
      read_ham_dataset(ham_filenames,ham_paths)
    if root == DATASET_PATH:
      for filename in files:
        if "HAM" in filename:
          ham_csv = os.path.join(root,filename)
    if "skin-lesions" in root and files:
      paths = [os.path.join(root,filename) for filename in files]
      melanoma_dataset += read_melanoma_dataset(paths, "melanoma" in root)
  ham_dataset = label_ham_dataset(ham_filenames,ham_csv)
  random.shuffle(melanoma_dataset)
  random.shuffle(ham_dataset)
  dataset = ham_dataset + melanoma_dataset
  random.shuffle(melanoma_dataset)
  return dataset
  
def main():
  global dataset
  dataset = process_dataset()
  for item in dataset:
    print(item)

if __name__ == '__main__':
  main()