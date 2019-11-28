import { Formik } from "formik";
import _ from "lodash";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Keychain from "react-native-keychain";
import SafeAreaView from "react-native-safe-area-view";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { colors } from "react-native-urbi-ui/utils/colors";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { ValidationFormData } from "src/models";
import { createKeystore, sign } from "src/utils/cryptoUtils";
import { serializeToJson } from "src/utils/jsonUtils";
import { DatePicker } from "react-native-urbi-ui/components/form/DatePicker";
import { i18n, appLocaleShort } from "src/i18n";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  button: { margin: 10 }
});

type DrivingLicenseFormState = {
  scrollViewAnchor: number;
  validationFormData: ValidationFormData;
};

class ValidationDrivingLicenseForm extends React.PureComponent<
  NavigationStackScreenProps,
  DrivingLicenseFormState
> {
  constructor(props: NavigationStackScreenProps) {
    super(props);
    this.scrollView = React.createRef();
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      scrollViewAnchor: 0,
      validationFormData: this.props.navigation.getParam("validationFormData")
    };
  }

  private scrollView: React.RefObject<ScrollView>;

  withNonce = (submitted: ValidationFormData) => {
    submitted.nonce = _.random(1000000, 100000000).toString();
    return submitted;
  };

  loadKeyStore = async () => {
    const creds = await Keychain.getInternetCredentials("urbiKeyStore");
    const keyStore = JSON.parse(creds.password);
    return await createKeystore(keyStore.mnemonic, keyStore.password);
  };

  submit = async (submitted: ValidationFormData) => {
    console.log(submitted);
    const keyStore = await this.loadKeyStore();
    const sortedAndSerialized = serializeToJson(this.withNonce(submitted));
    fetch("http://192.168.2.167:8080/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: keyStore.address,
        signature: sign(keyStore, sortedAndSerialized),
        payload: submitted
      })
    })
      .then(r => {
        console.log("Done?");
        console.log(r.json());
      })
      .catch(r => {
        console.log("Error?");
        console.error(r);
      });
  };

  renderForm(p: UrbiFormProps) {
    return (
      <UrbiForm
        {...p}
        handleSubmit={p.handleSubmit}
        parentScrollView={this.scrollView}
        scrollViewAnchor={this.state.scrollViewAnchor}
      >
        <SectionsDivider
          label={i18n("dl_information")}
          backgroundColor={colors.ulisse}
        />
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
      </UrbiForm>
    );
  }

  render = () => (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        ref={this.scrollView}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        <Formik
          initialValues={this.state.validationFormData}
          onSubmit={this.submit}
        >
          {this.renderForm}
        </Formik>
        <ButtonRegular
          style={styles.button}
          buttonStyle="primary"
          label={i18n("next")}
          onPress={() => this.submit(this.state.validationFormData)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ValidationDrivingLicenseForm;
