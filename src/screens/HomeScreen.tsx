import React, { useState } from "react";
import { StatusBar, SafeAreaView, Text, StyleSheet, View } from "react-native";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import ButtonRegular from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import SectionsDivider from "react-native-urbi-ui/molecules/SectionsDivider";
import { generateNewKeystore } from "src/utils/cryptoUtils";
import { colors } from "react-native-urbi-ui/utils/colors";

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
            <Text style={[textStyle, styles.withPadding]}>{twelveWords}</Text>
          </View>
        ) : (
          undefined
        )}
        {address ? (
          <View style={styles.wrapper}>
            <SectionsDivider label="Address" />
            <Text style={[textStyle, styles.withPadding]}>{address}</Text>
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
