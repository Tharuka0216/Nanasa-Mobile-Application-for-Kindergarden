import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Theme from "../assets/theme/AxTheme";

const AxMenuCard = ({ CARD_TITLE, CARD_IMG, ON_PRESS, STYLE, FONT_STYLE, CARD_BORDER }) => {
  return (
    <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
      <View style={[Theme.w100, Theme.h25, Theme.justAlign]}>
        <Text style={[ FONT_STYLE, Theme.fBold, Theme.f17]}>
          {CARD_TITLE}
        </Text>
      </View>
      <View style={[Theme.w100, Theme.h75, Theme.justAlign]}>
        <TouchableOpacity
          onPress={ON_PRESS}
          style={[CARD_BORDER, Theme.w70, Theme.h90, Theme.justAlign, Theme.bgWhite, Theme.themeBorder1_5, Theme.elevation8, Theme.borderRadius20]}>
          <Image
            source={CARD_IMG}
            style={[Theme.w55, Theme.h55, STYLE]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AxMenuCard;
