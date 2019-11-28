import React from "react";
import { colors } from "react-native-urbi-ui/utils/colors";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";
import { i18n } from "src/i18n";

export const PersonalInfoFragment = () => {
  return (
    <>
      <SectionsDivider
        label="Personal Information"
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
      <ListItemTextInput
        name="birthCountry"
        label={i18n("birthCountry")}
        type="text"
        focusable
      />
    </>
  );
};
