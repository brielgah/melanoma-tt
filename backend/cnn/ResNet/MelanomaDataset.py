import os

import cv2
import numpy as np
import pandas as pd
import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader, Dataset, random_split

from image_processing import processor

np.random.seed(0)
torch.manual_seed(0)
torch.cuda.manual_seed(0)
torch.cuda.manual_seed_all(0)
IMG_SIZE = 200


class MelanomaDataset(Dataset):
    def __init__(self, path):
        self.path = path
        content = pd.read_csv(path, header=0)
        self.files = content.values
        self.transform = transforms.ToTensor()

    def __len__(self):
        # Return the total number of examples in this split, e.g. if
        # self.setname=='train' then return the total number of examples
        # in the training set
        return len(self.files)

    def __getitem__(self, idx):
        # Return the example at index [idx]. The example is a dict with keys
        # 'data' (value: Tensor for an RGB image) and 'label' (value: multi-hot
        # vector as Torch tensor of gr truth class labels).
        name, path, label = self.files[idx]
        img = cv2.imread(os.path.join(path, name), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        proccessed_image = processor.process_image(img)
        tensor = self.transform(proccessed_image)
        # load label
        return tensor, label


"""     def show_segmented(self,idx):
        image_window = tk.Tk()
        name,path,label = self.files[idx]
        img = cv2.imread(os.path.join(path,name),cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        proccessed_image = main.process_image(img)
        blue,green,red = cv2.split(proccessed_image)
        img = cv2.merge((red,green,blue))
        im = Image.fromarray(img)
        imgtk = ImageTk.PhotoImage(image=im)
        panel = tk.Label(image_window, image=imgtk)
        panel.pack(side="bottom", fill="both", expand="yes")
        image_window.mainloop()

     """
