import cv2
import numpy as np
from sklearn.metrics import f1_score


def get_mssism(img1, img2):
    C1 = 6.5025
    C2 = 58.5225
    # INITS
    img1 = np.float32(img1)  # cannot calculate on one byte large values
    img2 = np.float32(img2)
    # END INITS
    # PRELIMINARY COMPUTING
    mu1 = cv2.GaussianBlur(img1, (11, 11), 1.5)
    mu2 = cv2.GaussianBlur(img2, (11, 11), 1.5)
    sigma1_2 = cv2.GaussianBlur(img1 * img1, (11, 11), 1.5)
    sigma1_2 -= mu1 * mu1
    sigma2_2 = cv2.GaussianBlur(img2 * img2, (11, 11), 1.5)
    sigma2_2 -= mu2 * mu2
    sigma12 = cv2.GaussianBlur(img1 * img2, (11, 11), 1.5)
    sigma12 -= mu1 * mu2
    t_1 = 2 * mu1 * mu2 + C1
    t_2 = 2 * sigma12 + C2
    t_3 = t_1 * t_2
    t_1 = mu1 * mu1 + mu2 * mu2 + C1
    t_2 = sigma1_2 + sigma2_2 + C2
    # t1 =((mu1_2 + mu2_2 + C1).*(sigma1_2 + sigma2_2 + C2))
    t_1 = t_1 * t_2
    mssim = cv2.mean(cv2.divide(t_3, t_1))       # mssim = average of ssim map
    return mssim


def get_f1_score(seg_org, seg_calc):
    y_true = np.array(seg_org).ravel()
    y_true = [int(np.round(x / 255)) for x in y_true]
    y_pred = np.array(seg_calc).ravel()
    y_pred = [int(np.round(x / 255)) for x in y_pred]

    return f1_score(y_true, y_pred)
