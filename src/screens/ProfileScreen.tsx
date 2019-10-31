import React from "react";
import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { i18n } from "src/i18n";
import SafeAreaView from "react-native-safe-area-view";
import { ListItem } from "react-native-urbi-ui/components/ListItem";
import { ListItemCompact } from "react-native-urbi-ui/components/ListItemCompact";
import { Label } from "react-native-urbi-ui/molecules/content/Label";
import { IconAndLabel } from "react-native-urbi-ui/molecules/content/IconAndLabel";
import { Icon } from "react-native-urbi-ui/utils/const";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from 'react-native-urbi-ui/utils/colors';
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { NavigationStackScreenProps } from "react-navigation-stack";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  scrollview: { padding: 0 },
  bottomView: {
    backgroundColor: colors.ukko
  }
});

const textStyle = registeredTextStyle("title");

const tapLicense = (props: NavigationStackScreenProps) => () => {
  console.log('license')
  props.navigation.navigate("Form")
}

const tapKeystore = () => {
  console.log('keystore')
}

const tapContract = () => {
  console.log('contract')
}

export const ProfileScreen = (props: NavigationStackScreenProps) => (
  <SafeAreaView style={styles.wrapper}>
    <ScrollView style={styles.scrollview}>
      <SectionsDivider label="Verified Documents" backgroundColor={colors.ulisse} />
      <ListItem
        content={<IconAndLabel image={require("../../assets/license.png")} label="Driving license" />}
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapLicense(props)}
      />
      <SectionsDivider label="Your identity on the blockchain" backgroundColor={colors.ulisse} />
      <ListItem
        content={<IconAndLabel image={require("../../assets/key.png")} label="Keystore passphrase" />}
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapKeystore}
      />
      <ListItem
        content={<IconAndLabel image={require("../../assets/contract.png")} label="Contract" />}
        end={<Icon name="disclosure-small" size={18} color={colors.primary} />}
        onPress={tapContract}
      />
      <View style={styles.bottomView}>
        <SectionsDivider label="Support" />
        <ListItemCompact content={<Label text="Contact us" />} size={8} />
        <ListItemCompact content={<Label text="Delete all user data" />} />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const name = ""; // TODO load it from local storage

ProfileScreen.navigationOptions = {
  headerTitle: i18n("navigation_profile", { name })
};