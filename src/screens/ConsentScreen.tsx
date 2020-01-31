import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageRequireSource,
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SafeAreaView from "react-native-safe-area-view";
import { DoubleChoice } from "react-native-urbi-ui/components/DoubleChoice";
import { BOTTOM_PANEL_HEIGHT } from "react-native-urbi-ui/components/FloatingButtonLayout";
import { ButtonCompact } from "react-native-urbi-ui/molecules/buttons/ButtonCompact";
import { colors } from "react-native-urbi-ui/utils/colors";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { RootStackProp } from "src/App";
import { i18n } from "src/i18n";
import { SplashScreen } from "src/screens/SplashScreen";
import { log } from "src/utils";
import { createKeystore, sign, UrbiKeyStore } from "src/utils/cryptoUtils";
import SecureStore from "src/utils/SecureStore";
import { onIOS } from "react-native-urbi-ui/utils/const";

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: colors.ulisse
  },
  ProviderLogo: {
    width: 108,
    height: 108,
    marginVertical: 20,
    alignSelf: "center"
  },
  Message: {
    ...registeredTextStyle("title", colors.uma, "message"),
    paddingHorizontal: 24,
    textAlign: "center"
  },
  BottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  ButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: BOTTOM_PANEL_HEIGHT
  }
});

const providerImages: { [provider: string]: ImageRequireSource } = {
  miles: require("../../assets/ic_driveby.png"),
  default: require("../../assets/profile.png")
};

const providerNames: { [provider: string]: string } = {
  miles: "Miles"
};

const gradientColors = [colors.zeroAlphaUlisse, colors.ulisse];

const loadKeyStore = async () => {
  const creds = await SecureStore.getItemAsync("keystore");
  let keystore: UrbiKeyStore | undefined;

  if (creds) {
    const parsed = JSON.parse(creds);
    keystore = await createKeystore(parsed.mnemonic, parsed.password);
  }

  return keystore;
};

const ConsentScreenUnmemoized = (props: RootStackProp<"Consent">) => {
  const [showSplash, setShowSplash] = useState(true);
  const { params } = props.route;
  const provider = params.provider ?? "default";
  const providerName = providerNames[provider] ?? provider;
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 1000);
  }, []);

  const openApp = (
    provider: string,
    callbackUrl: string,
    consent: boolean,
    payload?: string,
    challenge?: string
  ) => async () => {
    try {
      let challengeResponse = "";
      if (challenge) {
        navigation.navigate("Loading", {
          label: i18n("signingData")
        });

        const keystore = await loadKeyStore();
        if (keystore) {
          challengeResponse = encodeURIComponent(sign(keystore, challenge));
        }
      }
      const url = `${callbackUrl}?consent=${consent}&payload=${payload}${
        challengeResponse ? `&response=${challengeResponse}` : ""
      }`;
      log(`callback deep link: ${url}`);
      await Linking.openURL(url);
      navigation.navigate("Home");
    } catch (err) {
      const onDialogDismiss = () => {
        navigation.navigate("Main");
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      };

      Alert.alert(
        i18n("somethingWentWrong"),
        i18n("consentCallbackFailed", { providerName: provider }),
        [
          {
            text: "Ok",
            onPress: onDialogDismiss
          }
        ],
        {
          onDismiss: onDialogDismiss
        }
      );
      if (onIOS) navigation.navigate("Home");
    }
  };

  const onAccept = (
    provider: string,
    callbackUrl: string,
    challenge?: string
  ) => async () => {
    const data = await SecureStore.getItemAsync("user");
    openApp(provider, callbackUrl, true, data, challenge)();
  };

  if (showSplash) return <SplashScreen />;

  return (
    <SafeAreaView style={styles.Wrapper}>
      <Image
        style={styles.ProviderLogo}
        source={providerImages[provider] ?? providerImages.default}
      />
      <Text style={styles.Message}>
        {i18n("consentMessage", { providerName })}
      </Text>

      <View style={styles.BottomPanel}>
        <LinearGradient colors={gradientColors} style={styles.ButtonsContainer}>
          <DoubleChoice
            left={
              <ButtonCompact
                buttonStyle="default"
                label={i18n("notNow")}
                onPress={openApp(providerName, params.callbackUrl, false)}
              />
            }
            right={
              <ButtonCompact
                buttonStyle="primary"
                label={i18n("allow")}
                onPress={onAccept(
                  providerName,
                  params.callbackUrl,
                  params.challenge
                )}
              />
            }
          />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export const ConsentScreen = React.memo(ConsentScreenUnmemoized);
