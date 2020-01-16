import { Platform } from "react-native";
import { hasNotch } from "react-native-device-info";

export const onIphoneX = Platform.OS === "ios" && hasNotch();
