import React from "react";
import { Image, StyleSheet, View, ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";

//import themes ----------------------------------------------------------------
import AxTheme from "ax-theme";
import Theme from "../assets/theme/AxTheme";

const LoadingScreen = () => {

  return (
    <View style={[AxTheme.container, AxTheme.bgWhite]}>
      {/*<ImageBackground*/}
      {/*  imageStyle={[Theme.w100, Theme.h100, Theme.justAlign]}*/}
      {/*  style={[Theme.w100, Theme.h100, Theme.justAlign]}*/}
      {/*  source={require("../assets/img/bgTemp.jpg")}>*/}
        <View style={[AxTheme.w90, AxTheme.h30]} />
        <View style={[AxTheme.w100, AxTheme.h40, AxTheme.justifyCenter, AxTheme.alignItemCenter]}>
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            direction="alternate-reverse">
            <Image
              source={require("../assets/img/logo-tp.png")}
              style={[styles.logo]}
            />
          </Animatable.View>
        </View>
        <View style={[AxTheme.w90, AxTheme.h30, AxTheme.justAlign]} />
      {/*</ImageBackground>*/}
    </View>
  );
};


const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
