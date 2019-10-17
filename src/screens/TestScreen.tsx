import React from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import { registeredTextStyle } from 'react-native-urbi-ui/utils/textStyles';

export const TestScreen = () => (
  <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView>
      <Text style={titleStyle}>Navigation works, too! 🎉</Text>
    </SafeAreaView>
  </>
);

TestScreen.navigationOptions = {
  headerTitle: 'Success',
};

const titleStyle = registeredTextStyle('title');
