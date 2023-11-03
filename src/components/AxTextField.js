import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Theme from "../assets/theme/AxTheme";

function AxTextField({
                       placeHolder,
                       valueData,
                       customColor,
                       onChangeData,
                       onPressIn,
                       secureText,
                       keyBoardType,
                       editable,
                       txtStyle
                     }) {

  const color = customColor || "#26ACE2";

  return (
    <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
      <TextInput
        onPressIn={onPressIn}
        style={[styles.txtField, Theme.w100, Theme.h100, Theme.bgWhite, Theme.fPoppins, Theme.f15, txtStyle]}
        placeholder={placeHolder}
        placeholderTextColor={color}
        value={valueData}
        editable={editable}
        keyboardType={keyBoardType}
        onChangeText={onChangeData}
        secureTextEntry={secureText}>
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
    alphaText: {
      height: 50,
    },
    txtField: {
      borderWidth: 2,
      borderRadius: 40,
      textAlign: "left",
      backgroundColor: "rgba(255,255,255,0)",
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
  })
;

export default AxTextField;
