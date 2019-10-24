import { ImageRequireSource } from "react-native";

const help = require("../../assets/help.png");
const help_focused = require("../../assets/help_focused.png");
const home = require("../../assets/home.png");
const home_focused = require("../../assets/home_focused.png");
const profile = require("../../assets/profile.png");
const profile_focused = require("../../assets/profile_focused.png");

const images: { [name: string]: ImageRequireSource } = {
  help,
  help_focused,
  home,
  home_focused,
  profile,
  profile_focused
};

export default images;
