import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import Accordion from "src/Accordion";
import { generateNewKeystore } from "src/utils/cryptoUtils";
import { i18n } from "src/i18n";
import { Locale } from "src/i18n/en";

const sectionIds = ["howDoesItWork", "whyBlockchain", "anythingMissing"];

const sections = sectionIds.map(i => ({
  title: i18n(`help_${i}Title` as keyof Locale),
  content: i18n(`help_${i}Body` as keyof Locale)
}));

export const HelpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [twelveWords, setTwelveWords] = useState("");
  const [address, setAddress] = useState("");

  const onButtonPress = () => {
    setLoading(true);
    requestAnimationFrame(async () => {
      const urbiKeyStore = await generateNewKeystore();
      const { address, mnemonic } = urbiKeyStore;
      setAddress(address);
      setTwelveWords(mnemonic);
      setLoading(false);
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.wrapper}>
        <Accordion sections={sections} />
        <View style={styles.buttonContainer}>
          <ButtonRegular
            buttonStyle="primary"
            style={styles.button}
            label="Generate a keystore!"
            onPress={onButtonPress}
            loading={loading}
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
  buttonContainer: { height: 100, padding: 20 },
  button: { marginTop: 20 }
});
