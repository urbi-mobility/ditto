import React from "react";
import { DoubleChoice } from "react-native-urbi-ui/components/DoubleChoice";
import { Modal } from "react-native-urbi-ui/components/Modal";
import { ButtonCompact } from "react-native-urbi-ui/molecules/buttons/ButtonCompact";
import { i18n } from "src/i18n";
import { RootStackProp } from "src/App";

const onCancel = (props: RootStackProp<"ModalScreen">) => {
  return () => {
    if (props.route.params.onButtonLeftPress)
      props.route.params.onButtonLeftPress!();
    props.navigation.goBack();
  };
};

const onConfirm = (props: RootStackProp<"ModalScreen">) => () => {
  props.navigation.goBack();
  props.route.params.onButtonRightPress();
};

export const ModalScreen = (props: RootStackProp<"ModalScreen">) => (
  <Modal
    show
    image={props.route.params.image}
    title={props.route.params.title}
    text={props.route.params.text}
    actions={
      <DoubleChoice
        left={
          <ButtonCompact
            buttonStyle="default"
            onPress={onCancel(props)}
            label={props.route.params.labelLeft ?? i18n("cancel")}
          />
        }
        right={
          <ButtonCompact
            buttonStyle="primary"
            onPress={onConfirm(props)}
            label={props.route.params.labelRight ?? i18n("ok")}
          />
        }
      />
    }
  />
);
export default ModalScreen;
