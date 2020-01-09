import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { RootStackProp } from "src/App";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

const ConsentScreenUnmemoized = (props: RootStackProp<"Consent">) => (
  <View style={styles.Wrapper}>
    <Text>
      provider: {props.route.params.provider}, callback:{" "}
      {props.route.params.callbackUrl}, challenge:{" "}
      {props.route.params.challenge}, fields:{" "}
      {props.route.params.fields?.join(", ")}
    </Text>
  </View>
);

export const ConsentScreen = React.memo(ConsentScreenUnmemoized);
