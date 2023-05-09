import os
import PIL
import torch
import numpy as np
import pandas as pd
from torch.utils.data import Dataset, DataLoader, random_split
from image_processing import main
import cv2
np.random.seed(0)
torch.manual_seed(0)
torch.cuda.manual_seed(0)
torch.cuda.manual_seed_all(0)

class MelanomaDataset(Dataset):
    def __init__(self, path):
        self.path = path
        content = pd.read_csv(path,header=0)
        self.files = content.values

    
    def __len__(self):
        #Return the total number of examples in this split, e.g. if
        #self.setname=='train' then return the total number of examples
        #in the training set
        return len(self.files)
        
    def __getitem__(self, idx):
        #Return the example at index [idx]. The example is a dict with keys
        #'data' (value: Tensor for an RGB image) and 'label' (value: multi-hot
        #vector as Torch tensor of gr truth class labels).
        name,path,label = self.files[idx]
        print(f"name:{name} path:{path} label:{label}")
        img = cv2.imread(os.path.join(path,name),cv2.IMREAD_COLOR)
        proccessed_image = main.process_image(img)
        img = torch.Tensor(proccessed_image)
        #load label        
        return img, label

train = MelanomaDataset(os.getenv('TEST_CSV'))
print(type(train))
BATCH_SIZE = 32
# Generate dataloader
train_loader = DataLoader(train, batch_size=BATCH_SIZE, shuffle=True)
