import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, Text, View } from "react-native";
import Theme from "../../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AxButton from "../../components/AxButton";
import YoutubePlayer from "react-native-youtube-iframe";
import ViewPager from "@react-native-community/viewpager";
import { Path, Svg, Rect } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LETTER_API, LETTER_SAVE_API } from "../../api/api";

const ChildWriteLetterScreen = () => {

    const SCREEN_HEIGHT = Dimensions.get("screen").height;
    const [playing, setPlaying] = useState(false);
    const [strokes, setStrokes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [videoId, setVideoId] = useState("AFMlJHXsjBs");
    const viewShotUseRef = useRef(null);
    const [capturedImageURI, setCapturedImageURI] = useState(null);
    useEffect(() => {
      if (videoId === null) {
        setVideoId("J6_w91PXoGE");
      }
    }, []);

    useEffect(() => {
      playRandomVideo();
    }, []);

    const playRandomVideo = () => {
      const randomVideoIds = [
        "AFMlJHXsjBs", //A
        "LQxHjLVhKqM", //T
        "Vjre8Lwyo44", //E
        "muPluCU3pdo", //G
      ];
      const randomIndex = Math.floor(Math.random() * randomVideoIds.length);
      setVideoId(randomVideoIds[randomIndex]);
    };

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
    const handleTouchStart = (e) => {
      const { nativeEvent } = e;
      const { locationX, locationY } = nativeEvent;
      const newStroke = [{ x: locationX, y: locationY }];
      setStrokes((prevStrokes) => [...prevStrokes, newStroke]);
    };
    const handleTouchMove = (e) => {
      if (!strokes.length) return;
      const { nativeEvent } = e;
      const { locationX, locationY } = nativeEvent;
      const lastStroke = strokes[strokes.length - 1];
      lastStroke.push({ x: locationX, y: locationY });
      setStrokes([...strokes]);
    };
    const clearCanvas = () => {
      setStrokes([]);
    };
    useEffect(() => {
    }, [capturedImageURI]);

    const sendPNGImage = async () => {
      try {
        viewShotUseRef.current.capture().then((imageScreenURI) => {
          setCapturedImageURI(imageScreenURI);
          const formData = new FormData();
          const pathSegments = imageScreenURI.split("/");
          const filename = pathSegments[pathSegments.length - 1];
          formData.append("file", {
            uri: imageScreenURI,
            type: "image/jpg",
            name: filename,
          });
          try {
            fetch(LETTER_API, {
              method: "POST",
              body: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Network response was not ok");
                }
              })
              .then((responseData) => {
                const className = responseData.className;
                let score = 0;
                score = responseData.confidenceScore;
                const number = className.match(/\d+/);
                if (number) {
                  switch (number[0]) {
                    case "0":
                      Alert.alert("", "අ");
                      break;
                    case "2":
                      Alert.alert("", "ග");
                      break;
                    case "3":
                      Alert.alert("", "ඉ");
                      break;
                    case "4":
                      Alert.alert("", "නැවත Video එක බලන්න");
                      break;
                    case "5":
                      Alert.alert("", "ට");
                      break;
                    default:
                      Alert.alert("", "Not Detected!");
                      break;
                  }
                  AsyncStorage.getItem("asyncChildUserName")
                    .then((username) => {
                      if (username !== null) {
                        let newScore = parseFloat(score);
                        try {
                          fetch(LETTER_SAVE_API, {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              username: username,
                              marks: newScore,
                            }),
                          }).then((response) => {
                            playRandomVideo();
                          });
                        } catch (e) {
                        }
                      } else {
                      }
                    });
                } else {
                }
              })
              .catch((error) => {
              });
          } catch (error) {
          }
        });
      } catch (e) {
      }
    };

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
      }
    }, []);

    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

    return (
      <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[{ height: SCREEN_HEIGHT }]}>
          <ImageBackground
            imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
            style={[Theme.w100, Theme.h100, Theme.justAlign]}
            source={require("../../assets/img/bgTemp.jpg")}>
            <View style={[Theme.container, Theme.w100, Theme.h100]}>
              <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
                <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
                  අකුරු ලියමු
                </Text>
              </View>

              <View style={[Theme.h5]} />

              <View style={[Theme.w85, Theme.h25]}>
                <View style={[Theme.w100, Theme.h85, Theme.cardVideoRadius, Theme.elevation8]}>
                  <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                  />
                </View>
              </View>

              <View style={[Theme.h2]} />

              <View
                style={[Theme.w85, Theme.h38, Theme.justAlign, themeBgColor, Theme.elevation8, Theme.borderRadius20]}>
                <ViewPager style={[Theme.w98, Theme.h98]} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
                  <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
                    <ViewShot style={[Theme.w100, Theme.h100, Theme.justAlign]} ref={viewShotUseRef}
                              options={{ format: "jpg", quality: 1 }}>
                      <Svg style={[Theme.w100, Theme.h100, Theme.justAlign]} onTouchStart={handleTouchStart}
                           onTouchMove={handleTouchMove}>
                        {strokes.map((stroke, index) => (
                          <Path
                            key={index}
                            d={`M${stroke.map((point) => `${point.x},${point.y}`).join("L")}`}
                            stroke="white"
                            strokeWidth="10"
                            fill={"none"}
                          />
                        ))}
                      </Svg>
                    </ViewShot>
                  </View>
                </ViewPager>
              </View>

              <View style={[Theme.h4]} />
              <View style={[Theme.w80, Theme.h6, Theme.flexDirRow]}>
                <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                  <AxButton
                    customColor={themeBgColor}
                    ButtonName={"මකන්න"} onPressButton={clearCanvas} />
                </View>
                <View style={[Theme.w4]} />
                <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                  <AxButton
                    customColor={themeBgColor}
                    ButtonName={"හරි"} onPressButton={sendPNGImage} />
                </View>
              </View>
              <View style={[Theme.h13]} />
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
;

export default ChildWriteLetterScreen;
