/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const nodeLibs = require("node-libs-react-native");
nodeLibs.vm = require.resolve("vm-browserify");
nodeLibs.crypto = require.resolve("react-native-crypto");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    extraNodeModules: nodeLibs
  }
};
