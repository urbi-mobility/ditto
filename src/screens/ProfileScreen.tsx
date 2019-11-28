import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ListItem } from "react-native-urbi-ui/components/ListItem";
import { ListItemCompact } from "react-native-urbi-ui/components/ListItemCompact";
import { IconAndLabel } from "react-native-urbi-ui/molecules/content/IconAndLabel";
import { Label } from "react-native-urbi-ui/molecules/content/Label";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { colors } from "react-native-urbi-ui/utils/colors";
import { Icon } from "react-native-urbi-ui/utils/const";
import { StackProp } from "src/App";
import { i18n } from "src/i18n";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { padding: 0 },
  bottomView: {
    backgroundColor: colors.ukko
  }
});

const tapLicense = (props: StackProp<"ProfileHome">) => () => {
  props.navigation.navigate("ValidationStartPage");
};

const tapKeystore = () => {
  console.log("keystore");
};

const tapContract = () => {
  console.log("contract");
};

export const ProfileScreen = (props: StackProp<"ProfileHome">) => (
  <SafeAreaView style={styles.wrapper}>
    <ScrollView style={styles.scrollview}>
      <SectionsDivider
        label={i18n("verifiedDocuments")}
        backgroundColor={colors.ulisse}
      />
      <ListItem
        content={
          <IconAndLabel
            image={require("../../assets/license.png")}
            label={i18n("drivingLicense")}
          />
        }
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapLicense(props)}
      />
      <SectionsDivider
        label={i18n("blockchainId")}
        backgroundColor={colors.ulisse}
      />
      <ListItem
        content={
          <IconAndLabel
            image={require("../../assets/key.png")}
            label={i18n("keystorePassphrase")}
          />
        }
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapKeystore}
      />
      <ListItem
        content={
          <IconAndLabel
            image={require("../../assets/contract.png")}
            label={i18n("contract")}
          />
        }
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapContract}
      />
      <View style={styles.bottomView}>
        <SectionsDivider label={i18n("support")} />
        <ListItemCompact
          content={<Label text={i18n("contactUs")} />}
          size={8}
        />
        <ListItemCompact content={<Label text={i18n("deleteData")} />} />
      </View>
    </ScrollView>
  </SafeAreaView>
);
