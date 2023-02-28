import { View, Text, TouchableOpacity } from "react-native";

import { ArrowsRightLeftIcon } from "react-native-heroicons/solid";

const TranslationHeader = ({ left, right, setLang }) => {
  const toggleLanguage = () => {
    setLang({
      left: right,
      right: left,
    });
  };

  return (
    <View className="flex w-full flex-row justify-center bg-blue-300">
      <View className="flex flex-row justify-between mx-auto min-h-[36px]  items-center  w-full border-black border">
        <Text className="basis-1/3 items-center ml-2 capitalize">{left}</Text>
        <TouchableOpacity
          className="px-6 justify-center items-center border border-black rounded-lg text-white w-6 bg-[#333C4D]"
          onPress={toggleLanguage}
        >
          <ArrowsRightLeftIcon stroke={2} color="white" />
        </TouchableOpacity>

        <Text className="basis-1/3 justify-end text-center items-center mr-2 capitalize">
          {right}
        </Text>
      </View>
    </View>
  );
};

export default TranslationHeader;
