import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import Theme from "../../../assets/theme/AxTheme";
import AxButton from "../../../components/AxButton";
import { useNavigation } from "@react-navigation/native";
import { GAME_SAVE_API } from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cardData = [
  { id: 1, framework: "lion", frontImage: require("../../../assets/icons/lion.png") },
  { id: 3, framework: "dog", frontImage: require("../../../assets/icons/dog.png") },
  { id: 2, framework: "lion", frontImage: require("../../../assets/icons/lion.png") },
  { id: 5, framework: "monkey", frontImage: require("../../../assets/icons/monkey.png") },
  { id: 4, framework: "dog", frontImage: require("../../../assets/icons/dog.png") },
  { id: 6, framework: "monkey", frontImage: require("../../../assets/icons/monkey.png") },
  { id: 7, framework: "giraffe", frontImage: require("../../../assets/icons/giraffe.png") },
  { id: 8, framework: "giraffe", frontImage: require("../../../assets/icons/giraffe.png") },
  { id: 8, framework: "rabbit", frontImage: require("../../../assets/icons/rabbit.png") },
  { id: 8, framework: "rabbit", frontImage: require("../../../assets/icons/rabbit.png") },
  { id: 9, framework: "wolf", frontImage: require("../../../assets/icons/wolf.png") },
  { id: 10, framework: "wolf", frontImage: require("../../../assets/icons/wolf.png") },
  { id: 11, framework: "elephant", frontImage: require("../../../assets/icons/elephant.png") },
  { id: 12, framework: "elephant", frontImage: require("../../../assets/icons/elephant.png") },
  { id: 13, framework: "cat", frontImage: require("../../../assets/icons/cat.png") },
  { id: 14, framework: "cat", frontImage: require("../../../assets/icons/cat.png") },
];

const Level4GameScreen = () => {

  const useNavigate = useNavigation();
  useEffect(() => {
    getEmotionValue();
  }, []);
  useEffect(() => {
    shuffleCards();
  }, []);

  const [themeColor, setThemeColor] = useState("#26ACE2");
  const [themeBgColor, setThemeBgColor] = useState([Theme.themeBgBlue]);
  const [themeColorArray, setThemeColorArray] = useState([Theme.themeColorBlue, Theme.themeBorderBlue]);

  const [cards, setCards] = useState(cardData);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);

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
  const shuffleCards = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };
  const handleCardPress = (index) => {
    if (elapsedTime === 0) {
      Alert.alert("Warning!", "Please Start Time!");
    } else {
      if (flippedIndices.length === 2 || flippedIndices.includes(index)) return;
      const newFlippedIndices = [...flippedIndices, index];
      setFlippedIndices(newFlippedIndices);
      setClickCount(clickCount + 1);
      if (newFlippedIndices.length === 2) {
        const [firstIndex, secondIndex] = newFlippedIndices;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];
        if (firstCard.framework === secondCard.framework) {
          setMatchedPairs([...matchedPairs, firstCard.framework]);
          if (matchedPairs.length === cardData.length / 2 - 1) {
            setIsTimerRunning(false);
            setTimeout(() =>
              Alert.alert(
                "Next Level",
                "Are you sure you want to continue?",
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      navigateGame();
                    },
                  },
                ],
                { cancelable: false },
              ), 500);
          }
        }
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      if (startTime === 0) {
        setStartTime(Date.now());
      }
      intervalId = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, startTime]);

  const replay = () => {
    setIsTimerRunning(false);
    setElapsedTime(0);
    setClickCount(0);
    shuffleCards();
    setMatchedPairs([]);
    setFlippedIndices([]);
  };
  const startTimer = () => {
    setStartTime(0);
    setIsTimerRunning(true);
  };
  const stopTimer = () => {
    setIsTimerRunning(false);
  };
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const commonNavigationLevel1 = () => {
    useNavigate.navigate("Level1GameScreen");
  };

  const commonNavigationLevel2 = () => {
    useNavigate.navigate("Level2GameScreen");
  };

  const commonNavigationLevel3 = () => {
    useNavigate.navigate("Level3GameScreen");
  };
  const commonNavigationLevel4 = () => {
    useNavigate.navigate("Level4GameScreen");
  };
  const commonNavigationLevel5 = () => {
    useNavigate.navigate("Level5GameScreen");
  };

  const navigateGame = () => {
    AsyncStorage.getItem("asyncChildUserName")
      .then((username) => {
        if (username !== null) {
          const durationTime = Math.floor(elapsedTime/1000);
          try {
            fetch(GAME_SAVE_API, {
              method: "POST",
              body: JSON.stringify({
                "username": username,
                "level": 4,
                "duration": durationTime,
                "stepCount": clickCount,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }).then((response) => response.json())
              .then((data) => {
                const nextLevel = data.nextLevel;
                if (nextLevel === 1) {
                  Alert.alert("Completed", "Your Promoted Level 1");
                  commonNavigationLevel1();
                } else {
                  if (nextLevel === 2) {
                    Alert.alert("Completed", "Your Promoted Level 2");
                    commonNavigationLevel2();
                  } else {
                    if (nextLevel === 3) {
                      Alert.alert("Completed", "Your Promoted Level 3");
                      commonNavigationLevel3();
                    } else {
                      if (nextLevel === 4) {
                        Alert.alert("Completed", "Please Play Again");
                        replay();
                      } else {
                        if (nextLevel === 5) {
                          Alert.alert("Completed", "Your Promoted Level 5");
                          commonNavigationLevel5();
                        } else {
                          Alert.alert("Error", "" + levelNumber);
                        }
                      }
                    }
                  }
                }

              })
              .catch((error) => {
                console.error("Upload error", error);
              });
          } catch (e) {
          }
        } else {
          Alert.alert("", "No Username");
        }
      });
  };

  return (
    <View style={[Theme.container, Theme.bgWhite, Theme.w100, Theme.h100]}>
      <ImageBackground
        imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}
        style={[Theme.w100, Theme.h100, Theme.justAlign]}
        source={require("../../../assets/img/bgTemp.jpg")}>
        <View style={[Theme.w100, Theme.h7, themeBgColor, Theme.flexDirRow, Theme.justAlign]}>
          <Text style={[Theme.fBold, Theme.f20, Theme.fWhite, Theme.ml2]}>
            ක්‍රීඩා මට්ටම - 04
          </Text>
        </View>
        <View style={[Theme.w100, Theme.h93, Theme.justAlign, Theme.bgTransparent]}>
          <View style={[Theme.w90, Theme.h5, Theme.bgTransparent, Theme.justAlign]}>
            <Text style={[styles.timeText2, themeColorArray]}>සම්පූර්ණ ක්ලික් ගණන : {clickCount} </Text>
          </View>
          <View style={[Theme.h2]} />
          <View style={[Theme.w90, Theme.h5, Theme.bgTransparent, Theme.justAlign]}>
            <Text style={[styles.timeText, themeColorArray]}>{formatTime(elapsedTime)}</Text>
          </View>
          <View style={[Theme.h2]} />
          <View style={[Theme.w75, Theme.h7, Theme.justAlign, Theme.flexDirRow]}>

            <View style={[Theme.w48, Theme.h90, Theme.justAlign]}>
              <AxButton
                customColor={themeBgColor}
                ButtonName={"අරඔන්න"}
                onPressButton={startTimer} />
            </View>

            <View style={[Theme.w2]} />

            <View style={[Theme.w48, Theme.h90, Theme.justAlign]}>
              <AxButton
                customColor={themeBgColor}
                ButtonName={"නවත්වන්න"}
                onPressButton={stopTimer} />
            </View>

          </View>
          <View style={[Theme.h2]} />
          <View style={[Theme.w90, Theme.h63, Theme.justAlign]}>
            <ScrollView contentContainerStyle={styles.container}>
              {cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCardPress(index)}
                  style={[
                    themeColorArray,
                    Theme.borderRadius20,
                    Theme.elevation8,
                    Theme.themeWidth2Radius15,
                    styles.card,
                    { transform: flippedIndices.includes(index) ? [{ scaleX: -1 }] : [] },
                  ]}
                  disabled={flippedIndices.length === 2 || flippedIndices.includes(index)}
                >
                  <Image
                    source={flippedIndices.includes(index) || matchedPairs.includes(card.framework) ? card.frontImage : require("../../../assets/icons/photo.png")}
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={[Theme.h2]} />
          <View style={[Theme.w75, Theme.h7, Theme.justAlign, Theme.flexDirRow]}>
            <AxButton
              customColor={themeBgColor}
              ButtonName={"නැවත උත්සහ කරමු"}
              onPressButton={replay} />
          </View>

        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontSize: 30,
  },
  timeText2: {
    fontSize: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 75,
    height: 75,
    margin: 5,
    backgroundColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
  },
});

export default Level4GameScreen;
