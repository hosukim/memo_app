import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSwipeableItemParams } from "react-native-swipeable-item";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../../../util/globalStyles";

const UnderlayRight = () => {
  const { close } = useSwipeableItemParams<TodoType>();
  return (
    <Animated.View style={[globalStyles.row, styles.underlayRight]}>
      <TouchableOpacity onPressOut={close}>
        <Text style={globalStyles.text}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UnderlayRight;

const styles = StyleSheet.create({
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
});
