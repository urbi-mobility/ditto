import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Animated,
  Easing
} from "react-native";
import { registeredTextStyle } from "react-native-urbi-ui/utils/textStyles";
import { colors } from "react-native-urbi-ui/utils/colors";
import { Icon } from "react-native-urbi-ui/utils/const";
import { ListItem } from "react-native-urbi-ui/components/ListItem";
import { Label } from "react-native-urbi-ui/molecules/content/Label";
import { Touchable } from "react-native-urbi-ui/components/Touchable";

const styles = StyleSheet.create({
  Wrapper: {
    flexShrink: 0
  } as ViewStyle,
  Header: {
    height: 60
  },
  Content: {
    // flexShrink: 0,
    // flexGrow: 1,
    paddingHorizontal: 24
  },
  ContentText: { flexGrow: 1, flexShrink: 0, flexWrap: "wrap" },
  Separator: { height: 1, backgroundColor: colors.ukko }
});

type Section = {
  title: string;
  content: string;
};

type AccordionProps = {
  sections: Section[];
};

const title = registeredTextStyle("title", colors.primary, "titlefaq");
const body = registeredTextStyle("body", colors.uma, "bodyfaq");

type AccordionState = {
  sections: {
    [index: string]: {
      toggled: boolean;
      rotation: Animated.Value;
    };
  };
};

export default class Accordion extends React.PureComponent<
  AccordionProps,
  AccordionState
> {
  constructor(props: AccordionProps) {
    super(props);
    this.state = {
      sections: props.sections.reduce((prev, _, i) => {
        prev[i.toString()] = {
          toggled: false,
          rotation: new Animated.Value(1)
        };
        return prev;
      }, {} as AccordionState["sections"])
    };
    this.onSectionToggle = this.onSectionToggle.bind(this);
  }

  onSectionToggle(i: number) {
    return () => {
      const idx = i.toString();
      const section = this.state.sections[idx];
      Animated.timing(section.rotation, {
        toValue: section.toggled ? 1 : 0,
        duration: 200,
        easing: Easing.linear
      }).start();
      this.setState({
        sections: {
          ...this.state.sections,
          [idx]: {
            ...section,
            toggled: !section.toggled
          }
        }
      });
    };
  }

  render() {
    return (
      <View style={styles.Wrapper}>
        {this.props.sections.map((section, i) => (
          <View key={i} style={styles.Wrapper}>
            <Touchable onPress={this.onSectionToggle(i)} style={styles.Header}>
              <ListItem
                content={
                  <Label text={section.title} textColor={colors.primary} />
                }
                end={
                  <Animated.View
                    style={{
                      transform: [
                        {
                          rotateZ: this.state.sections[
                            i.toString()
                          ].rotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["270deg", "90deg"]
                          })
                        }
                      ]
                    }}
                  >
                    <Icon
                      name="disclosure-small"
                      color={colors.primary}
                      size={18}
                    />
                  </Animated.View>
                }
              />
            </Touchable>
            <Animated.View
              style={[
                styles.Content,
                {
                  height: this.state.sections[
                    i.toString()
                  ].rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                  }),
                  opacity: this.state.sections[i.toString()].toggled ? 1 : 0
                }
              ]}
            >
              <Text style={[body, styles.ContentText]}>{section.content}</Text>
            </Animated.View>
            <View style={styles.Separator} />
          </View>
        ))}
      </View>
    );
  }
}
