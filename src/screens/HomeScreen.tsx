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
import { generateNewKeystore } from "src/utils/cryptoUtils";

export const HomeScreen = () => {
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
        <View style={styles.withPadding}>
          <Text style={titleStyle}>Navigation works, too! 🎉</Text>
          <ButtonRegular
            buttonStyle="primary"
            style={styles.button}
            label="Generate a keystore!"
            onPress={onButtonPress}
            loading={loading}
          />
        </View>
        {twelveWords ? (
          <View style={styles.wrapper}>
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
          <View style={styles.wrapper}>
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

HomeScreen.navigationOptions = {
  headerTitle: "Success"
};

const titleStyle = registeredTextStyle("title");
const textStyle = registeredTextStyle("micro");

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "flex-start" },
  withPadding: { flex: 1, padding: 20 },
  button: { marginTop: 20 }
});
