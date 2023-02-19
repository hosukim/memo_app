import { Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import SwipeableItem, { OpenDirection } from "react-native-swipeable-item";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import UnderlayLeft from "./UnderlayLeft";
import UnderlayRight from "./UnderlayRight";
import { globalStyles } from "../../../../util/globalStyles";

type TodoItemTypes = {
  todo: TodoTypes;
  isActive: boolean;
  drag: () => void;
  onPressDelete: () => void;
  todoRefs: React.MutableRefObject<Map<any, any>>;
};

const OVERSWIPE_DIST = 20;

export default function SwipableItem({
  todo,
  todoRefs,
  isActive,
  drag,
  onPressDelete,
}: TodoItemTypes) {
  const [snapPointsLeft, setSnapPointsLeft] = useState([100]);

  useEffect(() => {
    if (todo.key === "todo-0") {
      setTimeout(() => {
        todoRefs.current
          ?.get(todo.key)
          ?.open(OpenDirection.LEFT, undefined, { animated: true });
      }, 1000);
    }
  }, [todo.key]);

  return (
    <ScaleDecorator>
      <SwipeableItem
        key={todo.index}
        item={todo}
        ref={(ref) => {
          if (ref && !todoRefs.current.get(todo.key)) {
            todoRefs.current.set(todo.key, ref);
          }
        }}
        onChange={({ openDirection }) => {
          if (openDirection !== OpenDirection.NONE) {
            [...todoRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== todo.key && ref) ref.close();
            });
          }
        }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => (
          <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
        )}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={snapPointsLeft}
      >
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          style={[
            globalStyles.row,
            { backgroundColor: isActive ? "red" : "seashell" },
          ]}
          delayLongPress={250}
        >
          <Text style={[globalStyles.text]}>{`${todo.label}`}</Text>
        </TouchableOpacity>
      </SwipeableItem>
    </ScaleDecorator>
  );
}
