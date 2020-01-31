import { Formik } from "formik";
import _ from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet, Alert } from "react-native";
import fetch from "react-native-fetch-polyfill";
import SafeAreaView from "react-native-safe-area-view";
import { DatePicker } from "react-native-urbi-ui/components/form/DatePicker";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { SavedDataContext, StackProp } from "src/App";
import { appLocaleShort, i18n } from "src/i18n";
import { ValidationFormData } from "src/models";
import { callNoSoonerThanSecondsFrom, log } from "src/utils";
import {
  createKeystore,
  generateNewKeystore,
  sign,
  UrbiKeyStore
} from "src/utils/cryptoUtils";
import { serializeToJson } from "src/utils/jsonUtils";
import SecureStore from "src/utils/SecureStore";
import { differenceInSeconds } from "date-fns";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  button: { margin: 30 }
});

const ValidationDrivingLicenseForm = (
  props: StackProp<"ValidationDrivingLicenseForm">
) => {
  const { setHasSavedData } = useContext(SavedDataContext);
  const [scrollViewAnchor, setScrollViewAnchor] = useState(0);
  const [validationFormData, setValidationFormData] = useState(
    props.route.params.validationFormData
  );
  const scrollView = useRef<ScrollView>(null);

  useEffect(() => {
    setValidationFormData(props.route.params.validationFormData);
    log(props.route.params.validationFormData);
  }, [validationFormData]);

  const withNonce = (submitted: ValidationFormData) => {
    submitted.nonce = _.random(1000000, 100000000).toString();
    return submitted;
  };

  const onLayout = (e: LayoutChangeEvent) =>
    setScrollViewAnchor(e.nativeEvent.layout.y);

  const loadKeyStore = async () => {
    const creds = await SecureStore.getItemAsync("keystore");

    let keystore: UrbiKeyStore | undefined;

    if (creds) {
      log("keystore found");
      const parsed = JSON.parse(creds);
      if (parsed.mnemonic && parsed.password) {
        const ksStart = new Date();
        keystore = await createKeystore(parsed.mnemonic, parsed.password);
        log(
          `keystore recovery took ${differenceInSeconds(
            new Date(),
            ksStart
          )} seconds`
        );
      } else {
        log(
          `Bad keystore format: mnemonic ${
            parsed.mnemonic ? "" : "NOT "
          }set, password ${parsed.password ? "" : "NOT "}set`
        );
        log(JSON.stringify(parsed, null, 2));
      }
    }

    if (!keystore) {
      log("KeyStore NOT found, or bad format. Generating...");
      const generateStart = new Date();
      keystore = await generateNewKeystore();
      log(
        `keystore generation took ${differenceInSeconds(
          new Date(),
          generateStart
        )} seconds`
      );
    }

    return keystore;
  };

  const onSubmit = async (submitted: ValidationFormData) => {
    const { navigation } = props;

    navigation.navigate("Loading", {
      label: i18n("recoveringKeystore")
    });

    const keystore = await loadKeyStore();

    if (!keystore) {
      Alert.alert("Couldn't recover keystore, please restart the app.");
      return;
    }

    const sortedAndSerialized = serializeToJson(withNonce(submitted));

    await SecureStore.setItemAsync("user", sortedAndSerialized);
    log(submitted);

    navigation.navigate("Loading", {
      label: i18n("contactingCA")
    });

    const started = new Date();

    try {
      const r = await fetch("http://192.168.2.167:8080/validate", {
        method: "POST",
        timeout: 5000,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: keystore.address,
          signature: sign(keystore, sortedAndSerialized),
          payload: submitted
        })
      });

      log("Done?");
      const response = await r.json();
      log(response);
      setHasSavedData(true);
      callNoSoonerThanSecondsFrom(2, started, () => {
        navigation.navigate("ValidationDrivingLicenseForm"); // hide overlay
        navigation.reset({ index: 0, routes: [{ name: "ProfileHome" }] });
      });
    } catch (e) {
      callNoSoonerThanSecondsFrom(2, started, () => {
        navigation.navigate("ValidationDrivingLicenseForm");
        Alert.alert("Something went wrong", e.toString ? e.toString() : e);
      });
    }
  };

  const renderForm = (p: UrbiFormProps) => (
    <UrbiForm
      {...p}
      handleSubmit={p.handleSubmit}
      parentScrollView={scrollView}
      scrollViewAnchor={scrollViewAnchor}
      autoScroll
    >
      <ListItemTextInput
        name="drivingLicense.number"
        label={i18n("dl_number")}
        type="text"
        focusable
      />
      <DatePicker
        name="drivingLicense.issueDate"
        label={i18n("dl_issueDate")}
        mode="date"
        locale={appLocaleShort}
        focusable
      />
      <DatePicker
        name="drivingLicense.expiryDate"
        label={i18n("dl_expiryDate")}
        mode="date"
        locale={appLocaleShort}
        focusable
      />
      <ButtonRegular
        style={styles.button}
        buttonStyle="primary"
        label={i18n("submit")}
        onPress={p.handleSubmit}
      />
    </UrbiForm>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        ref={scrollView}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        onLayout={onLayout}
      >
        <Formik initialValues={validationFormData} onSubmit={onSubmit}>
          {renderForm}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ValidationDrivingLicenseForm);
