import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, ImageBackground, ScrollView } from "react-native";
import Theme from "../../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameChart from "../../components/GameChart";

const ParentGameScreen = () => {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;

  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [chartData3, setChartData3] = useState(null);
  const [chartData4, setChartData4] = useState(null);
  const [chartData5, setChartData5] = useState(null);
  const [chartDataNull, setChartDataNull] = useState("");
  const [chartDataNull2, setChartDataNull2] = useState("");
  const [chartDataNull3, setChartDataNull3] = useState("");
  const [chartDataNull4, setChartDataNull4] = useState("");
  const [chartDataNull5, setChartDataNull5] = useState("");
  const [themeColor, setThemeColor] = useState("#26ACE2");
  const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
  const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);

  useEffect(() => {
    getEmotionValue();
    getAllGameLevelDetails();
  }, []);

  useEffect(() => {
    getAllGameLevelDetails();
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

  const getAllGameLevelDetails = async () => {
    const asyncUserName = await AsyncStorage.getItem("asyncChildUserName");
    level1getAll(asyncUserName);
    level2getAll(asyncUserName);
    level3getAll(asyncUserName);
    level4getAll(asyncUserName);
    level5getAll(asyncUserName);
  };



  const level1getAll = (username) => {
    try {
      fetch("http://124.43.16.185:50233/api/v1/get-records", {
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

          const level1Data = data.game.filter(item => item.level === "Level 1");
          if (level1Data.length === 0) {
            setChartDataNull("සුදුසුකම් ලබා නැත.");
          } else {

            const newChartData = {
              labels: level1Data.map((dataPoint) => {
                const date = new Date(dataPoint.created_at);
                const day = date.getDate().toString().padStart(2, "0");
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                return `${day}`;
              }),
              datasets: [
                {
                  data: level1Data.map((dataPoint) => dataPoint.duration),
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: level1Data.map((dataPoint) => dataPoint.stepCount),
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            };

            setChartData(newChartData);
          }
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };





  const level2getAll = (username) => {
    try {
      fetch("http://124.43.16.185:50233/api/v1/get-records", {
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
          const level2Data = data.game.filter(item => item.level === "Level 2");
          if (level2Data.length === 0) {
            setChartDataNull2("සුදුසුකම් ලබා නැත.");
          } else {
            const newChartData = {
              labels: level2Data.map((dataPoint) => {
                const date = new Date(dataPoint.created_at);
                const day = date.getDate().toString().padStart(2, "0");
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                return `${day}`;
              }),
              datasets: [
                {
                  data: level2Data.map((dataPoint) => dataPoint.duration),
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: level2Data.map((dataPoint) => dataPoint.stepCount),
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            };
            setChartData2(newChartData);
          }
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };
  const level3getAll = (username) => {
    try {
      fetch("http://124.43.16.185:50233/api/v1/get-records", {
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
          const level3Data = data.game.filter(item => item.level === "Level 3");
          console.log("level3Data===", level3Data.length);
          if (level3Data.length === 0) {
            setChartDataNull3("සුදුසුකම් ලබා නැත.");
          } else {
            const newChartData = {
              labels: level3Data.map((dataPoint) => {
                const date = new Date(dataPoint.created_at);
                const day = date.getDate().toString().padStart(2, "0");
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                return `${day}`;
              }),
              datasets: [
                {
                  data: level3Data.map((dataPoint) => dataPoint.duration),
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: level3Data.map((dataPoint) => dataPoint.stepCount),
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            };
            setChartData3(newChartData);
          }
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };
  const level4getAll = (username) => {
    try {
      fetch("http://124.43.16.185:50233/api/v1/get-records", {
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
          const levelData = data.game.filter(item => item.level === "Level 4");

          if (levelData.length === 0) {
            setChartDataNull4("සුදුසුකම් ලබා නැත.");
          } else {
            const newChartData = {
              labels: levelData.map((dataPoint) => {
                const date = new Date(dataPoint.created_at);
                const day = date.getDate().toString().padStart(2, "0");
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                return `${day}`;
              }),
              datasets: [
                {
                  data: levelData.map((dataPoint) => dataPoint.duration),
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: levelData.map((dataPoint) => dataPoint.stepCount),
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            };
            setChartData4(newChartData);
          }
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };
  const level5getAll = (username) => {
    try {
      fetch("http://124.43.16.185:50233/api/v1/get-records", {
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
          const levelData = data.game.filter(item => item.level === "Level 5");
          if (levelData.length === 0) {
            setChartDataNull5("සුදුසුකම් ලබා නැත.");
          } else {
            const newChartData = {
              labels: levelData.map((dataPoint) => {
                const date = new Date(dataPoint.created_at);
                const day = date.getDate().toString().padStart(2, "0");
                const monthNames = [
                  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ];
                return `${day}`;
              }),
              datasets: [
                {
                  data: levelData.map((dataPoint) => dataPoint.duration),
                  color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
                  strokeWidth: 2,
                },
                {
                  data: levelData.map((dataPoint) => dataPoint.stepCount),
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            };
            setChartData5(newChartData);
          }
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container, Theme.bgWhite, Theme.w100, Theme.h100]}>

          <ImageBackground
            imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
            style={[Theme.w100, Theme.h100, Theme.justAlign]}
            source={require("../../assets/img/bgTemp.jpg")}>
            <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
              <Text style={[Theme.fBold, Theme.f20, Theme.fWhite]}>
                ක්‍රීඩා වාර්තාව
              </Text>
            </View>

            {/*CHART LIST---------------------------------*/}
            <View style={[Theme.w90, Theme.h83, Theme.justAlign]}>

              <ScrollView showsVerticalScrollIndicator={false} style={[Theme.w100, Theme.h100]}>
                <View style={[Theme.h20px]} />

                {/*LEVEL 01==================================================*/}
                <View style={[Theme.w100, Theme.h250px, Theme.justAlign]}>
                  <GameChart LEVEL={"LEVEL 01"} CHART_DATA={chartData} pendingLevel={chartDataNull} />
                </View>
                <View style={[Theme.h20px]} />

                {/*LEVEL 02==================================================*/}
                <View style={[Theme.w100, Theme.h250px, Theme.justAlign]}>
                  <GameChart LEVEL={"LEVEL 02"} CHART_DATA={chartData2} pendingLevel={chartDataNull2} />
                </View>
                <View style={[Theme.h20px]} />

                {/*LEVEL 03==================================================*/}
                <View style={[Theme.w100, Theme.h250px, Theme.justAlign]}>
                  <GameChart LEVEL={"LEVEL 03"} CHART_DATA={chartData3} pendingLevel={chartDataNull3} />
                </View>
                <View style={[Theme.h20px]} />

                {/*LEVEL 04==================================================*/}
                <View style={[Theme.w100, Theme.h250px, Theme.justAlign]}>
                  <GameChart LEVEL={"LEVEL 04"} CHART_DATA={chartData4} pendingLevel={chartDataNull4} />
                </View>
                <View style={[Theme.h20px]} />

                {/*LEVEL 05==================================================*/}
                <View style={[Theme.w100, Theme.h250px, Theme.justAlign]}>
                  <GameChart LEVEL={"LEVEL 05"} CHART_DATA={chartData5} pendingLevel={chartDataNull5} />
                </View>

              </ScrollView>

            </View>
            {/*CHART LIST---------------------------------*/}
            <View style={[Theme.h10]} />
          </ImageBackground>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ParentGameScreen;
