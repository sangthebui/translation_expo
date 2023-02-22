import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SparklesIcon } from "react-native-heroicons/solid";
import React, { Component } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import LanguageSwitch from "./components/LanguageSwitch";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="🪷 App Title"
            component={Home}
            options={{
              headerShadowVisible: true,
              headerStyle: {
                backgroundColor: "#38bdf8",
              },
              headerRight: () => <LanguageSwitch />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
