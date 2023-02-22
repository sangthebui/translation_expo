import { View, Text, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

import TranslationHeader from "./TranslationHeader";
import InputTranslation from "./InputTranslation";
import OutputTranslation from "./OutputTranslation";

import {
  fetchTranslate,
  postAudioFile,
  pathTranslateText,
  pathTranslateAudio,
} from "../api/translate";

const TranslationBox = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("translation");
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const onChangeInput = (value) => {
    setInputText(value);
  };

  //TODO continue to reset it.
  const clearTextAndDeleteAudio = () => {
    setInputText("");
    setTranslatedText("translation");
  };

  const playSound = async () => {
    if (audioUrl !== "") {
      const status = {
        shouldPlay: false,
      };
      const sound = new Audio.Sound();
      await sound.loadAsync(
        {
          uri: audioUrl,
        },
        status,
        false
      );

      await sound.playAsync();
    } else {
      //TODO show toast that there is no Audio set
    }
  };

  const onSubmitEditing = async () => {
    try {
      const data = {
        text: inputText,
        //   lang: convertLangNames2Code(lang.left),
        lang: "en",
      };
      setIsLoading(true);
      Keyboard.dismiss();
      const responseObj = await fetchTranslate(pathTranslateText, data);
      const responseBodyObj = await responseObj.json();
      //Need to save the audio to a file, then play from audio from file
      if (responseBodyObj["translatedText"]) {
        setTranslatedText(responseBodyObj["translatedText"]);
      }
      //comment out for development
      if (responseBodyObj["generate_file_name"]) {
        const freshAudioUrl = `https://storage.googleapis.com/translation_mobile_audio_files/${responseBodyObj["generate_file_name"]}`;
        setAudioUrl(freshAudioUrl);
        const status = {
          shouldPlay: false,
        };
        const sound = new Audio.Sound();
        await sound.loadAsync(
          {
            uri: freshAudioUrl,
          },
          status,
          false
        );

        await sound.playAsync();

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  return (
    <View className="relative z-0 flex h-3/4 flex-col rounded-md ">
      <TranslationHeader />
      <View className="m-0 flex grow-[25] flex-col p-0 ">
        <InputTranslation
          inputText={inputText}
          onChangeText={onChangeInput}
          clearTextAndDeleteAudio={clearTextAndDeleteAudio}
          isLoading={isLoading}
          onSubmitEditing={onSubmitEditing}
        />
        <OutputTranslation
          translatedText={translatedText}
          playSound={playSound}
        />
      </View>
    </View>
  );
};

export default TranslationBox;
