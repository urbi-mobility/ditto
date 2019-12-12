import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, LayoutChangeEvent } from "react-native";
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
import { BOTTOM_PANEL_HEIGHT } from "react-native-urbi-ui/components/FloatingButtonLayout";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  button: { margin: 30 },
  scrollview: { paddingBottom: BOTTOM_PANEL_HEIGHT + 20 }
});

type ValidationPersonalFormState = {
  scrollViewAnchor: number;
  validationFormData: ValidationFormData;
};

class ValidationPersonalForm extends React.PureComponent<
  StackProp<"ValidationPersonalForm">,
  ValidationPersonalFormState
> {
  private scrollView: React.RefObject<ScrollView>;

  constructor(props: StackProp<"ValidationPersonalForm">) {
    super(props);
    this.scrollView = React.createRef();
    this.renderForm = this.renderForm.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      scrollViewAnchor: 0,
      validationFormData: this.props.route.params.validationFormData
    };
  }

  onLayout(e: LayoutChangeEvent) {
    this.setState({ scrollViewAnchor: e.nativeEvent.layout.y });
  }

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
        autoScroll
      >
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
        style={styles.scrollview}
        contentContainerStyle={styles.scrollview}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        onLayout={this.onLayout}
      >
        <Formik
          initialValues={this.state.validationFormData}
          onSubmit={this.submit}
        >
          {this.renderForm}
        </Formik>
        <ButtonRegular
          buttonStyle="primary"
          style={styles.button}
          label={i18n("next")}
          onPress={() => this.submit(this.state.validationFormData)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ValidationPersonalForm;
