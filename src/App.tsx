import AsyncStorage from "@react-native-community/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import { NavigationNativeContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import "node-libs-react-native/globals"; // comment to make debugging work
import React from "react";
import { Image, YellowBox } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-view";
import { enableScreens } from "react-native-screens";
import { colors } from "react-native-urbi-ui/utils/colors";
import { onIOS } from "react-native-urbi-ui/utils/const";
import { textStyle } from "react-native-urbi-ui/utils/textStyles";
import { i18n } from "src/i18n";
import { emptyValidationFormData, ValidationFormData } from "src/models";
import { HelpScreen } from "src/screens/HelpScreen";
import { HomeScreen } from "src/screens/HomeScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { ProfileScreen } from "src/screens/ProfileScreen";
import { SplashScreen } from "src/screens/SplashScreen";
import { LoadingOverlay } from "src/utils/LoadingOverlay";
import ValidationDrivingLicenseForm from "src/screens/validation/ValidationDrivingLicenseForm";
import ValidationPersonalForm from "src/screens/validation/ValidationPersonalForm";
import ValidationStartPage from "src/screens/validation/ValidationStartPage";
import images from "src/utils/images";
import "./globals";

enableScreens();

YellowBox.ignoreWarnings(["Require cycle"]);

const tabIcon = (name: string) => ({ focused }: { focused: boolean }) => (
  <Image source={images[`${name}${focused ? "_focused" : ""}`]} />
);

type RootRoutes = {
  Main: undefined;
  Loading: { label: string };
};

export type RootStackProp<T extends keyof RootRoutes> = {
  route: RouteProp<RootRoutes, T>;
};

export type Routes = {
  Loading: RootRoutes["Loading"];
  Home: undefined;
  ProfileHome: undefined;
  HelpHome: undefined;
  ValidationStartPage: undefined;
  ValidationPersonalForm: { validationFormData: ValidationFormData };
  ValidationDrivingLicenseForm: { validationFormData: ValidationFormData };
  Onboarding: { onDone: () => any };
  Splash: undefined;
};

export type StackProp<T extends keyof Routes> = {
  navigation: NativeStackNavigationProp<Routes, T>;
  route: RouteProp<Routes, T>;
};

const Tab = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator<Routes>();
const Stack = createStackNavigator<RootRoutes>();

const stackStyle = {
  headerLargeTitle: true,
  headerStyle: { backgroundColor: colors.ulisse },
  headerTitleStyle: onIOS ? textStyle("title2", colors.uma) : undefined,
  headerHideShadow: true,
  contentStyle: {
    backgroundColor: colors.ulisse
  }
};

const splashStyle = {
  headerMode: "none",
  headerShown: false,
  contentStyle: {
    backgroundColor: colors.ulisse
  }
};

const ProfileTab = () => (
  <NativeStack.Navigator
    screenOptions={stackStyle}
    initialRouteName="ProfileHome"
  >
    <NativeStack.Screen
      name="ProfileHome"
      component={ProfileScreen}
      options={() => ({
        title: i18n("navigation_profile", { name: "" })
      })}
    />
    <NativeStack.Screen
      name="ValidationStartPage"
      component={ValidationStartPage}
      options={{ title: i18n("beforeStarting") }}
    />
    <NativeStack.Screen
      name="ValidationPersonalForm"
      component={ValidationPersonalForm}
      initialParams={{ validationFormData: emptyValidationFormData }}
      options={{ title: i18n("personalInformation") }}
    />
    <NativeStack.Screen
      name="ValidationDrivingLicenseForm"
      component={ValidationDrivingLicenseForm}
      options={{ title: i18n("dl_information") }}
    />
  </NativeStack.Navigator>
);

const HomeTab = () => (
  <NativeStack.Navigator screenOptions={stackStyle} initialRouteName="Home">
    <NativeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: i18n("navigation_deals") }}
    />
  </NativeStack.Navigator>
);

const HelpTab = () => (
  <NativeStack.Navigator screenOptions={stackStyle} initialRouteName="HelpHome">
    <NativeStack.Screen
      name="HelpHome"
      component={HelpScreen}
      options={{ title: i18n("navigation_faq") }}
    />
  </NativeStack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
  >
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
);

type AppState = {
  onboarding: "done" | "todo" | "unknown";
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { onboarding: "unknown" };
    this.onOnboardingDone = this.onOnboardingDone.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("onboarding").then(value =>
      setTimeout(
        () => this.setState({ onboarding: value === "done" ? "done" : "todo" }),
        1000
      )
    );
  }

  onOnboardingDone() {
    AsyncStorage.setItem("onboarding", "done");
    this.setState({ onboarding: "done" });
  }

  render() {
    const { onboarding } = this.state;
    return (
      <SafeAreaProvider>
        <NavigationNativeContainer>
          {onboarding === "done" ? (
            <Stack.Navigator
              mode="modal"
              headerMode="none"
              screenOptions={{ cardTransparent: true, gestureEnabled: false }}
            >
              <Stack.Screen
                name="Main"
                component={Tabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Loading"
                component={LoadingOverlay}
                initialParams={{ label: i18n("loading") }}
              />
            </Stack.Navigator>
          ) : (
            <NativeStack.Navigator screenOptions={splashStyle}>
              {onboarding === "unknown" ? (
                <NativeStack.Screen name="Splash" component={SplashScreen} />
              ) : (
                <NativeStack.Screen
                  name="Onboarding"
                  component={OnboardingScreen}
                  initialParams={{ onDone: this.onOnboardingDone }}
                />
              )}
            </NativeStack.Navigator>
          )}
        </NavigationNativeContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;
