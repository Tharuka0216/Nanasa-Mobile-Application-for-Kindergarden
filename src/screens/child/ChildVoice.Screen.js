import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Text, TextInput, View } from "react-native";
import Theme from "../../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AxButton from "../../components/AxButton";
import YoutubePlayer from "react-native-youtube-iframe";
import Voice from "@react-native-community/voice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUDIO_DATA_SAVE_API, AUDIO_SEND_API } from "../../api/api";
import { mp3Aliya, mp3Amma, mp3Apple, mp3Cake, mp3Choco } from "../../assets/audio/commonConfig";

const ChildVoiceScreen = () => {

    useEffect(() => {
      Voice.onSpeechStart = speechStartHandler;
      Voice.onSpeechEnd = speechEndHandler;
      Voice.onSpeechResults = speechResultsHandler;
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, []);
    const SCREEN_HEIGHT = Dimensions.get("screen").height;
    const [playing, setPlaying] = useState(false);
    const [result, setResult] = useState("");
    const [videoId, setVideoId] = useState(null);
    const [responseResult, setResponseResult] = useState(null);
    const [videoTempName, setVideoTempName] = useState(null);
    const [themeColor, setThemeColor] = useState("#26ACE2");
    const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
    const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);
    useEffect(() => {
      getEmotionValue();
      if (videoId === null) {
        setVideoId("EWoFobQTasA");
      } else {
      }
    }, []);
    useEffect(() => {
    }, [videoTempName]);
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
    const speechStartHandler = e => {
    };
    const speechEndHandler = e => {
    };

    const audioSaving = (URI, NAME, CAT, VIDEO_ID) => {
      const formData = new FormData();
      formData.append("file", {
        uri: URI,
        name: NAME,
        type: "audio/mp3",
      });
      formData.append("category", CAT);
      try {
        fetch(AUDIO_SEND_API, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => response.json())
          .then((data) => {
            if (data.msg === "correct") {
              setResponseResult("ඔයා නිවැරදියි");
              audioMarksSave();
              setVideoId(VIDEO_ID);
            } else {
            }
          })
          .catch((error) => {
            console.error("Upload error", error);
          });
      } catch (e) {
      }
    };
    const speechResultsHandler = e => {
      const text = e.value[0];
      setResult(text);
    };
    const startRecording = async () => {
      try {
        await Voice.start("en-Us");
      } catch (error) {
      }
    };
    const audioMarksSave = () => {
      AsyncStorage.getItem("asyncChildUserName").then((username) => {
        try {
          fetch(AUDIO_DATA_SAVE_API, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              marks: "1",
            }),
          }).then((response) => {
            if (response.ok) {
              alert("Recorded Your Data!");
            } else {
              alert("Not Recorded Your Data!");
            }
          });
        } catch (error) {
        }
      });
    };

    const stopRecording = async () => {
      await Voice.stop();
      if (result === "") {
        alert("ආරම්භ කරන්න ");
      } else {
        try {
          AsyncStorage.getItem("asyncChildUserName").then((username) => {
            if (videoId === "EWoFobQTasA" && result === "Amma") {
              audioSaving(mp3Amma, "amma.mp3", "Amma", "rxMik8HFo0k");
            } else {
              if (videoId === "rxMik8HFo0k" && result === "Alia") {
                audioSaving(mp3Aliya, "Aliya.mp3", "Aliya", "QAm-5qdfRDk");
              } else {
                if (videoId === "QAm-5qdfRDk" && result === "Apple") {
                  audioSaving(mp3Apple, "Apple.mp3", "Apple", "ATSl7pijjcI");
                } else {
                  if (videoId === "ATSl7pijjcI" && result === "cake") {
                    audioSaving(mp3Cake, "cake.mp3", "cake", "6mlKqicsNl4");
                  } else {
                    if (videoId === "6mlKqicsNl4" && result === "chocolate") {
                      audioSaving(mp3Choco, "chocolate.mp3", "chocolate");
                    } else {
                      setResponseResult("වැරදියි, අයේ උත්සහ කරන්න");
                    }
                  }
                }
              }
            }
          });
        } catch (e) {
          alert("Not Login Child");
        }
      }
    };

    const clear = () => {
      setResult("");
      setResponseResult("");
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
                  වචන කියමු
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
              <View style={[Theme.w85, Theme.h16, Theme.bgWhite, Theme.elevation8, Theme.borderRadius20]}>
                <View style={[Theme.w100, Theme.h30]}>
                  <TextInput
                    value={result}
                    multiline={true}
                    placeholderTextColor={themeColor}
                    placeholder="Say Something!"
                    style={{
                      flex: 1,
                      fontSize: 17,
                      fontWeight: "bold",
                      marginLeft: 5,
                      color: themeColor,
                    }}
                    onChangeText={text => setResult(text)}
                  />
                </View>
              </View>
              <View style={[Theme.h2]} />
              <View
                style={[Theme.w85, Theme.h15, themeBgColor, Theme.justAlign, Theme.elevation8, Theme.borderRadius20]}>
                {responseResult !== null && (
                  <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
                    {responseResult}
                  </Text>
                )}
              </View>
              <View style={[Theme.h4]} />
              <View style={[Theme.w80, Theme.h6, Theme.flexDirRow]}>
                <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                  <AxButton
                    customColor={themeBgColor}
                    ButtonName={"ආරම්භ කරන්න"} onPressButton={startRecording} />
                </View>

                <View style={[Theme.w4]} />

                <View style={[Theme.w48, Theme.h100, Theme.justAlign]}>
                  <AxButton
                    customColor={themeBgColor}
                    ButtonName={"නවත්වන්න"} onPressButton={stopRecording} />
                </View>
              </View>
              <View style={[Theme.h2]} />
              <View style={[Theme.w80, Theme.h6, Theme.flexDirRow]}>
                <AxButton
                  customColor={themeBgColor}
                  ButtonName={"මකන්න"} onPressButton={clear} />
              </View>
              <View style={[Theme.h11]} />
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
;


export default ChildVoiceScreen;
