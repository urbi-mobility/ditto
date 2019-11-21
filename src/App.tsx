import "./globals";
import "node-libs-react-native/globals"; // comment to make debugging work
import React from "react";
import { Image } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { HelpScreen } from "src/screens/HelpScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { ProfileScreen } from "src/screens/ProfileScreen";
import images from "src/utils/images";
import ValidationPersonalForm from "./screens/validation/ValidationPersonalForm";
import ValidationStartPage from "./screens/validation/ValidationStartPage";
import ValidationDrivingLicenseForm from "./screens/validation/ValidationDrivingLicenseForm";

const HelpNavigator = createStackNavigator({
  Home: HelpScreen
});

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Onboarding: OnboardingScreen
  },
  {
    initialRouteName: "Onboarding"
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Home: ProfileScreen,
    ValidationStartPage: ValidationStartPage,
    ValidationPersonalForm: ValidationPersonalForm,
    ValidationDrivingLicenseForm: ValidationDrivingLicenseForm
  },
  {
    initialRouteName: "Home"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Profile: ProfileNavigator,
    Home: HomeNavigator,
    Help: HelpNavigator
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
