import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SparklesIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getLocales } from "expo-localization";

import i18next from "./i18n";

import Home from "./screens/Home";
import LanguageSwitch from "./components/LanguageSwitch";

const Stack = createNativeStackNavigator();

export default function App() {
  //list of all locales
  const defaultLocale = getLocales()[0].languageCode;
  const [locale, setLocale] = useState(defaultLocale);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLocale(i18n.language);
  };

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={`🪷 ${t("app_title")}`}
            component={Home}
            options={{
              headerShadowVisible: true,
              headerStyle: {
                backgroundColor: "#38bdf8",
              },
              headerRight: () => (
                <LanguageSwitch changeLanguage={changeLanguage} lng={locale} />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
