import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../../assets/theme/AxTheme";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_ALL_RECORD } from "../../api/api";

const ParentVoiceScreen = () => {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const [lastVoice, setLastVoice] = useState();
  const [chartData, setChartData] = useState("");

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
        loadAllVoiceRecords(asyncUserName);
      } else {
      }
    } catch (error) {
    }
  };
  const loadAllVoiceRecords = (username) => {
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
          const lastValue = data.audio.map((item) => item.marks);

          console.log(data);

          const newChartData = {
            labels: data.audio.map((dataPoint) => {
              const date = new Date(dataPoint.created_at);
              const day = date.getDate().toString().padStart(2, "0");
              return `${day}`;
            }),
            datasets: [
              {
                data: data.audio.map((dataPoint) => parseFloat(dataPoint.marks)),
              },
            ],
          };
          if (lastValue.length > 0) {
            const lastValues = lastValue[lastValue.length - 1];
            setLastVoice(lastValues);
          } else {
            console.log("No emotions available");
          }
          setChartData(newChartData);
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
                හඬ නිපුණතා වාර්තාව
              </Text>
            </View>

            <View style={[Theme.w85, Theme.h10, Theme.justifyCenter]}>
              <Text style={[Theme.fBold, Theme.f20, themeColorArray]}>
                අවසාන හඬ : {lastVoice}
              </Text>
            </View>

            {!chartData ? (
              <View
                style={[Theme.w85, Theme.h27, Theme.bgWhite, Theme.elevation8, Theme.justAlign, Theme.borderRadius20]}>
                <Text style={[Theme.fBold, Theme.f25, themeColorArray]}>
                  මදක් රැදී සිටින්න...!
                </Text>
              </View>
            ) : (
              <LineChart
                data={chartData}
                width={Dimensions.get("window").width - 20}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: themeColor,
                  backgroundGradientFrom: themeColor,
                  backgroundGradientTo: themeColor,
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: themeColor,
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  margin: 20,
                }}
              />
            )}

            <View style={[Theme.h56]} />

          </ImageBackground>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ParentVoiceScreen;
