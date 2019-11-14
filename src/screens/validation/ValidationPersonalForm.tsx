import React from "react";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { colors } from "react-native-urbi-ui/utils/colors";
import SafeAreaView from "react-native-safe-area-view";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ValidationFormData } from "src/models";
import _ from "lodash";
import { NavigationStackScreenProps } from "react-navigation-stack";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  button: { margin: 10 }
});

type ValidationPersonalFormState = {
  scrollViewAnchor: number;
  validationFormData: ValidationFormData;
};

class ValidationPersonalForm extends React.PureComponent<
  NavigationStackScreenProps,
  ValidationPersonalFormState
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

  submit = (submitted: ValidationFormData) => {
    this.props.navigation.navigate("ValidationDrivingLicenseForm", {
      validationFormData: submitted
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
          label="Personal Information"
          backgroundColor={colors.ulisse}
        />
        <ListItemTextInput
          name="firstName"
          label="First name"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="lastName"
          label="Last name"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="phoneNumber"
          label="Phone number"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="birthDate"
          label="Birth date"
          type="username"
          error=""
          focusable
        />
        <ListItemTextInput
          name="birthCountry"
          label="Birth country"
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

export default ValidationPersonalForm;
