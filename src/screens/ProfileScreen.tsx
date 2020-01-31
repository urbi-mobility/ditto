import { useNavigation } from "@react-navigation/core";
import { differenceInSeconds } from "date-fns";
import React, { useContext, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { ListItem } from "react-native-urbi-ui/components/ListItem";
import { ListItemCompact } from "react-native-urbi-ui/components/ListItemCompact";
import { IconAndLabel } from "react-native-urbi-ui/molecules/content/IconAndLabel";
import { Label } from "react-native-urbi-ui/molecules/content/Label";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { colors } from "react-native-urbi-ui/utils/colors";
import { Icon } from "react-native-urbi-ui/utils/const";
import { onPressShowNotYet } from "react-native-urbi-ui/utils/functions";
import { SavedDataContext } from "src/App";
import { i18n } from "src/i18n";
import { emptyValidationFormData } from "src/models";
import { deserializeUserData } from "src/utils/jsonUtils";
import SecureStore from "src/utils/SecureStore";

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.ukko },
  scrollview: { flex: 1 },
  bottomView: {
    backgroundColor: colors.ukko
  }
});

const loadUserFromDisk = async () => {
  const stored: string | undefined = await SecureStore.getItemAsync("user");
  console.log(`userData: ${stored}`);
  const userData = stored ? deserializeUserData(stored) : undefined;
  return userData;
};

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [validationFormData, setValidationFormData] = useState(
    emptyValidationFormData
  );
  const { setHasSavedData } = useContext(SavedDataContext);

  const loadFromStorage = () => {
    loadUserFromDisk().then(user => {
      navigation.setOptions({
        headerTitle: i18n("navigation_profile", {
          name: user?.firstName ? ` ${user.firstName}` : ""
        })
      });
      setValidationFormData(user ?? emptyValidationFormData);
    });
  };
  useLayoutEffect(loadFromStorage, []);

  const onLicensePress = () =>
    navigation.navigate("ValidationPersonalForm", { validationFormData });

  const onKeystorePress = () => {
    console.log("keystore");
  };

  const onContractPress = () => {
    console.log("contract");
  };

  const onDeletePress = () => {
    navigation.navigate("ModalScreen", {
      title: i18n("deleteDataTitle"),
      text: i18n("deleteDataText"),
      labelRight: i18n("deleteDataConfirm"),
      onButtonRightPress: () => {
        const started = new Date();
        navigation.navigate("Loading", { label: i18n("deleting") });
        SecureStore.deleteItemAsync("user").then(_ => {
          const goHome = () => {
            console.log("no more saved data");
            setHasSavedData(false);
            navigation.navigate("Home");
          };

          if (differenceInSeconds(started, new Date()) < 2)
            setTimeout(goHome, 2000);
          else goHome();
        });
      }
    });
  };

  return (
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
          end={
            <Icon name="disclosure-small" size={18} color={colors.primary} />
          }
          onPress={onLicensePress}
          backgroundColor={colors.ulisse}
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
          end={
            <Icon name="disclosure-small" size={18} color={colors.primary} />
          }
          onPress={onKeystorePress}
          backgroundColor={colors.ulisse}
        />
        <ListItem
          content={
            <IconAndLabel
              image={require("../../assets/contract.png")}
              label={i18n("contract")}
            />
          }
          end={
            <Icon name="disclosure-small" size={18} color={colors.primary} />
          }
          onPress={onContractPress}
          backgroundColor={colors.ulisse}
        />
        <View style={styles.bottomView}>
          <SectionsDivider label={i18n("support")} />
          <ListItemCompact
            content={<Label text={i18n("contactUs")} />}
            onPress={onPressShowNotYet}
            backgroundColor={colors.ukko}
          />
          <ListItemCompact
            content={<Label text={i18n("deleteData")} />}
            onPress={onDeletePress}
            backgroundColor={colors.ukko}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
