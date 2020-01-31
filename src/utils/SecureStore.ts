import * as Keychain from "react-native-keychain";

export const SecureStore = {
  getItemAsync: async (key: string) => {
    const value = await Keychain.getInternetCredentials(`ditto-${key}`);
    return value ? value?.password ?? undefined : undefined;
  },
  setItemAsync: async (key: string, value: string) => {
    await Keychain.setInternetCredentials(`ditto-${key}`, "ditto", value);
  },
  deleteItemAsync: async (key: string) =>
    Keychain.resetInternetCredentials(`ditto-${key}`)
};

export default SecureStore;
