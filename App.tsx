import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "./src/screen/setting/setting";
import Home from "./src/screen/home/home";

const RootStack = createNativeStackNavigator();

export const ScreenName = {
  home: "메모장",
  setting: "설정",
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="home">
        <RootStack.Screen
          name={ScreenName.home}
          component={Home}
          options={{ headerTitleAlign: "center" }}
        />
        <RootStack.Screen
          name={ScreenName.setting}
          component={Setting}
          options={{ headerTitleAlign: "center" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
