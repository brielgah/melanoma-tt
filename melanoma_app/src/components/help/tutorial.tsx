import { Ionicons } from "@expo/vector-icons";
import { Image, ImageSource } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import Styles from "../../styles";

interface TutorialCardProps {
  title: string;
  body: string;
  backgroundColor: string;
  image: ImageSource;
}

export const TutorialCard = (props: TutorialCardProps) => {
  const bgColor = { backgroundColor: props.backgroundColor };
  return (
    <View style={[Styles.flexContainer, styles.container, bgColor]}>
      <View style={styles.imageContainer}>
        <Image
          source={props.image}
          style={styles.image}
          contentFit="contain"
          contentPosition="center"
          responsivePolicy="live"
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.textContainer}>
          <Text style={[Styles.textTitle, styles.title]}>{props.title}</Text>
          <Text style={[Styles.textBody, styles.body]}>{props.body}</Text>
        </View>
      </View>
    </View>
  );
};

interface TutorialSliderProps {
  tutorials: TutorialCardProps[];
}

export const TutorialSlider = (props: TutorialSliderProps) => {
  const [tutorials, setTutorials] = useState(props.tutorials);
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef<Carousel<TutorialCardProps>>(null);

  const renderCard = (item: TutorialCardProps) => {
    return (
      <TutorialCard
        title={item.title}
        body={item.body}
        backgroundColor={item.backgroundColor}
        image={item.image}
      />
    );
  };

  const onSlide = (index: number) => {
    if (Platform.OS !== "web") {
      setActiveSlide(index);
    }
  };

  const slidePrev = () => {
    if (Platform.OS === "web") {
      const newActiveSlide =
        (activeSlide - 1 + props.tutorials.length) % props.tutorials.length;
      setTutorials([props.tutorials[newActiveSlide]]);
      setActiveSlide(newActiveSlide);
    } else {
      carousel.current?.snapToPrev();
    }
  };

  const slideNext = () => {
    if (Platform.OS === "web") {
      const newActiveSlide = (activeSlide + 1) % props.tutorials.length;
      setTutorials([props.tutorials[newActiveSlide]]);
      setActiveSlide(newActiveSlide);
    } else {
      carousel.current?.snapToNext();
    }
  };

  const onSkip = () => {
    router.back();
  };

  return (
    <View style={Styles.flexContainer}>
      <Carousel
        ref={carousel}
        data={tutorials}
        renderItem={({ item }) => renderCard(item)}
        itemWidth={Dimensions.get("window").width}
        sliderWidth={Dimensions.get("window").width}
        onSnapToItem={onSlide}
        vertical={false}
      />
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={[Styles.textBody, styles.skipButton]}>Saltar</Text>
        </TouchableOpacity>
      </View>
      <View style={[Styles.horizontalContainer, styles.controlsContainer]}>
        <View style={styles.paginationContainer}>
          <Pagination
            carouselRef={carousel}
            activeDotIndex={activeSlide}
            dotsLength={props.tutorials.length}
            tappableDots={false}
            dotStyle={styles.dot}
          />
        </View>
        <View style={[Styles.horizontalContainer, styles.arrowContainer]}>
          <TouchableOpacity onPress={slidePrev}>
            <Ionicons name="arrow-back-circle" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={slideNext}>
            <Ionicons name="arrow-forward-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "black",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    width: "60%",
    paddingVertical: 30,
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    width: "80%",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
  },
  body: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
    fontSize: 14,
  },
  image: {
    flex: 1,
  },
  arrowContainer: {
    flex: 1,
    height: "100%",
    minWidth: 100,
    justifyContent: "flex-end",
  },
  paginationContainer: {
    flex: 5,
    alignItems: "flex-start",
  },
  controlsContainer: {
    flex: 0.1,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  skipContainer: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: (StatusBar.currentHeight || 15) + 5,
  },
  skipButton: {
    color: "white",
    textAlign: "right",
    marginEnd: 10,
  },
});
