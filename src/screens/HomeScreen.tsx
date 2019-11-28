import React from "react";
import {
  ImageRequireSource,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Card } from "react-native-urbi-ui/components/Card";
import {
  CardHeader,
  CardHeaderProps
} from "react-native-urbi-ui/molecules/card/CardHeader";
import { VehicleImg } from "react-native-urbi-ui/molecules/img/VehicleImg";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";
import { colors } from "react-native-urbi-ui/utils/colors";
import { showAlert } from "react-native-urbi-ui/utils/functions";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { i18n } from "src/i18n";

type CardInfo = {
  header: CardHeaderProps;
  image: ImageRequireSource;
  logo: ImageRequireSource;
  description: string;
};

const body = registeredTextStyle("body", colors.uma, "dealsbody");

const fakeNews: CardInfo[] = [
  {
    header: {
      topLabel: "kickscooter sharing",
      title: "Circ",
      bigLabel: "Free",
      struckout: "4.99€",
      highlightBigLabel: true
    },
    image: require("../../assets/ic_lime_kick.png"),
    logo: require("../../assets/ic_flash.png"),
    description: "Free registration + 5 free rides"
  },
  {
    header: {
      topLabel: "Car sharing",
      title: "Miles",
      bigLabel: "Free",
      struckout: "9.99€",
      highlightBigLabel: true
    },
    image: require("../../assets/ic_driveby_a3.png"),
    logo: require("../../assets/ic_driveby.png"),
    description: "Free registration"
  },
  {
    header: {
      topLabel: "Scooter sharing",
      title: "Coup",
      bigLabel: "Free",
      struckout: "7.99€",
      highlightBigLabel: true
    },
    image: require("../../assets/ic_coup_gogoro.png"),
    logo: require("../../assets/ic_coup.png"),
    description: "Free registration + 30 minutes"
  }
];

const onCardPress = (provider: string) => () =>
  showAlert(`zoom zoom zoom, we're going to ${provider}-oon`);

export const HomeScreen = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.intro}>
          <Text style={body}>{i18n("home_body")}</Text>
        </View>
        <SectionsDivider
          label={i18n("home_activePromos")}
          labelColor={colors.ughina}
          backgroundColor={colors.ulisse}
        />
        {fakeNews.map((c, i) => (
          <Card
            key={`card-${i}`}
            header={<CardHeader {...c.header} />}
            image={<VehicleImg image={c.image} providerLogo={c.logo} />}
            description={c.description}
            onPress={onCardPress(c.header.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  </>
);

HomeScreen.navigationOptions = {
  headerTitle: i18n("navigation_deals")
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "flex-start" },
  intro: { padding: 24 }
});
