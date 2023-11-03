import { Dimensions, Text, View, StyleSheet, ImageBackground } from "react-native";
import Theme from "../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import AxMenuCard from "../components/AxMenuCard";
import AxButton from "../components/AxButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { PARENT_SEARCH_CHILD_API } from "../api/api";

const ParentHomeScreen = () => {

  const [themeColor, setThemeColor] = useState("#26ACE2");
  const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
  const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);

  const [childUserNames, setChildUserNames] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    loadChild();
  }, []);


  const loadChild = async () => {
    try {
      const asyncUserParentEmail = await AsyncStorage.getItem("asyncUserParentEmail");
      if (asyncUserParentEmail !== null) {
        const URI = PARENT_SEARCH_CHILD_API + asyncUserParentEmail;
        const response = await fetch(URI);
        const result = await response.json();
        const mappedData = result.map((item) => ({
          label: item.username,
          value: item.username,
        }));
        setChildUserNames(mappedData);
        setChildUserNames(mappedData);
      }
    } catch (error) {
    }
  };

  const removeUserDate = async () => {
    try {
      await AsyncStorage.removeItem("asyncUserType");
      await AsyncStorage.removeItem("asyncParentUserName");
      await AsyncStorage.removeItem("asyncUserParentEmail");
      await AsyncStorage.removeItem("asyncEmotion");
      useNavigate.navigate("SignInScreen");
    } catch (error) {
      alert("Can't Remove!");
    }
  };

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
  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const useNavigate = useNavigation();
  const navigationLetter = () => {
    useNavigate.navigate("ParentLetterScreen");
  };
  const navigationVoice = () => {
    useNavigate.navigate("ParentVoiceScreen");
  };
  const navigationFace = () => {
    useNavigate.navigate("ParentFaceScreen");
  };
  const navigationGame = () => {
    useNavigate.navigate("ParentGameScreen");
  };
  const navigationPer = () => {
    useNavigate.navigate("PerformanceScreen");
  };

  const saveAsyncChildName = async (setAsync) => {
    await AsyncStorage.setItem("asyncChildUserName", setAsync);
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container, Theme.bgWhite]}>

          <ImageBackground
            imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
            style={[Theme.w100, Theme.h100, Theme.justAlign]}
            source={require("../assets/img/bgTemp.jpg")}>

            <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
              <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
                ළමා ප්‍රගතිය
              </Text>
            </View>
            <View style={[Theme.h7]} />
            <View style={[Theme.w80, Theme.h6]}>
              <Dropdown
                style={[styles.dropdown, themeColor, themeColorArray]}
                placeholderStyle={[styles.placeholderStyle, themeColorArray]}
                selectedTextStyle={[styles.selectedTextStyle, themeColor, themeColorArray]}
                itemTextStyle={[styles.labelStyle, themeColor]}
                data={childUserNames}
                maxHeight={200}
                placeholder={"ඔබගේ දරුවන්ගේ නම"}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => {
                  setValue(item.value);
                  saveAsyncChildName(item.value);
                }}
              />
            </View>
            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100]}>
                <AxMenuCard
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  CARD_IMG={require("../assets/img/A.png")}
                  ON_PRESS={navigationLetter} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow]}>
                <AxMenuCard
                  CARD_IMG={require("../assets/img/voice.png")}
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  ON_PRESS={navigationVoice} />
              </View>
            </View>
            <View style={[Theme.h2]} />
            <View style={[Theme.w90, Theme.h20, Theme.flexDirRow]}>
              <View style={[Theme.w48, Theme.h100]}>
                <AxMenuCard
                  CARD_IMG={require("../assets/img/face.png")}
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  ON_PRESS={navigationFace} />
              </View>
              <View style={[Theme.w4]} />
              <View style={[Theme.w48, Theme.h100, Theme.flexDirRow]}>
                <AxMenuCard
                  CARD_IMG={require("../assets/img/puzzle-alt.png")}
                  FONT_STYLE={themeColorArray}
                  CARD_BORDER={themeColorArray}
                  STYLE={[Theme.ml7, Theme.mb5]}
                  ON_PRESS={navigationGame} />
              </View>
            </View>
            <View style={[Theme.h5]} />
            <View style={[Theme.w80, Theme.h6]}>
              <AxButton
                customColor={themeBgColor}
                ButtonName={"සමස්ත කාර්ය සාධනය"}
                onPressButton={navigationPer} />
            </View>
            <View style={[Theme.w90, Theme.h10]} />
            <View style={[Theme.w80, Theme.h6]}>
              <AxButton
                ButtonName={"ගිණුමෙන් ඉවත් වන්න"}
                onPressButton={removeUserDate}
                customColor={themeBgColor}
              />
            </View>
            <View style={[Theme.w90, Theme.h11]} />
          </ImageBackground>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,

  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ParentHomeScreen;
