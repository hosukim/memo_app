import { Text, StyleSheet } from "react-native";
import React from "react";
import { useSwipeableItemParams } from "react-native-swipeable-item";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../../../util/globalStyles";

const UnderlayLeft = ({
  drag,
  onPressDelete,
}: {
  drag: () => void;
  onPressDelete: () => void;
}) => {
  const { item, percentOpen } = useSwipeableItemParams<TodoTypes>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen]
  );

  return (
    <Animated.View
      style={[globalStyles.row, styles.underlayLeft, animStyle]}
    >
      <TouchableOpacity onPress={onPressDelete}>
        <Text style={globalStyles.text}>{`[delete]`}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});

export default UnderlayLeft;
