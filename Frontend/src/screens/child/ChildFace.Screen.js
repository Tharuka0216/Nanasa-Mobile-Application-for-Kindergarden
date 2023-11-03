import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View, Alert, StyleSheet } from "react-native";
import Theme from "../../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AxButton from "../../components/AxButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sound from "react-native-sound";
import ImagePicker from "react-native-image-crop-picker";
import { FACE_API, FACE_SAVE_API, OBJECT_DETECTION_API } from "../../api/api";

const ChildFaceScreen = () => {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const [uri, setUri] = useState(null);
  const [emotionStatus, SetEmotionStatus] = useState(null);
  const [musicNameValue, setMusicNameValue] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playMusic = (musicName) => {
    Sound.setCategory("Playback");
    const loadedSound = new Sound(musicName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Error loading music:", error);
        return;
      }
      setSound(loadedSound);
      loadedSound.play((success) => {
        if (success) {
          setIsPlaying(true);
        } else {
          console.log("Sound playback failed");
        }
      });
    });
  };

  const stopMusic = () => {
    if (sound) {
      sound.stop(() => {
        setIsPlaying(false);
      });
    }
  };

  const userEmotion = async (emotion_) => {
    try {
      await AsyncStorage.setItem("asyncEmotion", emotion_);
    } catch (e) {
    }
  };

  const openCamera = async () => {
    try {
      ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        cropping: true,
      }).then(image => {
        setUri(image.path);
        const formData = new FormData();

        const pathSegments = image.path.split("/");
        const filename = pathSegments[pathSegments.length - 1];

        formData.append("file", {
          uri: image.path,
          type: "image/jpeg",
          name: filename,
        });

        // Object detection api calling ----------------------------------
        try {
          fetch(OBJECT_DETECTION_API, {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response was not ok");
            }
          }).then((responseData) => {
            if (responseData.label === "Person") {
              try {
                fetch(FACE_API, {
                  method: "POST",
                  body: formData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }).then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error("Network response was not ok");
                  }
                }).then((resFace) => {
                  const className = resFace.className;
                  const number = className.match(/\d+/);
                  const emotionValue = className.split(" ");

                  if (number) {
                    switch (number[0]) {
                      case "0":
                        SetEmotionStatus("Angry");
                        setMusicNameValue("angry.mp3");
                        userEmotion("Angry");
                        playMusic("angry.mp3");
                        break;
                      case "1":
                        SetEmotionStatus("Disgust");
                        setMusicNameValue("disgust.mp3");
                        userEmotion("Disgust");
                        playMusic("disgust.mp3");
                        break;
                      case "2":
                        userEmotion("Fear");
                        setMusicNameValue("fear.mp3");
                        SetEmotionStatus("Fear");
                        playMusic("fear.mp3");
                        break;
                      case "3":
                        userEmotion("Happy");
                        SetEmotionStatus("Happy");
                        setMusicNameValue("happy.mp3");
                        playMusic("happy.mp3");
                        break;
                      case "4":
                        userEmotion("Neutral");
                        setMusicNameValue("neural.mp3");
                        SetEmotionStatus("Neutral");
                        playMusic("neural.mp3");
                        break;
                      case "5":
                        userEmotion("Sad");
                        SetEmotionStatus("Sad");
                        setMusicNameValue("sad.mp3");
                        playMusic("sad.mp3");
                        break;
                      case "6":
                        userEmotion("Surprise");
                        setMusicNameValue("surprise.mp3");
                        SetEmotionStatus("Surprise");
                        playMusic("surprise.mp3");
                        break;
                      default:
                        SetEmotionStatus("Try Again");
                        break;
                    }
                  } else {
                  }
                  if (emotionValue.length > 1) {
                    const emotion_data = emotionValue[1];
                    AsyncStorage.getItem("asyncChildUserName")
                      .then((username) => {
                        if (username !== null) {
                          try {
                            fetch(FACE_SAVE_API, {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                username: username,
                                emotion: emotion_data,
                              }),
                            }).then((response) => {
                            });
                          } catch (e) {
                          }
                        } else {
                        }
                      });
                  } else {
                  }
                });
              } catch (e) {
              }
            } else {
              Alert.alert("", "Not a Person");
            }
          });
        } catch (e) {
        }
      }).catch((error) => {
      });
    } catch (e) {
    }
    await getEmotionValue();

  };

  useEffect(() => {
    getEmotionValue();
  }, [getEmotionValue]);

  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container, Theme.bgWhite, Theme.w100, Theme.h100]}>
          <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
            <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
              මුණ පෙන්නමු
            </Text>
          </View>
          <View style={[Theme.h5]} />
          <View style={[Theme.w100, Theme.h35, Theme.justAlign]}>
            <View
              style={[Theme.h300px, Theme.w300px, Theme.bgWhite, Theme.justAlign, Theme.elevation8, Theme.borderRadius_40px]}>
              {uri ? (
                <Image
                  style={[Theme.w98, Theme.h98, Theme.borderRadius_40px]}
                  source={{ uri: uri }}
                />
              ) : null}
            </View>
          </View>
          <View style={[Theme.h5]} />
          <View style={[Theme.w80, Theme.h5]}>
            <AxButton
              customColor={themeBgColor}
              ButtonName={"මුහුණේ රෑපයක් ගමු"}
              onPressButton={openCamera} />
          </View>
          <View style={[Theme.h3]} />
          <View style={[Theme.w85, Theme.h25, Theme.justAlign, Theme.elevation8, Theme.bgWhite, Theme.borderRadius20]}>
            <Text style={[Theme.fBold, Theme.f30, themeColorArray, Theme.ml2]}>
              {emotionStatus}
            </Text>
          </View>

          <View style={[Theme.h2]} />

          <View style={[Theme.w75, Theme.h6, Theme.justAlign, Theme.flexDirRow]}>
            <View style={[Theme.w100, Theme.h90, Theme.justAlign]}>
              <AxButton
                customColor={themeBgColor}
                ButtonName={"නවත්වන්න"}
                onPressButton={stopMusic} />
            </View>

          </View>
          <View style={[Theme.h7]} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChildFaceScreen;
