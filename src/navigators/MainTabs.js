import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// Stacks
import HomeStack from "./HomeStack";
import MyLibraryStack from "./MyLibraryStack";
import AddContentStack from "./AddContentStack";
import StatsStack from "./StatsStack";
import ProfileStack from "./ProfileStack";
// Design
import { NEWT_BLUE, OFF_BLACK, OFF_WHITE } from "../design/colors";

const MainTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: NEWT_BLUE,
        inactiveTintColor: OFF_BLACK,
        style: {
          backgroundColor: OFF_WHITE,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="My Library"
        component={MyLibraryStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Content"
        component={AddContentStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
