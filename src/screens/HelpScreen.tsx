import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

export const HelpScreenUnmemoized = () => (
  <View style={styles.Wrapper}>
    <Text>hlep lol</Text>
  </View>
);

HelpScreenUnmemoized.navigationOptions = {
  headerTitle: "Help"
};

export const HelpScreen = React.memo(HelpScreenUnmemoized);
