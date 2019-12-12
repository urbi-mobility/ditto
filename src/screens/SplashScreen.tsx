import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "react-native-urbi-ui/utils/colors";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";

const styles = StyleSheet.create({
  Loading: {
    flex: 1,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignContent: "center"
  },
  LoadingText: {
    ...registeredTextStyle("hero", colors.ulisse, "splash"),
    textAlign: "center"
  },
  OnboardingWrapper: {
    flex: 1,
    backgroundColor: colors.ulisse
  }
});

export const SplashScreen = () => (
  <View style={styles.Loading}>
    <Text style={styles.LoadingText}>SPLASH SCREEN{"\n"}🦄</Text>
  </View>
);
