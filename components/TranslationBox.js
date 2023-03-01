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
  const [audioRecording, setAudioRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);

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
    //TODO comment out
    // const newPathTranslateText = "http://127.0.0.1:8080/translateText";

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

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      setIsRecording(true);

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setAudioRecording(recording);
      }
    } catch (error) {
      //maybe toast
      console.log(error);
    }
  };

  const stopRecording = async () => {
    setAudioRecording(undefined);
    await audioRecording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });

    // const { sound, status } = await audioRecording.createNewLoadedSoundAsync();
    // sound.replayAsync();
    const uri = audioRecording.getURI();
    addAudioElement(uri);
    //Post the data to our local server first
    setIsRecording(false);
  };

  const addAudioElement = async (uri) => {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("lang", convertLangNames2Code(lang.left));
    formData.append("audio", {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });
    formData.append("format", fileType);

    try {
      setIsLoading(true);
      //   const newPathTranslateAudio = "http://127.0.0.1:8080/translateAudio";
      //   const responseObj = await postAudioFile(newPathTranslateAudio, formData);
      const responseObj = await postAudioFile(pathTranslateAudio, formData);
      const responseBodyObj = await responseObj.json();
      if (responseBodyObj["ttsText"]) {
        setInputText(responseBodyObj["ttsText"]);
      }

      if (responseBodyObj["translatedText"]) {
        setTranslatedText(responseBodyObj["translatedText"]);
      }
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
          startRecording={startRecording}
          stopRecording={stopRecording}
          isRecording={isRecording}
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
