import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../assets/theme/AxTheme";
import AxMenuCard from "../components/AxMenuCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxButton from "../components/AxButton";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const ChildHomeScreen = () => {

  useEffect(() => {
    loadUserInfo();
    getEmotionValue();
  }, []);

  useEffect(() => {
    getEmotionValue();
  }, [getEmotionValue]);

  const [userName, setUserName] = useState();
  const [themeColor, setThemeColor] = useState("#26ACE2");
  const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
  const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);

  const getEmotionValue = async () => {
    try {
      const emotionValue = await AsyncStorage.getItem("asyncEmotion");
      if (emotionValue !== null) {
        if (emotionValue === "Happy") {
          setThemeColor("#27ae60");
          setThemeBgColor(Theme.themeBgGreen);
          setThemeColorArray([Theme.themeColorGreen, Theme.themeBorderGreen]);
        } else {
          if (emotionValue === "Angry") {
            setThemeColor("#eb3b5a");
            setThemeBgColor(Theme.themeBgRed);
            setThemeColorArray([Theme.themeColorRed, Theme.themeBorderRed]);
          } else {
            if (emotionValue === "Disgust") {
              setThemeColor("#8854d0");
              setThemeBgColor(Theme.themeBgPurl);
              setThemeColorArray([Theme.themeColorPurl, Theme.themeBorderPurl]);
            } else {
              if (emotionValue === "Fear") {
                setThemeColor("#3d3d3d");
                setThemeBgColor(Theme.themeBgFear);
                setThemeColorArray([Theme.themeColorFear, Theme.themeBorderFear]);
              } else {
                if (emotionValue === "Neutral") {
                  setThemeColor("#f7b731");
                  setThemeBgColor(Theme.themeBgNeutral);
                  setThemeColorArray([Theme.themeColorNeutral, Theme.themeBorderNeutral]);
                } else {
                  if (emotionValue === "Sad") {
                    setThemeColor("#535c68");
                    setThemeBgColor(Theme.themeBgSad);
                    setThemeColorArray([Theme.themeColorSad, Theme.themeBorderSad]);
                  } else {
                    if (emotionValue === "Surprise") {
                      setThemeColor("#26ACE2");
                      setThemeBgColor(Theme.themeBgBlue);
                      setThemeColorArray([Theme.themeColorBlue, Theme.themeBorderBlue]);
                    } else {
                    }
                  }
                }
              }
            }
          }
        }
      } else {
      }
    } catch (error) {
    }
  };
  const loadUserInfo = async () => {
    try {
      const asyncUserName = await AsyncStorage.getItem("asyncChildUserName");
      if (asyncUserName !== null) {
        setUserName(asyncUserName);
      } else {
        alert("Child info not found");
      }
    } catch (error) {
    }
  };
  const useNavigate = useNavigation();
  const removeUserDate = async () => {
    try {
      await AsyncStorage.removeItem("asyncUserType");
      await AsyncStorage.removeItem("asyncChildUserName");
      await AsyncStorage.removeItem("asyncEmotion");
      useNavigate.navigate("SignInScreen");
    } catch (error) {
      alert("Can't Remove!");
    }
  };
  const navigationChildLetter = () => {
    useNavigate.navigate("ChildWriteLetterScreen");
  };

  const navigationChildVoice = () => {
    useNavigate.navigate("ChildVoiceScreen");
  };

  const navigationChildFace = () => {
    useNavigate.navigate("ChildFaceScreen");
  };

  const navigationChildGame = () => {
    useNavigate.navigate("ChildGameScreen");
  };


  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <ImageBackground
          imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
          style={[Theme.w100, Theme.h100, Theme.justAlign]}
          source={require("../assets/img/bgTemp.jpg")}>
          <View style={[Theme.container, Theme.w100, Theme.h100]}>
            <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.alignItemCenter]}>
              <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml5]}>
                ළමයාගේ නම :
              </Text>
              <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
                {userName}
              </Text>
            </View>
            <View style={[Theme.h5]} />
            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100]}>
                <AxMenuCard
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  CARD_TITLE={"අකුරු ලියමු"}
                  CARD_IMG={require("../assets/img/A.png")}
                  ON_PRESS={navigationChildLetter} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow]}>
                <AxMenuCard
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  CARD_TITLE={"වචන කියමු"}
                  CARD_IMG={require("../assets/img/voice.png")}
                  ON_PRESS={navigationChildVoice} />
              </View>
            </View>
            <View style={[Theme.h2]} />
            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100]}>
                <AxMenuCard
                  CARD_TITLE={"මුණ පෙන්නමු"}
                  CARD_BORDER={themeColorArray}
                  FONT_STYLE={themeColorArray}
                  CARD_IMG={require("../assets/img/face.png")}
                  ON_PRESS={navigationChildFace} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow]}>
                <AxMenuCard
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  CARD_TITLE={"ක්‍රීඩා කරමු"} CARD_IMG={require("../assets/img/puzzle-alt.png")}
                  STYLE={[Theme.ml7, Theme.mb5]}
                  ON_PRESS={navigationChildGame} />
              </View>
            </View>
            <View style={[Theme.h30]} />
            <View style={[Theme.w80, Theme.h6]}>
              <AxButton
                ButtonName={"ගිණුමෙන් ඉවත් වන්න"}
                onPressButton={removeUserDate}
                customColor={themeBgColor}
              />
            </View>
            <View style={[Theme.h10]} />
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChildHomeScreen;
