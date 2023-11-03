import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Theme from "../assets/theme/AxTheme";
import AxTextField from "../components/AxTextField";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import AxButton from "../components/AxButton";
import { useNavigation } from "@react-navigation/native";
import { USER_REGISTER } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const SignUpScreen = () => {

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [childUserName, setChildUserName] = useState(null);
    const [childPassword, setChildPassword] = useState(null);
    const [childDOB, setChildDOB] = useState(null);
    const [parentUserName, setParentUserName] = useState(null);
    const [parentEmailAddress, setParentEmailAddress] = useState(null);
    const [parentPassword, setParentPassword] = useState(null);
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
    const confirmDateTime = () => {
      const get_date = moment(date).format("YYYY-MM-DD");
      setChildDOB(get_date);
    };
    useEffect(() => {
      console.log(childDOB);
    }, [childDOB]);
    const useNavigate = useNavigation();
    const navigationSignIn = () => {
      useNavigate.navigate("SignInScreen");
    };
    const userRegister = async () => {
      try {
        const responseParent = await fetch(USER_REGISTER, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: parentUserName,
            password: parentPassword,
            type: "PARENT",
            email: parentEmailAddress,
            dob: "",
            parentEmail: parentEmailAddress,
          }),
        });
        const responseChild = await fetch(USER_REGISTER, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: childUserName,
            password: childPassword,
            type: "CHILD",
            email: parentEmailAddress,
            dob: childDOB,
            parentEmail: parentEmailAddress,
          }),
        });
        if (responseChild.ok === true && responseParent.ok === true) {
          alert("ලියාපදිංචි වීම සාර්ථකයි!");
          navigationSignIn();
        } else {
          alert("ලියාපදිංචි වීම අසාර්ථකයි!");
        }
      } catch (error) {
      }
    };
    const signUpFunctions = () => {
      if (childUserName === null) {
        alert("කරුණාකර ළමා පරිශීලක නාමය ඇතුලත් කරන්න");
      } else {
        if (childDOB === null) {
          alert("කරුණාකර දරුවාගේ උපන් දිනය තෝරන්න");
        } else {
          if (childPassword === null) {
            alert("කරුණාකර ළමා මුරපදය ඇතුළත් කරන්න");
          } else {
            if (parentUserName === null) {
              alert("කරුණාකර මාපිය පරිශීලක නාමය ඇතුලත් කරන්න");
            } else {
              if (parentEmailAddress === null) {
                alert("කරුණාකර මාපිය විද්‍යුත් තැපෑල ඇතුලත් කරන්න");
              } else {
                if (parentPassword === null) {
                  alert("කරුණාකර මාපිය මුරපදය ඇතුළත් කරන්න");
                } else {
                  userRegister();
                }
              }
            }
          }
        }
      }
    };


    return (
      <KeyboardAwareScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[{ height: SCREEN_HEIGHT }]}>
          <View style={[Theme.container, Theme.bgWhite]}>
            <ImageBackground
              imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
              style={[Theme.w100, Theme.h100, Theme.justAlign]}
              source={require("../assets/img/bgTemp.jpg")}>

              <View style={[Theme.w80, Theme.h20, Theme.justAlign]}>
                <Image
                  source={require("../assets/img/logo-tp.png")}
                  style={[Theme.w110, Theme.h110]}
                  resizeMode="contain"
                />
              </View>

              <View style={[Theme.w78, Theme.h5, Theme.justifyCenter]}>
                <Text style={[themeColorArray, Theme.f18, Theme.fBold]}>
                  ළමායාගේ තොරතුරු
                </Text>
              </View>
              <View style={[Theme.h2]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  onChangeData={e => setChildUserName(e)}
                  valueData={childUserName}
                  placeHolder={"නම"}
                />
              </View>
              <View style={[Theme.h1]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <DatePicker
                  modal
                  mode={"date"}
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    confirmDateTime();
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  valueData={childDOB}
                  onPressIn={() => setOpen(true)}
                  placeHolder={"උපන් දිනය"}
                />
              </View>
              <View style={[Theme.h1]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  onChangeData={e => setChildPassword(e)}
                  valueData={childPassword}
                  secureText={true}
                  placeHolder={"මුරපදය"}
                />
              </View>
              <View style={[Theme.h2]} />

              <View style={[Theme.w78, Theme.h7, Theme.justifyCenter]}>
                <Text style={[themeColorArray, Theme.f18, Theme.fBold]}>
                  දෙමාපියන්ගේ තොරතුරු
                </Text>
              </View>
              <View style={[Theme.h1]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  onChangeData={e => setParentUserName(e)}
                  valueData={parentUserName}
                  placeHolder={"නම"}
                />
              </View>
              <View style={[Theme.h1]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  onChangeData={e => setParentEmailAddress(e)}
                  valueData={parentEmailAddress}
                  placeHolder={"විද්‍යුත් තැපැල් ලිපිනය "}
                />
              </View>
              <View style={[Theme.h1]} />
              <View style={[Theme.w80, Theme.h6, Theme.justAlign]}>
                <AxTextField
                  customColor={themeColor}
                  txtStyle={themeColorArray}
                  secureText={true}
                  onChangeData={e => setParentPassword(e)}
                  valueData={parentPassword}
                  placeHolder={"මුරපදය"}
                />
              </View>
              <View style={[Theme.h3]} />
              <View style={[Theme.w80, Theme.h6]}>
                <AxButton
                  customColor={themeBgColor}
                  ButtonName={"ලියාපදිංචි වන්න"}
                  onPressButton={signUpFunctions} />
              </View>
              <View style={[Theme.w80, Theme.h5, Theme.justAlign, Theme.flexDirRow]}>
                <Text style={[Theme.f15, Theme.fWhite]}>
                  දැනටමත් ගිණුමක් තිබේද?
                </Text>
                <TouchableOpacity style={[Theme.ml2]} onPress={navigationSignIn}>
                  <Text style={[Theme.f15, themeColorArray, Theme.fBold]}>
                    ගිණුමට ඇතුළු වන්න
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[Theme.h8]} />
            </ImageBackground>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
;

export default SignUpScreen;

