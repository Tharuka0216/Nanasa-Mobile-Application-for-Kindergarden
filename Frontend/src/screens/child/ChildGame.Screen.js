import React, { useEffect, useState } from "react";
import Level1GameScreen from "./game/Level1Game.Screen";
import Level3GameScreen from "./game/Level3GameScreen";
import Level2GameScreen from "./game/Level2Game.Screen";
import Level4GameScreen from "./game/Level4GameScreen";
import Level5GameScreen from "./game/Level5GameScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChildGameScreen = () => {

  const [isLaunch, setIsLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("asyncUserLevel").then(level => {
    if (level === "1") {
      setIsLaunch("1");
    } else {
      if (level === "2") {
        setIsLaunch("2");
      } else {
        if (level === "3") {
          setIsLaunch("3");
        } else {
          if (level === "4") {
            setIsLaunch("4");
          } else {
            if (level === "5") {
              setIsLaunch("5");
            } else {
              if (level === null){
                setIsLaunch("1");
              }else {
                setIsLaunch(true);
              }
            }
          }
        }
      }
    }
    });
  }, []);

  if (isLaunch === "1") {
    return (
      <Level1GameScreen />
    );
  } else if (isLaunch === "2") {
    return (
      <Level2GameScreen />
    );
  } else if (isLaunch === "3") {
    return (
      <Level3GameScreen />
    );
  } else if (isLaunch === "4") {
    return (
      <Level4GameScreen />
    );
  } else if (isLaunch === "5") {
    return (
      <Level5GameScreen />
    );
  } else {
  }
};

export default ChildGameScreen;
