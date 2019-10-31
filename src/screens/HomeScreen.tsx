import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  ImageRequireSource,
  Text,
  View
} from "react-native";
import { Card } from "react-native-urbi-ui/components/Card";
import {
  CardHeaderProps,
  CardHeader
} from "react-native-urbi-ui/molecules/card/CardHeader";
import { VehicleImg } from "react-native-urbi-ui/molecules/img/VehicleImg";
import { showAlert } from "react-native-urbi-ui/utils/functions";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { colors } from "react-native-urbi-ui/utils/colors";
import { SectionsDivider } from "react-native-urbi-ui/molecules/SectionsDivider";

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
      <ScrollView style={styles.scrollview}>
        <View style={styles.intro}>
          <Text style={body}>
            Unlock other sharing mobility providers with our exclusive deals.
            Just one tap, you won't need to verify your identity again!
          </Text>
        </View>
        <SectionsDivider
          label="active promos"
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
  headerTitle: "Deals"
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "flex-start" },
  scrollview: { paddingTop: 20 },
  intro: { padding: 24 }
});
