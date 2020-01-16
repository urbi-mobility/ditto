import { differenceInSeconds } from "date-fns";
import { Formik } from "formik";
import _ from "lodash";
import React from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet } from "react-native";
import fetch from "react-native-fetch-polyfill";
import SafeAreaView from "react-native-safe-area-view";
import { DatePicker } from "react-native-urbi-ui/components/form/DatePicker";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { StackProp } from "src/App";
import { appLocaleShort, i18n } from "src/i18n";
import { ValidationFormData } from "src/models";
import {
  createKeystore,
  generateNewKeystore,
  sign,
  UrbiKeyStore
} from "src/utils/cryptoUtils";
import { serializeToJson } from "src/utils/jsonUtils";
import SecureStore from "src/utils/SecureStore";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  button: { margin: 30 }
});

type DrivingLicenseFormState = {
  scrollViewAnchor: number;
  validationFormData: ValidationFormData;
};

class ValidationDrivingLicenseForm extends React.PureComponent<
  StackProp<"ValidationDrivingLicenseForm">,
  DrivingLicenseFormState
> {
  constructor(props: StackProp<"ValidationDrivingLicenseForm">) {
    super(props);
    this.scrollView = React.createRef();
    this.renderForm = this.renderForm.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      scrollViewAnchor: 0,
      validationFormData: props.route.params.validationFormData
    };
  }

  componentDidMount() {
    this.setState({
      validationFormData: this.props.route.params.validationFormData
    });
    console.log(this.props.route.params.validationFormData);
  }

  private scrollView: React.RefObject<ScrollView>;

  withNonce = (submitted: ValidationFormData) => {
    submitted.nonce = _.random(1000000, 100000000).toString();
    return submitted;
  };

  onLayout(e: LayoutChangeEvent) {
    this.setState({ scrollViewAnchor: e.nativeEvent.layout.y });
  }

  async loadKeyStore(
    navigation: StackProp<"ValidationDrivingLicenseForm">["navigation"]
  ) {
    const creds = await SecureStore.getItemAsync("keyStore");
    let keystore: UrbiKeyStore;

    if (creds) {
      const parsed = JSON.parse(creds);
      navigation.navigate("Loading", {
        label: i18n("recoveringKeystore")
      });
      keystore = await createKeystore(parsed.mnemonic, parsed.password);
    } else {
      navigation.navigate("Loading", {
        label: i18n("generatingKeystore")
      });
      keystore = await generateNewKeystore();

      SecureStore.setItemAsync(
        "keystore",
        JSON.stringify(_.pick(keystore, ["password", "mnemonic", "address"]))
      );
    }
    return keystore;
  }

  async onSubmit(submitted: ValidationFormData) {
    const { navigation } = this.props;
    console.log(submitted);

    const keyStore = await this.loadKeyStore(navigation);
    const sortedAndSerialized = serializeToJson(this.withNonce(submitted));

    await SecureStore.setItemAsync("user", sortedAndSerialized);

    navigation.navigate("Loading", {
      label: i18n("contactingCA")
    });

    const started = new Date();
    fetch("http://192.168.2.167:8080/validate", {
      method: "POST",
      timeout: 25000,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: keyStore.address,
        signature: sign(keyStore, sortedAndSerialized),
        payload: submitted
      })
    })
      .then(async r => {
        console.log("Done?");
        const response = await r.json();
        console.log(response);
      })
      .catch(r => {
        console.log("Error?");
        console.log(r);
      })
      .finally(() => {
        console.log("Finally");
        const hideLoadingOverlay = () =>
          navigation.navigate("ValidationDrivingLicenseForm", {
            validationFormData: submitted
          });

        if (differenceInSeconds(started, new Date()) < 2) {
          setTimeout(hideLoadingOverlay, 2000);
        } else {
          hideLoadingOverlay();
        }
      });
  }

  renderForm(p: UrbiFormProps) {
    return (
      <UrbiForm
        {...p}
        handleSubmit={p.handleSubmit}
        parentScrollView={this.scrollView}
        scrollViewAnchor={this.state.scrollViewAnchor}
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
  }

  render = () => (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        ref={this.scrollView}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        onLayout={this.onLayout}
      >
        <Formik
          initialValues={this.state.validationFormData}
          onSubmit={this.onSubmit}
        >
          {this.renderForm}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ValidationDrivingLicenseForm;
