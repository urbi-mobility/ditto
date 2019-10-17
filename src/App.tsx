import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import ButtonRegular from 'react-native-urbi-ui/molecules/buttons/ButtonRegular';
import { colors } from 'react-native-urbi-ui/utils/colors';
import { registeredTextStyle } from 'react-native-urbi-ui/utils/textStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackScreenProps,
  NavigationStackProp,
} from 'react-navigation-stack';
import { TestScreen } from 'src/screens/TestScreen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const onButtonPress = (navigation: NavigationStackProp) => () => navigation.navigate('Test');

const App = (props: NavigationStackScreenProps) => (
  <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
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

const hero = registeredTextStyle('hero', colors.brand);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
    padding: 20,
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Test: TestScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

// see https://github.com/react-native-community/releases/issues/140#issuecomment-532819601 🤦
export default gestureHandlerRootHOC(createAppContainer(AppNavigator));
