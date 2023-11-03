import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Theme from "../assets/theme/AxTheme";

function AxButton({ onPressButton, ButtonName, customColor }) {

  const backgroundColor = customColor || Theme.bgMain0;

  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={[
        Theme.w100,
        Theme.h100,
        Theme.container,
        Theme.borderRadius40,
        backgroundColor,
      ]}
    >
      <Text style={[Theme.fWhite, Theme.f17, Theme.fBold]}> {ButtonName} </Text>
    </TouchableOpacity>
  );
}

export default AxButton;
