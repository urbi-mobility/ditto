import React from "react";
import { StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ScrollView } from "react-native";
import { colors } from "react-native-urbi-ui/utils/colors";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { Formik } from "formik";
import { sign, createKeystore, UrbiKeyStore } from "../../utils/cryptoUtils";
import * as Keychain from "react-native-keychain";
import { serializeToJson } from "src/utils/jsonUtils";
import _ from "lodash";
import { ValidationFormData } from "src/models";
import { NavigationStackScreenProps } from "react-navigation-stack";

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
          label="Driving License Information"
          backgroundColor={colors.ulisse}
        />
        <ListItemTextInput
          name="drivingLicense.number"
          label="Number"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="drivingLicense.issueDate"
          label="Issue Date"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="drivingLicense.expiryDate"
          label="Expiry Date"
          type="username"
          error=""
          focusable
        />
      </UrbiForm>
    );
  }

  render = () => (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView ref={this.scrollView}>
        <Formik
          initialValues={this.state.validationFormData}
          onSubmit={this.submit}
        >
          {this.renderForm}
        </Formik>
        <ButtonRegular
          style={styles.button}
          buttonStyle="primary"
          label="Next"
          onPress={() => this.submit(this.state.validationFormData)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ValidationDrivingLicenseForm;
