import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../../assets/theme/AxTheme";
import { GET_ALL_RECORD, LETTER_API } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxOverCard from "../../components/AxOverCard";

const PerformanceScreen = () => {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;

  const [letterValue, setLetterValue] = useState("");
  const [voiceValue, setVoiceValue] = useState("");
  const [faceValue, setFaceValue] = useState("");
  const [gameValue, setGameValue] = useState("");

  useEffect(async () => {
    try {
      const asyncUserName = await AsyncStorage.getItem("asyncChildUserName");
      if (asyncUserName !== null) {
        getAllRecords(asyncUserName);
      } else {
      }
    } catch (error) {
    }
  }, []);

  const [themeColor, setThemeColor] = useState("#26ACE2");
  const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
  const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);

  useEffect(() => {
    getEmotionValue();
  }, []);

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

  const getAllRecords = (username) => {
    try {
      fetch(GET_ALL_RECORD, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLetterValue(data.letters[0].marks);
          setFaceValue(data.emotion[0].emotion);
          setGameValue(data.game[0].level);
          setVoiceValue(data.audio[0].marks);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container, Theme.bgWhite]}>

          <ImageBackground
            imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
            style={[Theme.w100, Theme.h100, Theme.justAlign]}
            source={require("../../assets/img/bgTemp.jpg")}>

            <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
              <Text style={[Theme.fBold, Theme.f20, Theme.fWhite]}>
                OVERALL PERFORMANCE REPORT
              </Text>
            </View>

            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                <AxOverCard NAME={"අකුරු"} VALUE={letterValue} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow, Theme.justAlign]}>
                <AxOverCard NAME={"වචන"} VALUE={voiceValue} />
              </View>
            </View>

            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                <AxOverCard NAME={"මුණ"} VALUE={faceValue} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow, Theme.justAlign]}>
                <AxOverCard NAME={"ක්‍රීඩා"} VALUE={gameValue} />
              </View>
            </View>

            <View style={[Theme.w90, Theme.h20, Theme.justAlign]}>
              {/*<View style={[Theme.w85, Theme.h100, Theme.flexDirRow, Theme.justAlign]}>*/}
              {/*  <View style={[Theme.w100, Theme.h75, Theme.justAlign]}>*/}
              {/*    <View*/}
              {/*      style={[Theme.w100, Theme.h90, Theme.justAlign, Theme.bgWhite, Theme.borderColorMain0, Theme.elevation8, Theme.borderRadius20]}>*/}
              {/*      <Text style={[Theme.fBold, Theme.f20, Theme.fMain0]}>OVERALL MARKS</Text>*/}
              {/*      <Text style={[Theme.fBold, Theme.f20, Theme.fMain0, Theme.mt9]}>Good</Text>*/}
              {/*    </View>*/}
              {/*  </View>*/}
              {/*</View>*/}
            </View>

            <View style={[Theme.h34]} />

          </ImageBackground>
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
};
export default PerformanceScreen;
