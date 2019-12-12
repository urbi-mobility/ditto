import React from "react";
import { StyleSheet, Text } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { StackProp } from "src/App";
import { i18n } from "src/i18n";
import { emptyValidationFormData } from "src/models";

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 10 },
  grow: { flexGrow: 1 }
});

const next = (props: StackProp<"ValidationStartPage">) => () => {
  props.navigation.navigate("ValidationPersonalForm", {
    validationFormData: emptyValidationFormData
  });
};

const ValidationStartPage = (props: StackProp<"ValidationStartPage">) => {
  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.grow}>
          Here is where we explain what is about to happen, and which documents
          the user need. Some image too maybe?
        </Text>
        <Text style={styles.grow}>Some image too maybe?</Text>
        <ButtonRegular
          buttonStyle="primary"
          label={i18n("next")}
          onPress={next(props)}
        />
      </SafeAreaView>
    </>
  );
};

export default ValidationStartPage;