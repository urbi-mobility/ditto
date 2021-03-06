import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Onboarding } from "react-native-urbi-ui/components/Onboarding";
import { StackProp } from "src/App";
import { i18n } from "src/i18n";
import { onIphoneX } from "src/utils";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

const pages = [
  {
    title: i18n("onboarding1title"),
    content: i18n("onboarding1content"),
    image: require("../../assets/profile.png")
  },
  {
    title: i18n("onboarding2title"),
    content: i18n("onboarding2content"),
    image: require("../../assets/ic_muving_scooter.png")
  },
  {
    title: i18n("onboarding3title"),
    content: i18n("onboarding3content"),
    image: require("../../assets/license.png")
  }
];

export const OnboardingScreen = (props: StackProp<"Onboarding">) => {
  return (
    <>
      <SafeAreaView style={styles.Wrapper}>
        <View style={styles.Wrapper}>
          <Onboarding
            cta={{
              onPress: props.route.params.onDone,
              label: i18n("startValidationProcess")
            }}
            pages={pages}
            onIphoneX={onIphoneX}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

OnboardingScreen.navigationOptions = {
  header: null
};
