import { useState } from "react";
import { View, TextField, Text, Button, Switch } from "react-native-ui-lib";

const DarkModeSwitch = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((darkmode) => !darkmode);
  };
  return (
    <View className="flex flex-row justify-center items-center">
      <Text className="text-lg font-bold">Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default DarkModeSwitch;
