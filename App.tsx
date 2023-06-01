import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Platform, SafeAreaView, UIManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RouteButton from "./src/component/button/RouteButton";
import { ScreenName } from "./src/constant/Screen";
import History from "./src/screen/history/History";
import Home from "./src/screen/home/home";
import Setting from "./src/screen/setting/setting";

const RootStack = createNativeStackNavigator();

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "seashell" }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <RootStack.Navigator initialRouteName={ScreenName.home}>
              <RootStack.Screen
                name={ScreenName.home}
                component={Home}
                options={{
                  headerTitleAlign: "center",
                  headerLeft: () => (
                    <RouteButton icon="restore" page={ScreenName.history} />
                  ),
                  headerRight: () => (
                    <RouteButton icon="settings" page={ScreenName.setting} />
                  ),
                }}
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
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
