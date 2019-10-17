import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

export const ProfileScreenUnmemoized = () => (
  <View style={styles.Wrapper}>
    <Text>Profile</Text>
  </View>
);

ProfileScreenUnmemoized.navigationOptions = {
  headerTitle: "Profile"
};

export const ProfileScreen = React.memo(ProfileScreenUnmemoized);
