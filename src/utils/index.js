import { Platform, StatusBar, StyleSheet } from "react-native";

export default class Utils {
    // Strings
    static APP_COLOR = '#333';
    static APP_GREEN_COLOR = '#70D6B3';
    static APP_BLUE_COLOR = '#518FCD';
    static APP_RED_COLOR = '#CC4987';
    static APP_RED_COLOR_LIGHT = 'rgba(203, 72, 133, 0.5)';
    static APP_ORANGE_COLOR = '#F7BE34';
    static APP_WHITE = '#FFF';

    // Numbers
    static STATUS_BAR_PADDING_TOP_INGHERIT = Platform.OS === "android" ? StatusBar.currentHeight : 0;
    static SPACING = 15;
    static INPUT_HEIGHT = 50;
    static ICON_SIZE = 20;
}

export const STYLES = StyleSheet.create({
  root_container: {
    flex: 1,
    backgroundColor: Utils.APP_WHITE,
    paddingTop: Utils.STATUS_BAR_PADDING_TOP_INGHERIT
  },
  container: {
    flex: 1,
    backgroundColor: Utils.APP_WHITE,
    padding: Utils.SPACING
  },
});