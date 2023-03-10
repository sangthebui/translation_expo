import { View, TextField, Text, Button, Switch } from "react-native-ui-lib";

const LanguageSwitch = ({ lng, changeLanguage }) => {
  return (
    <View className="flex flex-row justify-center items-center">
      <Button
        className=""
        borderRadius={0}
        size={Button.sizes.xSmall}
        disabled={lng === "en"}
        onPress={() => changeLanguage("en")}
        label={"πΊπΈ"}
      />
      <Button
        className=""
        disabled={lng === "vi"}
        borderRadius={0}
        size={Button.sizes.xSmall}
        onPress={() => changeLanguage("vi")}
        label={"π»π³"}
      />
    </View>
  );
};

export default LanguageSwitch;
