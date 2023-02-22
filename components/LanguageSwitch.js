import { useState } from "react";
import { View, TextField, Text, Button, Switch } from "react-native-ui-lib";

//TODO continue to work on i18n
const LanguageSwitch = () => {
  const [isViet, setViet] = useState(true);

  const toggleLanguage = () => {
    setViet((isViet) => !isViet);
  };
  return (
    <View className="flex flex-row justify-center items-center">
      <Button
        className=""
        borderRadius={0}
        size={Button.sizes.xSmall}
        disabled={isViet}
        onPress={toggleLanguage}
        label={"🇺🇸"}
      />
      <Button
        className=""
        disabled={!isViet}
        borderRadius={0}
        size={Button.sizes.xSmall}
        onPress={toggleLanguage}
        label={"🇻🇳"}
      />
    </View>
  );
};

export default LanguageSwitch;
