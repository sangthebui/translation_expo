import { View, Text, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";

import TranslationHeader from "./TranslationHeader";
import InputTranslation from "./InputTranslation";
import OutputTranslation from "./OutputTranslation";

import {
  fetchTranslate,
  postAudioFile,
  pathTranslateText,
  pathTranslateAudio,
} from "../api/translate";

import convertLangNames2Code from "../ultilities/convertLangNames2Code";

const TranslationBox = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState({
    left: t("vi_full_name"),
    right: t("en_full_name"),
  });
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState(
    t("output_default_value")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const onChangeInput = (value) => {
    setInputText(value);
  };

  const clearTextAndDeleteAudio = () => {
    setInputText("");
    setTranslatedText(t("output_default_value"));
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
    if (inputText.length > 1) {
      //if there is nothing to translate don't even bother.

      try {
        const data = {
          text: inputText,
          lang: convertLangNames2Code(lang.left),
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
      <TranslationHeader
        left={lang.left}
        right={lang.right}
        setLang={setLang}
      />
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
          translation_copied={t("translation_copied")}
        />
      </View>
    </View>
  );
};

export default TranslationBox;
