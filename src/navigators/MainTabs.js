import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// Stacks
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
// Design
import { NEWT_BLUE, OFF_BLACK } from "../design/colors";

const MainTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: NEWT_BLUE,
        inactiveTintColor: OFF_BLACK
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={20} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={20} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
