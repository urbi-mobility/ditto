import "./globals";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ButtonRegular } from "react-native-urbi-ui/molecules/buttons/ButtonRegular";
import { colors } from "react-native-urbi-ui/utils/colors";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  NavigationStackProp,
  NavigationStackScreenProps
} from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { HelpScreen } from "src/screens/HelpScreen";
import { ProfileScreen } from "src/screens/ProfileScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import images from "src/utils/images";

const onButtonPress = (navigation: NavigationStackProp) => () =>
  navigation.navigate("Test");

const App = (props: NavigationStackScreenProps) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Text style={[styles.text, hero]}>Welcome to ditto!</Text>
        <ButtonRegular
          buttonStyle="brand"
          onPress={onButtonPress(props.navigation)}
          label="Click me"
        />
      </ScrollView>
    </SafeAreaView>
  </>
);

App.navigationOptions = { header: null };

const hero = registeredTextStyle("hero", colors.brand);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.lighter
  },
  text: {
    textAlign: "center",
    marginBottom: 15
  },
  scrollView: {
    padding: 20
  }
});

const HelpNavigator = createStackNavigator({
  Home: HelpScreen
});

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home"
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Home: ProfileScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Help: HelpNavigator,
    Home: HomeNavigator,
    Profile: ProfileNavigator
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const icon =
          images[`${routeName.toLowerCase()}${focused ? "_focused" : ""}`];
        return <Image source={icon} />;
      }
    }),
    tabBarOptions: {
      showLabel: false
    }
  }
);

// see https://github.com/react-native-community/releases/issues/140#issuecomment-532819601 🤦
export default gestureHandlerRootHOC(createAppContainer(AppNavigator));
