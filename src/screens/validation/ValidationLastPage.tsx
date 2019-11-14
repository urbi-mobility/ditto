import React from "react";
import { colors } from "react-native-urbi-ui/utils/colors";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ListItemTextInput } from "react-native-urbi-ui/components/form/ListItemTextInput";

export const PersonalInfoFragment = () => {
  return (
    <>
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
        name="birthCountry"
        label="Birth country"
        type="username"
        error=""
        focusable
      />
    </>
  );
};
