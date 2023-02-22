import { View, TextInput, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { Audio } from "expo-av";

import { PlayIcon } from "react-native-heroicons/solid";

const OutputTranslation = ({ translatedText, playSound }) => {
  return (
    <View className="relative  mx-auto flex-1 h-1/2 w-full justify-items-stretch  bg-white border-b-2 border-black border-l-2 border-r-2">
      <TextInput
        className=" w-full p-3"
        editable={false}
        numberOfLines={4}
        maxLength={5000}
        value={translatedText}
      ></TextInput>
      <TouchableOpacity
        className="absolute bottom-1 left-1"
        onPress={playSound}
      >
        <PlayIcon className="w-8 bg-transparent" fill="black" />
      </TouchableOpacity>
    </View>
  );
};

export default OutputTranslation;
