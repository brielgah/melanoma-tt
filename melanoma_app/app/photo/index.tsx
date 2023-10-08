import { router, useLocalSearchParams } from "expo-router";

import CameraPreview from "@/components/photo/cameraPreview";
import PhotoRedirectOptions from "@/utils/PhotoRedirectOptions";

const Photo = () => {
  const params = useLocalSearchParams<{
    redirect?: string;
    lesionId?: string;
  }>();

  const onPhotoTaken = () => {
    switch (params.redirect) {
      case PhotoRedirectOptions.PREDIAGNOSIS:
        router.replace({
          pathname: "/prediagnosis/analyze",
        });
        break;
      case PhotoRedirectOptions.LESION:
        if (params.lesionId) {
          router.replace({
            pathname: "/lesion/[id]/add",
            params: {
              id: params.lesionId,
            },
          });
        } else {
          console.warn("Missing lesionId param");
        }
        break;
      default:
        console.warn("Invalid redirect option");
    }
  };

  return <CameraPreview onPhotoTaken={onPhotoTaken} />;
};

export default Photo;
