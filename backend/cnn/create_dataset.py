import sys
import os
import cv2
import csv
import random
from torch.utils.data import Dataset
from image_processing.image import IMG_SIZE,ImageMetadata
from sklearn.model_selection import train_test_split

class Image():
  
  def __init__(self,content,metadata):
    self.content = content
    self.metadata = metadata
    
  def __str__(self):
    return f"name: {self.metadata.name} melanoma:{'Y' if self.metadata.is_melanoma else 'N'}" 
  
# Constants 
DATASET_PATH = os.getenv('DATASET_PATH')
TRAIN_CSV_FILE = os.getenv('TRAIN_CSV')
TEST_CSV_FILE = os.getenv('TEST_CSV')
HEADER_CSV = ["name", "path", "melanoma"]
# Globals
dataset = []

def create_image_object(img,is_melanoma):
  #content = cv2.imread(img)
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
  return dataset_labeled

# Consider add some test to verify the correct labeling for some random images in the dataset
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
  print(f"Melanoma dataset length {len(melanoma_dataset)}")
  ham_dataset = label_ham_dataset(ham_filenames,ham_csv)
  print(f"HAM dataset length {len(ham_dataset)}")
  random.shuffle(melanoma_dataset)
  random.shuffle(ham_dataset)
  is_melanoma = []
  no_melanoma = []
  for image in melanoma_dataset:
	  if image.metadata.is_melanoma:
		  is_melanoma.append(image)
	  else:
		  no_melanoma.append(image)
  for image in ham_dataset:
	  if image.metadata.is_melanoma:
		  is_melanoma.append(image)
	  else:
		  no_melanoma.append(image)
  return is_melanoma, no_melanoma

def remove_duplicates(dataset):
  uniques = {}
  for img in dataset:
    uniques[img.metadata.name] = img
  dataset_uniques = list(uniques.values())
  return dataset_uniques

def divide_dataset(dataset):
  labels = []
  for img in dataset:
    labels.append(int(img.metadata.is_melanoma))
  x_train, x_test, y_train, y_test = train_test_split(dataset, labels)
  return x_train, x_test, y_train, y_test

def write_csv(dataset,filename):
  with open(filename,'+w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(HEADER_CSV)
    melanoma = 0
    for img in dataset:
      row = [img.metadata.name,img.metadata.path,int(img.metadata.is_melanoma)]
      if img.metadata.is_melanoma:
        melanoma += 1
        print(row)
      writer.writerow(row)
    print(melanoma)

def build_dataset():
  global dataset
  is_melanoma, no_melanoma = process_dataset()
  is_melanoma = remove_duplicates(is_melanoma)
  no_melanoma = remove_duplicates(no_melanoma)
  train = is_melanoma[0:int(len(is_melanoma)*0.8)] + no_melanoma[0:int(len(no_melanoma)*0.8)]
  test = is_melanoma[int(len(is_melanoma)*0.8):] + no_melanoma[int(len(no_melanoma)*0.8):]
  random.shuffle(train)
  random.shuffle(test)
  write_csv(train,TRAIN_CSV_FILE)
  write_csv(test,TEST_CSV_FILE)

def main():
  build_dataset()
    
if __name__ == '__main__':
  main()
