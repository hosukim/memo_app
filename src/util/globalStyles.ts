import { StyleSheet } from "react-native";
import { Dimensions, PixelRatio } from "react-native";

const designWidth = 390;
const designHeight = 844;

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

const scale = SCREEN_WIDTH / designWidth;
const scaleHeight = SCREEN_HEIGHT / designHeight;

export const normalize = (size: number, forHeight?: boolean) => {
  const newSize = size * (forHeight ? scaleHeight : scale);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 20,
  },
});

// line height
export const lh = (value: number) => {
  return value + normalize(4, true);
};
