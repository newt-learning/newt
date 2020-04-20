import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import { setNavigator } from "./src/refs/navigationRef";
// Stacks
import HomeStack from "./src/stacks/_HomeStack";
import MyLibraryStack from "./src/stacks/MyLibraryStack";
import AddContentStack from "./src/stacks/AddContentStack";
import StatsStack from "./src/stacks/StatsStack";
import ProfileStack from "./src/stacks/ProfileStack";
// Screens
import ResolveAuth from "./src/screens/ResolveAuth";
import SignInScreen from "./src/screens/SignInScreen";
// Context
// import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ContentProvider } from "./src/context/ContentContext";
import { Provider as StatsProvider } from "./src/context/StatsContext";
// Hooks
import useFonts from "./src/hooks/useFonts";
// Styling
import { OFF_BLACK, OFF_WHITE, NEWT_BLUE } from "./src/design/colors";

const switchNavigator = createSwitchNavigator({
  ResolveAuth,
  SignIn: SignInScreen,
  mainFlow: createBottomTabNavigator(
    {
      Home: HomeStack,
      "My Library": MyLibraryStack,
      "Add Content": AddContentStack,
      Stats: StatsStack,
      Profile: ProfileStack
    },
    {
      tabBarOptions: {
        activeTintColor: NEWT_BLUE,
        inactiveTintColor: OFF_BLACK,
        style: {
          backgroundColor: OFF_WHITE
        }
      }
    }
  )
});

// const MainTabs = () => {
//   const Tab = createBottomTabNavigator();

//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: NEWT_BLUE,
//         inactiveTintColor: OFF_BLACK,
//         style: {
//           backgroundColor: OFF_WHITE
//         }
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="My Library" component={MyLibraryStack} />
//       <Tab.Screen name="Add Content" component={AddContentStack} />
//       <Tab.Screen name="Stats" component={StatsStack} />
//       <Tab.Screen name="Profile" component={ProfileStack} />
//     </Tab.Navigator>
//   );
// };

const App = createAppContainer(switchNavigator);
// const App = () => {
//   const {
//     state: { isFetching, exists },
//     tryLocalSignIn
//   } = useContext(AuthContext);

//   useEffect(() => {
//     tryLocalSignIn();
//   }, []);

//   const Stack = createStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {exists ? (
//           <Stack.Screen name="Main" component={MainTabs} />
//         ) : (
//           <Stack.Screen name="SignIn" component={SignInScreen} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

export default () => {
  // Load custom fonts
  const [fontLoaded] = useFonts();

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <ContentProvider>
        <StatsProvider>
          <App ref={navigator => setNavigator(navigator)} />
          {/* <App /> */}
        </StatsProvider>
      </ContentProvider>
    </AuthProvider>
  );
};
