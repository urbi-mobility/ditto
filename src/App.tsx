import "./globals";
import "node-libs-react-native/globals"
import React from "react";
import { Image } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { HelpScreen } from "src/screens/HelpScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { ProfileScreen } from "src/screens/ProfileScreen";
import images from "src/utils/images";
import { DrivingLicenseForm } from "./screens/DrivingLicenseForm";

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
    Home: ProfileScreen,
    Form: DrivingLicenseForm
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
