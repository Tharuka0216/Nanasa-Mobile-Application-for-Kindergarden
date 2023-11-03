import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../../assets/theme/AxTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_ALL_RECORD } from "../../api/api";

const ParentFaceScreen = () => {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const [lastEmotion, setLastEmotion] = useState("");
  const [emotionText, setEmotionText] = useState("");
  const [emotionDate, setEmotionDate] = useState("");

  useEffect(() => {
    loadUserInfo();
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

  const loadUserInfo = async () => {
    try {
      const asyncUserName = await AsyncStorage.getItem("asyncChildUserName");
      if (asyncUserName !== null) {
        loadAllFaceRecords(asyncUserName);
      } else {
      }
    } catch (error) {
    }
  };

  const loadAllFaceRecords = (username) => {
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
          const emotions = data.emotion.map((item) => item.emotion);
          const emotionsText = emotions.join("\n");
          setEmotionText(emotionsText);
          const formattedDates = data.emotion.map((dataPoint) => {
            const date = new Date(dataPoint.created_at);
            const day = date.getDate().toString().padStart(2, "0");
            const monthNames = [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
          });
          const emotionsDateText = formattedDates.join("\n");
          setEmotionDate(emotionsDateText);

          if (emotions.length > 0) {
            const lastEmotion = emotions[emotions.length - 1];
            console.log("Last Emotion:", lastEmotion);
            setLastEmotion(lastEmotion);
          } else {
            console.log("No emotions available");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } catch (error) {
      console.error("Error in loadAllFaceRecords:", error);
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
                මුහුණු හැඟීම් වාර්තාව
              </Text>
            </View>
            <View style={[Theme.w85, Theme.h10, Theme.justifyCenter]}>
              <Text style={[Theme.fBold, Theme.f20, themeColorArray]}>
                LAST : {lastEmotion}
              </Text>
            </View>
            <View style={[Theme.w85, Theme.h70, Theme.flexDirRow]}>
              <View style={[Theme.w40, Theme.h100]}>
                <Text style={[Theme.fBold, Theme.f20, themeColorArray]}>
                  {emotionDate}
                </Text>
              </View>
              <View style={[Theme.w40, Theme.h100]}>
                <Text style={[Theme.fBold, Theme.f20, themeColorArray]}>
                  {emotionText}
                </Text>
              </View>
            </View>
            <View style={[Theme.h13]} />
          </ImageBackground>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ParentFaceScreen;
