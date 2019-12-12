import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { Bounce } from "react-native-animated-spinkit";
import { colors } from "react-native-urbi-ui/utils/colors";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { RootStackProp } from "src/App";

const styles = StyleSheet.create({
  Wrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 40
  } as ViewStyle,
  Label: {
    ...registeredTextStyle("title", colors.ulisse, "loading"),
    textAlign: "center",
    marginTop: 20
  }
});

const LoadingOverlayUnmemoized = (props: RootStackProp<"Loading">) => (
  <View style={styles.Wrapper}>
    <Bounce size={52} color={colors.ulisse} />
    <Text style={styles.Label}>{props.route.params.label}</Text>
  </View>
);

export const LoadingOverlay = React.memo(LoadingOverlayUnmemoized);
