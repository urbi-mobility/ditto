import { differenceInMilliseconds } from "date-fns";
import { Platform } from "react-native";
import { hasNotch } from "react-native-device-info";

export const onIphoneX = Platform.OS === "ios" && hasNotch();

export const callNoSoonerThanSecondsFrom = (
  seconds: number,
  from: Date,
  call: () => any
) => {
  const diff = differenceInMilliseconds(from, new Date());
  const millis = seconds * 1000;
  if (diff < millis) setTimeout(call, millis - diff);
  else call();
};

const SUPPRESS_LOGS = false;

export const log = (m: any) => (SUPPRESS_LOGS ? null : console.log(m));
