import React, { useEffect, useState } from "react";
import { Dimensions, View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import Theme from "../assets/theme/AxTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AxButton from "../components/AxButton";
import AxTextField from "../components/AxTextField";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOGIN } from "../api/api";
import jwt_decode from "jwt-decode";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const SignInScreen = () => {

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [value, setValue] = useState(null);
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

  const data = [
    { label: "CHILD", value: "CHILD" },
    { label: "PARENT", value: "PARENT" },
  ];

  const useNavigate = useNavigation();

  const navigationSignUp = () => {
    useNavigate.navigate("SignUpScreen");
  };

  const navigationChildHome = () => {
    useNavigate.navigate("ChildHomeScreen");
  };

  const navigationParentHome = () => {
    useNavigate.navigate("ParentHomeScreen");
  };

  const userSignIn = async () => {
    if (value === null) {
      alert("කරුණාකර පරිශීලක වර්ගය තෝරන්න");
    } else {
      if (userName === null) {
        alert("කරුණාකර පරිශීලක නාමය ඇතුලත් කරන්න");
      } else {
        if (password === null) {
          alert("කරුණාකර මුරපදය ඇතුළත් කරන්න");
        } else {
          if (value === "CHILD") {
            try {
              const loginChild = await fetch(USER_LOGIN, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: userName,
                  password: password,
                }),
              }).then((response) => response.json())
                .then((data) => {
                  const token = data.access_token;
                  if (data.msg === "The username or password is incorrect") {
                    alert("The username or password is incorrect");
                  } else {
                    try {
                      const decodedToken = jwt_decode(token);
                      if (decodedToken.sub.type === "CHILD") {
                        AsyncStorage.setItem("asyncChildUserName", decodedToken.sub.username);
                        AsyncStorage.setItem("asyncUserType", decodedToken.sub.type);
                        navigationChildHome();
                      } else {
                        if (decodedToken.sub.type === "child") {
                          AsyncStorage.setItem("asyncChildUserName", decodedToken.sub.username);
                          AsyncStorage.setItem("asyncUserType", decodedToken.sub.type);
                          navigationChildHome();
                        } else {
                          alert("දරුවා ලියාපදිංචි වී නැත!");
                        }
                      }
                    } catch (error) {
                    }
                  }
                }).catch(err => {
                });
            } catch (e) {
            }
          } else {
            if (value === "PARENT") {
              try {
                const loginParent = await fetch(USER_LOGIN, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: userName,
                    password: password,
                  }),
                }).then((response) => response.json())
                  .then((data) => {
                    const token = data.access_token;
                    if (data.msg === "The username or password is incorrect") {
                      alert("The username or password is incorrect");
                    } else {
                      try {
                        const decodedToken = jwt_decode(token);
                        if (decodedToken.sub.type === "parent") {
                          AsyncStorage.setItem("asyncParentUserName", decodedToken.sub.username);
                          AsyncStorage.setItem("asyncUserType", decodedToken.sub.type);
                          AsyncStorage.setItem("asyncUserParentEmail", decodedToken.sub.email);
                          navigationParentHome();
                        } else {
                          if (decodedToken.sub.type === "PARENT") {
                            AsyncStorage.setItem("asyncParentUserName", decodedToken.sub.username);
                            AsyncStorage.setItem("asyncUserType", decodedToken.sub.type);
                            AsyncStorage.setItem("asyncUserParentEmail", decodedToken.sub.email);
                            navigationParentHome();
                          } else {
                            alert("දෙමාපියන් ලියාපදිංචි වී නැත!");
                          }
                        }
                      } catch (error) {
                      }
                    }
                  }).catch(err => {
                  });
              } catch (e) {
              }
            } else {
            }
          }
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <ImageBackground
          imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
          style={[Theme.w100, Theme.h100, Theme.justAlign]}
          source={require("../assets/img/bgTemp.jpg")}>
          <View style={[Theme.container, Theme.w100, Theme.h100]}>
            <View style={[Theme.w80, Theme.h25, Theme.justAlign]}>
              <Image
                source={require("../assets/img/logo-tp.png")}
                style={[Theme.w100, Theme.h90]}
                resizeMode="contain"
              />
            </View>
            <View style={[Theme.w80, Theme.h7]}>
              <Dropdown
                style={[styles.dropdown, themeColor, themeColorArray, Theme.bgWhite]}
                placeholderStyle={[styles.placeholderStyle, themeColorArray]}
                selectedTextStyle={[styles.selectedTextStyle, themeColor, themeColorArray]}
                itemTextStyle={[styles.labelStyle, themeColor]}
                data={data}
                maxHeight={200}
                placeholder={"භාවිතා කරන්නා"}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={[Theme.h1]} />
            <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
              <AxTextField
                valueData={userName}
                customColor={themeColor}
                txtStyle={themeColorArray}
                onChangeData={e => setUserName(e)}
                placeHolder={"නම"}
              />
            </View>
            <View style={[Theme.h2]} />
            <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
              <AxTextField
                customColor={themeColor}
                txtStyle={themeColorArray}
                valueData={password}
                onChangeData={e => setPassword(e)}
                placeHolder={"මුරපදය"}
                secureText={true}
              />
            </View>
            <View style={[Theme.w80, Theme.h3, Theme.justAlign, Theme.flexDirRow]}>
              <View style={[Theme.w50, Theme.h100]} />
              <TouchableOpacity style={[Theme.w50, Theme.h100, Theme.justAlign]}>
                <Text style={[themeColorArray]}>
                  මුරපදය අමතක වුනාද?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[Theme.h2]} />
            <View style={[Theme.w80, Theme.h6]}>
              <AxButton
                ButtonName={"ගිණුමට ඇතුළු වන්න"}
                onPressButton={userSignIn}
                customColor={themeBgColor}
              />
            </View>
            <View style={[Theme.w80, Theme.h10, Theme.justAlign, Theme.flexDirRow]}>
              <Text style={[Theme.f15, Theme.fWhite]}>
                ගිණුමක් නැද්ද?
              </Text>
              <TouchableOpacity style={[Theme.ml2]} onPress={navigationSignUp}>
                <Text style={[Theme.f15, themeColorArray, Theme.fBold]}>
                  ලියාපදිංචි වන්න
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[Theme.h22, Theme.w80, Theme.justAlign]}>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 2,
    borderRadius: 40,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#000000",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000000",
  },
  labelStyle: {
    fontSize: 16,
    color: "#000000",
  },
});

export default SignInScreen;
