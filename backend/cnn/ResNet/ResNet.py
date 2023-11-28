import os
import torch
import torch.nn as nn
import torch.optim as optim
from . import MelanomaDataset
from torchvision import transforms
from torch.utils.data import DataLoader, random_split
from image_processing.util.converter import convertToOpenCVFormat

from sklearn.metrics import confusion_matrix
import seaborn as sn
import pandas as pd
import matplotlib.pyplot as plt

MODEL = "model_weights"
MODEL_DIR = ""

class block(nn.Module):
    def __init__(
        self, in_channels, intermediate_channels, identity_downsample=None, stride=1
    ):
        super(block, self).__init__()
        self.expansion = 4
        self.conv1 = nn.Conv2d(
            in_channels, intermediate_channels, kernel_size=1, stride=1, padding=0, bias=False
        )
        self.bn1 = nn.BatchNorm2d(intermediate_channels)
        self.conv2 = nn.Conv2d(
            intermediate_channels,
            intermediate_channels,
            kernel_size=3,
            stride=stride,
            padding=1,
            bias=False
        )
        self.bn2 = nn.BatchNorm2d(intermediate_channels)
        self.conv3 = nn.Conv2d(
            intermediate_channels,
            intermediate_channels * self.expansion,
            kernel_size=1,
            stride=1,
            padding=0,
            bias=False
        )
        self.bn3 = nn.BatchNorm2d(intermediate_channels * self.expansion)
        self.relu = nn.ReLU()
        self.identity_downsample = identity_downsample
        self.stride = stride

    def forward(self, x):
        identity = x.clone()

        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.conv2(x)
        x = self.bn2(x)
        x = self.relu(x)
        x = self.conv3(x)
        x = self.bn3(x)

        if self.identity_downsample is not None:
            identity = self.identity_downsample(identity)

        x += identity
        x = self.relu(x)
        return x


class ResNet(nn.Module):
    def __init__(self, block, layers, image_channels, num_classes):
        super(ResNet, self).__init__()
        self.in_channels = 64
        self.conv1 = nn.Conv2d(image_channels, 64, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = nn.BatchNorm2d(64)
        self.relu = nn.ReLU()
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)

        # Essentially the entire ResNet architecture are in these 4 lines below
        self.layer1 = self._make_layer(
            block, layers[0], intermediate_channels=64, stride=1
        )
        self.layer2 = self._make_layer(
            block, layers[1], intermediate_channels=128, stride=2
        )
        self.layer3 = self._make_layer(
            block, layers[2], intermediate_channels=256, stride=2
        )
        self.layer4 = self._make_layer(
            block, layers[3], intermediate_channels=512, stride=2
        )

        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(512 * 4, num_classes)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)

        x = self.avgpool(x)
        x = x.reshape(x.shape[0], -1)
        x = self.fc(x)

        return x

    def _make_layer(self, block, num_residual_blocks, intermediate_channels, stride):
        identity_downsample = None
        layers = []

        # Either if we half the input space for ex, 56x56 -> 28x28 (stride=2), or channels changes
        # we need to adapt the Identity (skip connection) so it will be able to be added
        # to the layer that's ahead
        if stride != 1 or self.in_channels != intermediate_channels * 4:
            identity_downsample = nn.Sequential(
                nn.Conv2d(
                    self.in_channels,
                    intermediate_channels * 4,
                    kernel_size=1,
                    stride=stride,
                    bias=False
                ),
                nn.BatchNorm2d(intermediate_channels * 4),
            )

        layers.append(
            block(self.in_channels, intermediate_channels, identity_downsample, stride)
        )

        # The expansion size is always 4 for ResNet 50,101,152
        self.in_channels = intermediate_channels * 4

        # For example for first resnet layer: 256 will be mapped to 64 as intermediate layer,
        # then finally back to 256. Hence no identity downsample is needed, since stride = 1,
        # and also same amount of channels.
        for i in range(num_residual_blocks - 1):
            layers.append(block(self.in_channels, intermediate_channels))

        return nn.Sequential(*layers)


def ResNet50(img_channel=3, num_classes=1000):
    return ResNet(block, [3, 4, 6, 3], img_channel, num_classes)


def ResNet101(img_channel=3, num_classes=1000):
    return ResNet(block, [3, 4, 23, 3], img_channel, num_classes)


def ResNet152(img_channel=3, num_classes=1000):
    return ResNet(block, [3, 8, 36, 3], img_channel, num_classes)

def dataloader_melanoma():
    train_dataset = MelanomaDataset(os.getenv('TRAIN_CSV'))
    test_dataset = MelanomaDataset(os.getenv('TEST_CSV'))

    train_dataset, val_dataset = random_split(train_dataset,[0.8, 0.2])  
   
    print("Image shape of a random sample image : {}".format(train_dataset[0][0].numpy().shape), end = '\n\n')
    
    print("Training Set:   {} images".format(len(train_dataset)))
    print("Validation Set:   {} images".format(len(val_dataset)))
    print("Test Set:       {} images".format(len(test_dataset)))
    
    BATCH_SIZE = 20

    # Generate dataloaderss
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=True)
    
    return train_loader, val_loader, test_loader

def train_model(train_loader,val_loader,test_loader,model,device):
    torch.cuda.empty_cache()
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)
    EPOCHS = 10
    train_samples_num = len(train_loader)
    val_samples_num = len(val_loader)
    train_costs, val_costs = [], []
    
    #Training phase.    
    for epoch in range(EPOCHS):

        train_running_loss = 0
        correct_train = 0
        
        model.train()
        
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            
            """ for every mini-batch during the training phase, we typically want to explicitly set the gradients 
            to zero before starting to do backpropragation """
            optimizer.zero_grad()
            
            # Start the forward pass
            prediction = model(inputs)
                        
            loss = criterion(prediction, labels)
          
            # do backpropagation and update weights with step()
            loss.backward()         
            optimizer.step()
            
            # print('outputs on which to apply torch.max ', prediction)
            # find the maximum along the rows, use dim=1 to torch.max()
            _, predicted_outputs = torch.max(prediction.data, 1)
            
            # Update the running corrects 
            correct_train += (predicted_outputs == labels).float().sum().item()
            
            ''' Compute batch loss
            multiply each average batch loss with batch-length. 
            The batch-length is inputs.size(0) which gives the number total images in each batch. 
            Essentially I am un-averaging the previously calculated Loss '''
            train_running_loss += (loss.data.item() * inputs.shape[0])


        train_epoch_loss = train_running_loss / train_samples_num
        
        train_costs.append(train_epoch_loss)
        
        train_acc =  correct_train / train_samples_num

        # Now check trained weights on the validation set
        val_running_loss = 0
        correct_val = 0
      
        model.eval()
    
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)

                # Forward pass.
                prediction = model(inputs)

                # Compute the loss.
                loss = criterion(prediction, labels)

                # Compute validation accuracy.
                _, predicted_outputs = torch.max(prediction.data, 1)
                correct_val += (predicted_outputs == labels).float().sum().item()

            # Compute batch loss.
            val_running_loss += (loss.data.item() * inputs.shape[0])

            val_epoch_loss = val_running_loss / val_samples_num
            val_costs.append(val_epoch_loss)
            val_acc =  correct_val / val_samples_num
        
        info = "[Epoch {}/{}]: train-loss = {:0.6f} | train-acc = {:0.3f} | val-loss = {:0.6f} | val-acc = {:0.3f}"
        
        print(info.format(epoch+1, EPOCHS, train_epoch_loss, train_acc, val_epoch_loss, val_acc))
        
        torch.save(model.state_dict(), os.path.join(os.getenv('DATASET_PATH'),str(epoch+1))) 
        torch.cuda.empty_cache()
                                                                
    torch.save(model.state_dict(), os.path.join(os.getenv('DATASET_PATH'),'model_weights_gpu'))  
        
    return train_costs, val_costs

def test_model(model,test_loader,device):
    test_samples_num = len(test_loader)
    correct = 0 
    model.eval()
    y_pred = []
    y_true = []
    with torch.no_grad():
        batch = 0
        for inputs, labels in test_loader:
            print(f"Batch {batch}")
            inputs, labels = inputs.to(device), labels.to(device)
            # Make predictions.
            prediction = model(inputs)
            output = (torch.max(torch.exp(prediction), 1)[1]).data.cpu().numpy()
            y_pred.extend(output)
            labels_temp = labels.data.cpu().numpy()
            y_true.extend(labels_temp)
            # Retrieve predictions indexes.
            _, predicted_class = torch.max(prediction.data, 1)
            # Compute number of correct predictions.
            correct += (predicted_class == labels).float().sum().item()
            batch += 1
    test_accuracy = correct / test_samples_num
    print('Test accuracy: {}'.format(test_accuracy))
    classes = [0,1]
    cf_matrix = confusion_matrix(y_true, y_pred)
    df_cm = pd.DataFrame(cf_matrix, classes, classes)
    plt.figure(figsize = (12,7))
    sn.heatmap(df_cm, annot=True)
    plt.xlabel("prediction")
    plt.ylabel("label")
    plt.show()
    plt.savefig(os.path.join(os.getenv('DATASET_PATH'),'output.png'))


def test():
    torch.cuda.empty_cache()
    model = ResNet101(img_channel=3, num_classes=2)
    if torch.cuda.is_available():
        model.cuda()
        torch.cuda.empty_cache()
    device = "cuda" if torch.cuda.is_available() else "cpu"
    #summary(model)
    train_loader, val_loader, test_loader = dataloader_melanoma()
    train_costs, val_costs = train_model(train_loader,val_loader,test_loader,model,device)
    test_model(model, test_loader,device)

def convert_image(img):
    img = convertToOpenCVFormat(img)
    proccessed_image = main.process_image(img)
    transform = transforms.ToTensor()
    input = transform(proccessed_image)
    return input


def predict(img):
    if os.path.exists(os.path.join(MODEL_DIR, MODEL)):
      device = "cuda" if torch.cuda.is_available() else "cpu"
      print("Loading model")
      model = ResNet101(img_channel=3, num_classes=2)
      model.load_state_dict(torch.load(os.path.join(MODEL_DIR,MODEL),map_location=torch.device('cpu')))
      input = convert_image(img)
      model.eval()
      output = model(input)
      result = {
          "result": output
      }
      return result
    else:
        result = {
            "error": "Can't found the trained model"
        }
        return result

def main():
    if os.path.exists(os.path.join(os.getenv('DATASET_PATH'),MODEL)):
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print("Loading model")
        model = ResNet101(img_channel=3, num_classes=2)
        model.load_state_dict(torch.load(os.path.join(os.getenv('DATASET_PATH'),MODEL),map_location=torch.device('cpu')))
        #summary(model)
        train_loader, val_loader, test_loader = dataloader_melanoma()
        test_model(model, test_loader,device)
    else:
        test()

if __name__ == '__main__':
    main()
# ref https://github.com/aladdinpersson/Machine-Learning-Collection
