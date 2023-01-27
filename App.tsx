import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "./src/screen/setting/Setting";
import Home from "./src/screen/home/Home";
import { ScreenName } from "./src/constant/Screen";

const RootStack = createNativeStackNavigator();

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
