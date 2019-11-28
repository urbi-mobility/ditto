import React from "react";
import { StatusBar, StyleSheet, Text, View, ViewStyle } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { StackProp } from "src/App";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1
  } as ViewStyle
});

export const OnboardingScreen = (props: StackProp<"Onboarding">) => {
  const index = props.route.params.index;
  const next = () =>
    props.navigation.navigate("Onboarding", { index: index + 1 });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.Wrapper}>
        <View style={styles.Wrapper}>
          <Text style={styles.Wrapper}>{index ? `page ${index}` : "home"}</Text>
          {index !== 2 && (
            <ButtonRegular
              buttonStyle="primary"
              label="next page"
              onPress={next}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

OnboardingScreen.navigationOptions = {
  header: null
};
