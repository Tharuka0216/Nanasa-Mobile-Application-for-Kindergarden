import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Theme from "../assets/theme/AxTheme";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameChart = ({ LEVEL, CHART_DATA, pendingLevel }) => {

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


  return (
    <>
      <View style={[Theme.w100, Theme.h10, Theme.justAlign]}>
        <Text style={[Theme.fBold, Theme.f20]}>
          {LEVEL}
        </Text>
      </View>
      {!CHART_DATA ? (
        <>
          {pendingLevel ? (
            <View
              style={[Theme.w90, Theme.h90, Theme.bgWhite, Theme.elevation8, Theme.justAlign, Theme.borderRadius20]}>
              <Text style={[Theme.fBold, Theme.f25, themeColorArray]}>
                {pendingLevel}
              </Text>
            </View>
          ) : (
            <View
              style={[Theme.w90, Theme.h90, Theme.bgWhite, Theme.elevation8, Theme.justAlign, Theme.borderRadius20]}>
              <Text style={[Theme.fBold, Theme.f25, themeColorArray]}>
                මදක් රැදී සිටින්න...!
              </Text>
            </View>
          )}
        </>
      ) : (
        <LineChart
          data={CHART_DATA}
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
    </>
  );
};

export default GameChart;
