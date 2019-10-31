import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { i18n } from "src/i18n";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

export const ProfileScreen = () => (
  <View style={styles.Wrapper}>
    <Text>Profile</Text>
  </View>
);

const name = ""; // TODO load it from local storage

ProfileScreen.navigationOptions = {
  headerTitle: i18n("navigation_profile", { name })
};
