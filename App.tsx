import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenName } from "./src/constant/Screen";
import History from "./src/screen/history/History";
import Home from "./src/screen/home/home";
import Setting from "./src/screen/setting/setting";

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
        <RootStack.Screen
          name={ScreenName.history}
          component={History}
          options={{ headerTitleAlign: "center" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
