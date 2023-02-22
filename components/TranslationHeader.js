import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ArrowsRightLeftIcon } from "react-native-heroicons/solid";

const TranslationHeader = ({ lng }) => {
  const [lang, setLang] = useState({
    left: "vietnamese",
    right: "english",
  });

  //TODO move this up
  const toggleLang = () => {
    setLang((lng) => ({ left: lng.right, right: lng.left }));
  };
  return (
    <View className="flex w-full flex-row justify-center bg-blue-300">
      <View className="flex flex-row justify-between mx-auto min-h-[36px]  items-center  w-full border-black border">
        <Text className="basis-1/3 items-center ml-2 capitalize">
          {lang.left}
        </Text>
        <TouchableOpacity
          className="px-6 justify-center items-center border border-black rounded-lg text-white w-6 bg-[#333C4D]"
          onPress={toggleLang}
        >
          <ArrowsRightLeftIcon stroke={2} color="white" />
        </TouchableOpacity>

        <Text className="basis-1/3 justify-end text-center items-center mr-2 capitalize">
          {lang.right}
        </Text>
      </View>
    </View>
  );
};

export default TranslationHeader;
