import cv2
import numpy as np
from sklearn.metrics import f1_score

def get_mssism(img1, img2):
    C1 = 6.5025
    C2 = 58.5225
    # INITS
    img1 = np.float32(img1) # cannot calculate on one byte large values
    img2 = np.float32(img2)
    # END INITS
    # PRELIMINARY COMPUTING
    mu1 = cv2.GaussianBlur(img1, (11, 11), 1.5)
    mu2 = cv2.GaussianBlur(img2, (11, 11), 1.5)
    mu1_2 = mu1 * mu1
    mu2_2 = mu2 * mu2
    mu1_mu2 = mu1 * mu2
    sigma1_2 = cv2.GaussianBlur(img1 * img1, (11, 11), 1.5)
    sigma1_2 -= mu1_2
    sigma2_2 = cv2.GaussianBlur(img2 * img2, (11, 11), 1.5)
    sigma2_2 -= mu2_2
    sigma12 = cv2.GaussianBlur(img1 * img2, (11, 11), 1.5)
    sigma12 -= mu1_mu2
    t_1 = 2 * mu1_mu2 + C1
    t_2 = 2 * sigma12 + C2
    t_3 = t_1 * t_2
    t_1 = mu1_2 + mu2_2 + C1
    t_2 = sigma1_2 + sigma2_2 + C2
    t_1 = t_1 * t_2                    # t1 =((mu1_2 + mu2_2 + C1).*(sigma1_2 + sigma2_2 + C2))
    mssim = cv2.mean(cv2.divide(t_3, t_1))       # mssim = average of ssim map
    return mssim

def get_f1_score(seg_org, seg_calc):
    y_true = np.array(seg_org).ravel()
    y_true = [int(np.round(x / 255)) for x in y_true]
    y_pred = np.array(seg_calc).ravel()
    y_pred = [int(np.round(x / 255)) for x in y_pred]

    return f1_score(y_true, y_pred)

def getMSSISM(i1, i2):
    C1 = 6.5025
    C2 = 58.5225
    # INITS
    I1 = np.float32(i1) # cannot calculate on one byte large values
    I2 = np.float32(i2)
    I2_2 = I2 * I2 # I2^2
    I1_2 = I1 * I1 # I1^2
    I1_I2 = I1 * I2 # I1 * I2
    # END INITS
    # PRELIMINARY COMPUTING
    mu1 = cv2.GaussianBlur(I1, (11, 11), 1.5)
    mu2 = cv2.GaussianBlur(I2, (11, 11), 1.5)
    mu1_2 = mu1 * mu1
    mu2_2 = mu2 * mu2
    mu1_mu2 = mu1 * mu2
    sigma1_2 = cv2.GaussianBlur(I1_2, (11, 11), 1.5)
    sigma1_2 -= mu1_2
    sigma2_2 = cv2.GaussianBlur(I2_2, (11, 11), 1.5)
    sigma2_2 -= mu2_2
    sigma12 = cv2.GaussianBlur(I1_I2, (11, 11), 1.5)
    sigma12 -= mu1_mu2
    t1 = 2 * mu1_mu2 + C1
    t2 = 2 * sigma12 + C2
    t3 = t1 * t2                    # t3 = ((2*mu1_mu2 + C1).*(2*sigma12 + C2))
    t1 = mu1_2 + mu2_2 + C1
    t2 = sigma1_2 + sigma2_2 + C2
    t1 = t1 * t2                    # t1 =((mu1_2 + mu2_2 + C1).*(sigma1_2 + sigma2_2 + C2))
    ssim_map = cv2.divide(t3, t1)    # ssim_map =  t3./t1;
    mssim = cv2.mean(ssim_map)       # mssim = average of ssim map
    return mssim