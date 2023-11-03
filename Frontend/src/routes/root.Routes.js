import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../screens/Loading.Screen";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "../screens/SignIn.Screen";
import SignUpScreen from "../screens/SignUp.Screen";
import ChildHomeScreen from "../screens/ChildHome.Screen";
import ParentHomeScreen from "../screens/ParentHome.Screen";
import ChildFaceScreen from "../screens/child/ChildFace.Screen";
import ChildVoiceScreen from "../screens/child/ChildVoice.Screen";
import ChildWriteLetterScreen from "../screens/child/ChildWriteLetter.Screen";
import ParentFaceScreen from "../screens/parent/ParentFace.Screen";
import ParentGameScreen from "../screens/parent/ParentGame.Screen";
import ParentVoiceScreen from "../screens/parent/ParentVoice.Screen";
import ParentLetterScreen from "../screens/parent/ParentLetter.Screen";
import PerformanceScreen from "../screens/parent/Performance.Screen";
import ChildGameScreen from "../screens/child/ChildGame.Screen";
import Level1GameScreen from "../screens/child/game/Level1Game.Screen";
import Level2GameScreen from "../screens/child/game/Level2Game.Screen";
import Level3GameScreen from "../screens/child/game/Level3GameScreen";
import Level5GameScreen from "../screens/child/game/Level5GameScreen";
import Level4GameScreen from "../screens/child/game/Level4GameScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootRoutes = () => {

  const Stack = createStackNavigator();

  const [isLoading, setIsLoading] = useState(true);
  const [isLaunch, setIsLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("asyncUserType").then(value => {
      if (value === "CHILD") {
        setIsLaunch("CHILD");
      } else {
        if (value === "PARENT") {
          setIsLaunch("PARENT");
        } else {
          setIsLaunch(true);
        }
      }
    });

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };

  }, []);
  if (isLaunch === true) {
    return (
      isLoading ? <LoadingScreen /> : (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            shifting="true"
            screenOptions={() => ({
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: false,
              gestureDirection: "horizontal",
            })}
          >
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="ChildHomeScreen" component={ChildHomeScreen} />
            <Stack.Screen name="ParentHomeScreen" component={ParentHomeScreen} />
            <Stack.Screen name="ChildFaceScreen" component={ChildFaceScreen} />
            <Stack.Screen name="ChildGameScreen" component={ChildGameScreen} />
            <Stack.Screen name="ChildVoiceScreen" component={ChildVoiceScreen} />
            <Stack.Screen name="ChildWriteLetterScreen" component={ChildWriteLetterScreen} />
            <Stack.Screen name="ParentFaceScreen" component={ParentFaceScreen} />
            <Stack.Screen name="ParentGameScreen" component={ParentGameScreen} />
            <Stack.Screen name="ParentVoiceScreen" component={ParentVoiceScreen} />
            <Stack.Screen name="ParentLetterScreen" component={ParentLetterScreen} />
            <Stack.Screen name="PerformanceScreen" component={PerformanceScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="Level1GameScreen" component={Level1GameScreen} />
            <Stack.Screen name="Level2GameScreen" component={Level2GameScreen} />
            <Stack.Screen name="Level3GameScreen" component={Level3GameScreen} />
            <Stack.Screen name="Level4GameScreen" component={Level4GameScreen} />
            <Stack.Screen name="Level5GameScreen" component={Level5GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    );
  } else if (isLaunch === "CHILD") {
    return (
      isLoading ? <LoadingScreen /> : (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            shifting="true"
            screenOptions={() => ({
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: false,
              gestureDirection: "horizontal",
            })}
          >
            <Stack.Screen name="ChildHomeScreen" component={ChildHomeScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="ParentHomeScreen" component={ParentHomeScreen} />
            <Stack.Screen name="ChildFaceScreen" component={ChildFaceScreen} />
            <Stack.Screen name="ChildGameScreen" component={ChildGameScreen} />
            <Stack.Screen name="ChildVoiceScreen" component={ChildVoiceScreen} />
            <Stack.Screen name="ChildWriteLetterScreen" component={ChildWriteLetterScreen} />
            <Stack.Screen name="ParentFaceScreen" component={ParentFaceScreen} />
            <Stack.Screen name="ParentGameScreen" component={ParentGameScreen} />
            <Stack.Screen name="ParentVoiceScreen" component={ParentVoiceScreen} />
            <Stack.Screen name="ParentLetterScreen" component={ParentLetterScreen} />
            <Stack.Screen name="PerformanceScreen" component={PerformanceScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="Level1GameScreen" component={Level1GameScreen} />
            <Stack.Screen name="Level2GameScreen" component={Level2GameScreen} />
            <Stack.Screen name="Level3GameScreen" component={Level3GameScreen} />
            <Stack.Screen name="Level4GameScreen" component={Level4GameScreen} />
            <Stack.Screen name="Level5GameScreen" component={Level5GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    );
  } else {
    return (
      isLoading ? <LoadingScreen /> : (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            shifting="true"
            screenOptions={() => ({
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: false,
              gestureDirection: "horizontal",
            })}
          >
            <Stack.Screen name="ParentHomeScreen" component={ParentHomeScreen} />
            <Stack.Screen name="ChildHomeScreen" component={ChildHomeScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ChildFaceScreen" component={ChildFaceScreen} />
            <Stack.Screen name="ChildGameScreen" component={ChildGameScreen} />
            <Stack.Screen name="ChildVoiceScreen" component={ChildVoiceScreen} />
            <Stack.Screen name="ChildWriteLetterScreen" component={ChildWriteLetterScreen} />
            <Stack.Screen name="ParentFaceScreen" component={ParentFaceScreen} />
            <Stack.Screen name="ParentGameScreen" component={ParentGameScreen} />
            <Stack.Screen name="ParentVoiceScreen" component={ParentVoiceScreen} />
            <Stack.Screen name="ParentLetterScreen" component={ParentLetterScreen} />
            <Stack.Screen name="PerformanceScreen" component={PerformanceScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="Level1GameScreen" component={Level1GameScreen} />
            <Stack.Screen name="Level2GameScreen" component={Level2GameScreen} />
            <Stack.Screen name="Level3GameScreen" component={Level3GameScreen} />
            <Stack.Screen name="Level4GameScreen" component={Level4GameScreen} />
            <Stack.Screen name="Level5GameScreen" component={Level5GameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    );
  }
};

export default RootRoutes;
