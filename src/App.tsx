import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/core";
import { NavigationNativeContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import "node-libs-react-native/globals"; // comment to make debugging work
import React from "react";
import { Image } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-view";
import { enableScreens } from "react-native-screens";
import { colors } from "react-native-urbi-ui/utils/colors";
import { textStyle } from "react-native-urbi-ui/utils/textStyles";
import { i18n } from "src/i18n";
import { emptyValidationFormData, ValidationFormData } from "src/models";
import { HelpScreen } from "src/screens/HelpScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { ProfileScreen } from "src/screens/ProfileScreen";
import ValidationDrivingLicenseForm from "src/screens/validation/ValidationDrivingLicenseForm";
import ValidationPersonalForm from "src/screens/validation/ValidationPersonalForm";
import ValidationStartPage from "src/screens/validation/ValidationStartPage";
import images from "src/utils/images";
import "./globals";

enableScreens();

const tabIcon = (name: string) => ({ focused }: { focused: boolean }) => (
  <Image source={images[`${name}${focused ? "_focused" : ""}`]} />
);

export type Routes = {
  Home: undefined;
  ProfileHome: undefined;
  HelpHome: undefined;
  ValidationStartPage: undefined;
  ValidationPersonalForm: { validationFormData: ValidationFormData };
  ValidationDrivingLicenseForm: { validationFormData: ValidationFormData };
  Onboarding: { index: number };
};

export type StackProp<T extends keyof Routes> = {
  navigation: NativeStackNavigationProp<Routes, T>;
  route: RouteProp<Routes, T>;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<Routes>();

const userName = ""; // TODO read from local storage

const stackStyle = {
  headerLargeTitle: true,
  headerStyle: { backgroundColor: colors.ulisse },
  headerTitleStyle: textStyle("title2", colors.uma),
  headerHideShadow: true,
  contentStyle: {
    backgroundColor: colors.ulisse
  }
};

const ProfileTab = () => (
  <Stack.Navigator screenOptions={stackStyle} initialRouteName="ProfileHome">
    <Stack.Screen
      name="ProfileHome"
      component={ProfileScreen}
      options={() => ({
        title: i18n("navigation_profile", { name: userName })
      })}
    />
    <Stack.Screen
      name="ValidationStartPage"
      component={ValidationStartPage}
      options={{ title: i18n("beforeStarting") }}
    />
    <Stack.Screen
      name="ValidationPersonalForm"
      component={ValidationPersonalForm}
      initialParams={{ validationFormData: emptyValidationFormData }}
      options={{ title: i18n("personalInformation") }}
    />
    <Stack.Screen
      name="ValidationDrivingLicenseForm"
      component={ValidationDrivingLicenseForm}
      options={{ title: i18n("dl_information") }}
    />
  </Stack.Navigator>
);

const HomeTab = () => (
  <Stack.Navigator screenOptions={stackStyle} initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: i18n("navigation_deals") }}
    />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const HelpTab = () => (
  <Stack.Navigator screenOptions={stackStyle} initialRouteName="HelpHome">
    <Stack.Screen
      name="HelpHome"
      component={HelpScreen}
      options={{ title: i18n("navigation_faq") }}
    />
  </Stack.Navigator>
);

const App = () => (
  <SafeAreaProvider>
    <NavigationNativeContainer>
      <Tab.Navigator tabBarOptions={{ showLabel: false }}>
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarIcon: tabIcon("profile")
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ tabBarIcon: tabIcon("home") }}
        />
        <Tab.Screen
          name="Help"
          component={HelpTab}
          options={{ tabBarIcon: tabIcon("help") }}
        />
      </Tab.Navigator>
    </NavigationNativeContainer>
  </SafeAreaProvider>
);

export default App;
