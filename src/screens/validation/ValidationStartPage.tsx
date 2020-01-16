import React from "react";
import { StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { OnboardingSinglePage } from "react-native-urbi-ui/components/OnboardingSinglePage";
import { StackProp } from "src/App";
import { i18n } from "src/i18n";
import { emptyValidationFormData } from "src/models";
import { onIphoneX } from "src/utils";

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
        <OnboardingSinglePage
          cta={{ label: i18n("startValidationProcess"), onPress: next(props) }}
          page={{
            title: "",
            image: require("../../../assets/license_banner.png"),
            content: i18n("validationBody")
          }}
          onIphoneX={onIphoneX}
        />
      </SafeAreaView>
    </>
  );
};

export default ValidationStartPage;
