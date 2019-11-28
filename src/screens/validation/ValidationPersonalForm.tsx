import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { DatePicker } from "react-native-urbi-ui/components/form/DatePicker";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import UrbiForm, {
  UrbiFormProps
} from "react-native-urbi-ui/components/form/UrbiForm";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { colors } from "react-native-urbi-ui/utils/colors";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { appLocaleShort, i18n } from "src/i18n";
import { ValidationFormData } from "src/models";

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
          label={i18n("personalInformation")}
          backgroundColor={colors.ulisse}
        />
        <ListItemTextInput
          name="firstName"
          label={i18n("firstName")}
          type="text"
          focusable
        />
        <ListItemTextInput
          name="lastName"
          label={i18n("lastName")}
          type="text"
          focusable
        />
        <ListItemTextInput
          name="phoneNumber"
          label={i18n("phoneNumber")}
          type="text"
          focusable
        />
        <DatePicker
          name="birthDate"
          label={i18n("birthDate")}
          mode="date"
          locale={appLocaleShort}
          focusable
        />
        <ListItemTextInput
          name="birthCountry"
          label={i18n("birthCountry")}
          type="text"
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

export default ValidationPersonalForm;
