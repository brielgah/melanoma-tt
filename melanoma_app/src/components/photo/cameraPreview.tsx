import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import ColorPallete from "@/colorPallete";
import { useCurrentPictureMedia } from "@/contexts/pictureMediaContext";

interface CameraPreviewProps {
  onPhotoTaken: () => void;
}

const CameraPreview = (props: CameraPreviewProps) => {
  const camera = useRef<Camera>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPadding, setCameraPadding] = useState(0);
  const [ratio, setRatio] = useState("1:1");
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const { setCurrentPictureMedia } = useCurrentPictureMedia();

  const prepareRatio = async () => {
    if (!camera.current || Platform.OS !== "android") {
      return;
    }
    let desiredRatio = "4:3";
    const ratios = await camera.current.getSupportedRatiosAsync();

    const distances = new Map<string, number>();
    const realRatios = new Map<string, number>();
    let minDistance = null;
    for (const ratio of ratios) {
      const parts = ratio.split(":");
      const realRatio = Number(parts[0]) / Number(parts[1]);
      realRatios.set(ratio, realRatio);
      const distance = screenRatio - realRatio;
      distances.set(ratio, realRatio);
      if (minDistance == null) {
        minDistance = ratio;
      } else {
        if (distance >= 0 && distance < (distances.get(minDistance) ?? 0)) {
          minDistance = ratio;
        }
      }
    }

    desiredRatio = minDistance ?? desiredRatio;
    const remainder = Math.floor(
      (height - (realRatios.get(desiredRatio) ?? 0) * width) / 2
    );
    setIsRatioSet(true);
    setCameraPadding(remainder);
    setRatio(desiredRatio);
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePhoto = async () => {
    if (!camera.current) return;
    camera.current.pausePreview();
    const photo = await camera.current.takePictureAsync({ base64: true });
    setCurrentPictureMedia({
      uri: photo.uri,
      base64: "data:image/jpg;base64," + photo.base64,
    });

    props.onPhotoTaken();
  };

  const toggleCameraType = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front);
    } else {
      setCameraType(CameraType.back);
    }
  };

  const toggleFlashMode = () => {
    if (flashMode === FlashMode.torch) {
      setFlashMode(FlashMode.off);
    } else {
      setFlashMode(FlashMode.torch);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        autoFocus
        useCamera2Api
        flashMode={flashMode}
        type={cameraType}
        onCameraReady={setCameraReady}
        style={[
          styles.camera,
          { marginVertical: cameraPadding },
          isLoading ? { width: 0 } : {},
        ]}
        ratio={ratio}
        ref={camera}
      >
        <View style={[styles.captureContainer, styles.bottomContainer]}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
        </View>
        <View style={[styles.reverseCameraContainer, styles.bottomContainer]}>
          <TouchableOpacity
            style={[styles.reverseButton, styles.cameraButton]}
            onPress={toggleCameraType}
          >
            <MaterialIcons name="flip-camera-android" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[styles.flashContainer, styles.bottomContainer]}>
          <TouchableOpacity
            style={[styles.flashButton, styles.cameraButton]}
            onPress={toggleFlashMode}
          >
            <Ionicons name="flash" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    alignSelf: "center",
  },
  captureButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderColor: ColorPallete.blue.normal,
    borderWidth: 3,
  },
  reverseButton: {
    marginRight: 10,
  },
  reverseCameraContainer: {
    alignSelf: "flex-end",
  },
  flashContainer: {
    alignSelf: "flex-start",
  },
  flashButton: {
    marginLeft: 10,
  },
  cameraButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  bottomContainer: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    marginBottom: 10,
  },
});

export default CameraPreview;
