import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavHeaderTitle } from "../components/Headers";
import { Feather } from "@expo/vector-icons";
// Screens
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
import ShelfSelectScreen from "../screens/ShelfSelectScreen";
import UpdateProgressScreen from "../screens/UpdateProgressScreen";
// Design
import { OFF_WHITE } from "../design/colors";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTitle: <NavHeaderTitle title="newt" displayLogo />,
        // Android headers default to left so add some padding for "logo"
        headerTitleContainerStyle: {
          paddingLeft: Platform.OS === "android" ? 15 : 0
        },
        headerStyle: {
          backgroundColor: OFF_WHITE
        }
      }}
    />
    <MainStack.Screen name="BookScreen" component={BookScreen} />
    <MainStack.Screen name="ShelfSelect" component={ShelfSelectScreen} />
  </MainStack.Navigator>
);

const RootStackScreen = () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{
        headerShown: false,
        headerBackTitle: "Cancel"
      }}
    />
    <RootStack.Screen
      name="UpdateProgress"
      component={UpdateProgressScreen}
      options={{
        headerTitle: "Update Progress"
      }}
    />
  </RootStack.Navigator>
);

// const MainStack = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       headerTitle: <NavHeaderTitle title="newt" displayLogo />,
//       // Android headers default to left so add some padding for "logo"
//       headerTitleContainerStyle: {
//         paddingLeft: Platform.OS === "android" ? 15 : 0
//       },
//       headerStyle: {
//         backgroundColor: OFF_WHITE
//       }
//     }
//   },
//   BookScreen: BookScreen,
//   ShelfSelect: ShelfSelectScreen
// });

// const HomeStack = createStackNavigator(
//   {
//     Main: {
//       screen: MainStack,
//       navigationOptions: {
//         headerShown: false,
//         headerBackTitle: "Cancel"
//       }
//     },
//     UpdateProgress: {
//       screen: UpdateProgressScreen,
//       navigationOptions: {
//         headerTitle: "Update Progress"
//       }
//     }
//   },
//   { mode: "modal" }
// );

// HomeStack.navigationOptions = {
//   tabBarIcon: ({ tintColor }) => (
//     <Feather name="home" size={20} color={tintColor} />
//   )
// };

export default RootStackScreen;
