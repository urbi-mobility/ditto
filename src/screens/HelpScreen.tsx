import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";
import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, TextInput, ScrollView, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import Accordion from "src/Accordion";
import { i18n } from "src/i18n";
import { Locale } from "src/i18n/en";
import { generateNewKeystore } from "src/utils/cryptoUtils";
import { showLongAlert } from "react-native-urbi-ui/utils/functions";
import SecureStore from "src/utils/SecureStore";
import { StackProp } from "src/App";
import { differenceInSeconds } from "date-fns";

const sectionIds = ["howDoesItWork", "whyBlockchain", "anythingMissing"];

const sections = sectionIds.map(i => ({
  title: i18n(`help_${i}Title` as keyof Locale),
  content: i18n(`help_${i}Body` as keyof Locale)
}));

export const HelpScreen = (props: StackProp<"HelpHome">) => {
  const [loading, setLoading] = useState(false);
  const [twelveWords, setTwelveWords] = useState("");
  const [address, setAddress] = useState("");

  const onGeneratePress = async () => {
    const keystore = await SecureStore.getItemAsync("keystore");
    keystore ? showWarningModal(() => generateKeystore()) : generateKeystore();
  };

  const showWarningModal = (callback: () => any) => {
    props.navigation.navigate("ModalScreen", {
      image: require("../../assets/key.png"),
      text: i18n("overwriteKeystoreWarningText"),
      title: i18n("overwriteKeystoreWarningTitle"),
      labelRight: i18n("ok"),
      onButtonRightPress: callback
    });
  };

  const generateKeystore = () => {
    setLoading(true);
    props.navigation.navigate("Loading", {
      label: "Generating a new keystore..."
    });

    requestAnimationFrame(async () => {
      const started = new Date();
      const urbiKeyStore = await generateNewKeystore();
      const updateUI = () => {
        const { address, mnemonic } = urbiKeyStore;
        setAddress(address);
        setTwelveWords(mnemonic);
        setLoading(false);
        props.navigation.navigate("HelpHome");
      };
      if (differenceInSeconds(started, new Date()) < 2) {
        setTimeout(updateUI, 2000);
      } else {
        updateUI();
      }
    });
  };

  const onResetPress = () => {
    AsyncStorage.removeItem("onboarding");
    SecureStore.deleteItemAsync("keystore");
    setAddress("");
    setTwelveWords("");
    showLongAlert("Reload the app to see the onboarding again!");
  };

  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView>
          <Accordion sections={sections} />
          <View style={styles.buttonContainer}>
            <ButtonRegular
              buttonStyle="primary"
              style={styles.button}
              label="Generate a keystore!"
              onPress={onGeneratePress}
              loading={loading}
            />
            <ButtonRegular
              buttonStyle="brand"
              style={styles.button}
              label="Reset onboarding"
              onPress={onResetPress}
            />
          </View>
          {twelveWords ? (
            <View style={styles.sections}>
              <SectionsDivider label="Mnemonic" />
              <TextInput
                style={[textStyle, styles.withPadding]}
                editable={false}
                multiline
              >
                {twelveWords}
              </TextInput>
            </View>
          ) : (
            undefined
          )}
          {address ? (
            <View style={styles.sections}>
              <SectionsDivider label="Address" />
              <TextInput
                style={[textStyle, styles.withPadding]}
                editable={false}
                multiline
              >
                {address}
              </TextInput>
            </View>
          ) : (
            undefined
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

HelpScreen.navigationOptions = {
  headerTitle: i18n("navigation_faq")
};

const textStyle = registeredTextStyle("micro");

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "flex-start" },
  sections: { flexGrow: 0, flexShrink: 0 },
  withPadding: { flexGrow: 1, flexShrink: 0, padding: 20 },
  buttonContainer: { height: 200, padding: 20 },
  button: { marginTop: 20 }
});
