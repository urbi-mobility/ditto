import React from "react";
import { StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from 'react-native-urbi-ui/utils/colors';
import { ListItemForm } from "react-native-urbi-ui/components/form/ListItemForm";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { padding: 0 }
});

export const DrivingLicenseForm = () => (
  <SafeAreaView style={styles.wrapper}>
    <ScrollView style={styles.scrollview}>
      <SectionsDivider label="Ohh" backgroundColor={colors.ulisse} />
      {/* <ListItemForm /> */}
    </ScrollView>
  </SafeAreaView>
);

DrivingLicenseForm.navigationOptions = {
  headerTitle: "Driving License"
};