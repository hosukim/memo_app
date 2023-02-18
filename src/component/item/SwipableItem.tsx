import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontSizes } from "../../constant/Fonts";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  item: TodoTypes;
};

export default function SwipableItem({ item }: { item: TodoTypes }) {
  console.log("item : ", item);
  return (
    <SwipeableItem
      key={item.index}
      item={item}
      renderUnderlayLeft={() => <UnderlayLeft />}
      snapPointsLeft={[150]}
    >
      <View
        style={[
          styles.row,
          {
            height: "auto",
            backgroundColor: "#FFFFF5",
            marginTop: 10,
            marginHorizontal: 15,
            borderRadius: 10,
            justifyContent: "flex-start",
          },
        ]}
      >
        <Text
          style={[styles.text, { color: "#333", textAlign: "left" }]}
        >{`${item.label}`}</Text>
      </View>
    </SwipeableItem>
  );
}

const UnderlayLeft = () => {
  const { close } = useSwipeableItemParams<TodoTypes>();
  return (
    <View style={[styles.row, styles.underlayLeft]}>
      <TouchableOpacity onPress={() => close()}>
        <Text style={styles.text}>CLOSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
