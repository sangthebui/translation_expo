import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  XCircleIcon,
  MicrophoneIcon,
  StopIcon,
} from "react-native-heroicons/solid";

const LoadingContent = () => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator
      className="text-center bg-transparent text-2xl text-black"
      size="large"
      color="#64748B"
    />
  </View>
);

//TODO continue to work on it.
const InputTranslation = ({
  inputText,
  onChangeText,
  clearTextAndDeleteAudio,
  isLoading,
  onSubmitEditing,
  startRecording,
  stopRecording,
  isRecording,
}) => {
  const playView = (
    <TouchableOpacity
      className="absolute bottom-2 left-2"
      onPress={stopRecording}
    >
      <StopIcon className="w-8" fill="black" />
    </TouchableOpacity>
  );
  const stopView = (
    <TouchableOpacity
      className="absolute bottom-2 left-2"
      onPress={startRecording}
    >
      <MicrophoneIcon className="w-8" fill="black" />
    </TouchableOpacity>
  );
  return (
    <View className="relative mx-auto flex h-1/2 w-full justify-items-stretch  text-black bg-white border-black border-r-2 border-l-2 border-b-2">
      <TextInput
        editable={isLoading}
        className="w-full p-3"
        editable={true}
        numberOfLines={10}
        multiline={true}
        maxLength={5000}
        value={inputText}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      {isRecording ? playView : stopView}
      <TouchableOpacity
        className="absolute top-2 right-2 drop-shadow-lg"
        onPress={clearTextAndDeleteAudio}
      >
        <XCircleIcon className="w-8" fill="black" />
      </TouchableOpacity>

      {isLoading ? <LoadingContent /> : null}
    </View>
  );
};

export default InputTranslation;
