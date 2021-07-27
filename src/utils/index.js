import { Platform, StatusBar } from "react-native";

export default class Utils {
  // Strings
  static APP_COLOR = '#333';
  static APP_GREEN_COLOR = '#19dbad';
  static APP_BLUE_COLOR = '#29abe2';
  static APP_RED_COLOR = '#ed1e79';
  static APP_RED_COLOR_LIGHT = 'rgba(203, 72, 133, 0.5)';
  static APP_ORANGE_COLOR = '#ffb808';
  static APP_WHITE_COLOR = '#FFF';
  static APP_DARK_TEXT_COLOR = 'rgba(0,0,0,0.8)';
  static APP_LIGHT_TEXT_COLOR = 'rgba(255,255,255,1)';
  static APP_LIGHT_DARK = 'rgba(0,0,0,0.1)';
  static APP_LIGHTER_DARK = 'rgba(0,0,0,0.04)';

  // Numbers
  static STATUS_BAR_PADDING_TOP_INGHERIT = Platform.OS === "android" ? StatusBar.currentHeight : 0;
  static SPACING = 15;
  static INPUT_HEIGHT = 60;
  static ICON_SIZE = 20;

  // Functions
  static getFileNameFromPath = (path) => {
    const dirParts = path.split('\/');
    return dirParts[dirParts.length - 1]; 
  };

  // Constants
  static brands = ['Mercedes', 'Ford', 'Citroen', 'Kia', 'Peugot'];

  // Style
  static STYLES = {
    root_container: {
      flex: 1,
      backgroundColor: this.APP_WHITE_COLOR,
      paddingTop: this.STATUS_BAR_PADDING_TOP_INGHERIT
    },
    container: {
      flex: 1,
      backgroundColor: this.APP_WHITE_COLOR,
      padding: this.SPACING
    },
    icon_button: {
      width: 2 * this.SPACING,
      height: 2 * this.SPACING,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header_style: {
      backgroundColor: this.APP_WHITE_COLOR,
      borderBottomWidth: 0.5,
      elevation: 0,
    },
    input: {
      width: '100%',
      height: this.INPUT_HEIGHT,
      padding: this.SPACING,
      borderRadius: this.SPACING,
      backgroundColor: this.APP_LIGHTER_DARK,
      color: this.APP_DARK_TEXT_COLOR,
      borderColor: 'rgba(0,0,0,0.5)',
      marginVertical: this.SPACING / 2,
    },
    tag: {
      backgroundColor: this.APP_LIGHTER_DARK,
      borderRadius: this.SPACING,
      height: 1.5 * this.SPACING,
      padding: this.SPACING,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: this.SPACING / 2,
    },
  };

  static svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="250" height="250" viewBox="0 0 250 250">
  <defs>
    <linearGradient id="linear-gradient" x1="0.009" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#f7be34"/>
      <stop offset="0.297" stop-color="#cc4987"/>
      <stop offset="0.652" stop-color="#518fcd"/>
      <stop offset="1" stop-color="#70d6b3"/>
    </linearGradient>
    <clipPath id="clip-iPhone_12_12_Pro_75">
      <rect width="250" height="250"/>
    </clipPath>
  </defs>
  <g id="iPhone_12_12_Pro_75" data-name="iPhone 12, 12 Pro – 75" clip-path="url(#clip-iPhone_12_12_Pro_75)">
    <rect width="250" height="250" fill="url(#linear-gradient)"/>
    <g id="Group_56" data-name="Group 56" transform="translate(-7394.01 400.943)">
      <g id="Group_52" data-name="Group 52" transform="translate(7436.833 -341)">
        <g id="car" transform="translate(0 0)">
          <g id="Group_15" data-name="Group 15" transform="translate(3.424 68.481)">
            <g id="Group_14" data-name="Group 14">
              <path id="Path_52" data-name="Path 52" d="M54.179,288.211,37.648,271.68a17.024,17.024,0,0,0-12.107-5.013H14.09a3.424,3.424,0,1,0,0,6.848H25.54a10.344,10.344,0,0,1,7.259,3.006l10.69,10.69H14.09a3.424,3.424,0,1,0,0,6.848H51.755a3.428,3.428,0,0,0,2.425-5.848Z" transform="translate(-10.666 -266.667)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_17" data-name="Group 17" transform="translate(6.848 102.722)">
            <g id="Group_16" data-name="Group 16">
              <path id="Path_53" data-name="Path 53" d="M59,376.757a3.426,3.426,0,0,0-3.424,3.424v10.272a3.43,3.43,0,0,1-3.424,3.424H31.605a3.43,3.43,0,0,1-3.424-3.424v-13.7a3.424,3.424,0,1,0-6.848,0v13.7a10.285,10.285,0,0,0,10.272,10.272H52.15a10.285,10.285,0,0,0,10.272-10.272V380.181A3.425,3.425,0,0,0,59,376.757Z" transform="translate(-21.333 -373.333)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_19" data-name="Group 19" transform="translate(0 41.089)">
            <g id="Group_18" data-name="Group 18" transform="translate(0 0)">
              <path id="Path_54" data-name="Path 54" d="M148.817,188.572c-9.437-4.937-30.618-7.238-66.639-7.238s-57.2,2.3-66.639,7.238C4.787,194.188,0,203.57,0,219a121.971,121.971,0,0,0,3.54,28.276,3.416,3.416,0,0,0,3.308,2.541H36.857l12.97,6.485a3.435,3.435,0,0,0,1.534.363h61.633a3.385,3.385,0,0,0,1.527-.363l12.977-6.485h30.009a3.416,3.416,0,0,0,3.308-2.541A121.972,121.972,0,0,0,164.355,219C164.355,203.57,159.568,194.188,148.817,188.572Zm5.985,54.394H126.7a3.392,3.392,0,0,0-1.534.363l-12.977,6.485H52.169L39.2,243.33a3.434,3.434,0,0,0-1.534-.363H9.56A117.745,117.745,0,0,1,6.848,219c0-12.9,3.438-19.955,11.854-24.359,8.2-4.287,29.557-6.458,63.475-6.458s55.271,2.171,63.475,6.458c8.416,4.4,11.854,11.464,11.854,24.359A118.345,118.345,0,0,1,154.8,242.967Z" transform="translate(0 -181.334)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_21" data-name="Group 21" transform="translate(116.42 68.481)">
            <g id="Group_20" data-name="Group 20">
              <path id="Path_55" data-name="Path 55" d="M403.759,287.211h-29.4l10.683-10.69a10.36,10.36,0,0,1,7.266-3.006h11.45a3.424,3.424,0,1,0,0-6.848h-11.45A17.023,17.023,0,0,0,380.2,271.68L363.67,288.211a3.428,3.428,0,0,0,2.424,5.848h37.665a3.424,3.424,0,1,0,0-6.848Z" transform="translate(-362.672 -266.667)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_23" data-name="Group 23" transform="translate(41.088 68.481)">
            <g id="Group_22" data-name="Group 22">
              <path id="Path_56" data-name="Path 56" d="M209.853,268.639a3.428,3.428,0,0,0-3.1-1.972H131.422a3.422,3.422,0,0,0-2.63,5.615l17.12,20.544a3.428,3.428,0,0,0,2.63,1.233h41.089a3.428,3.428,0,0,0,2.63-1.233l17.12-20.544A3.416,3.416,0,0,0,209.853,268.639Zm-21.832,18.572H150.144l-11.416-13.7h60.709Z" transform="translate(-127.996 -266.667)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_25" data-name="Group 25" transform="translate(13.697 0)">
            <g id="Group_24" data-name="Group 24">
              <path id="Path_57" data-name="Path 57" d="M179.35,103.331c-3.9-8.957-16.935-38.48-21.469-42.335-5.65-4.8-21.832-7.663-43.308-7.663h-6.848c-21.476,0-37.658,2.862-43.308,7.656-4.534,3.856-17.579,33.378-21.469,42.335a3.427,3.427,0,0,0,6.287,2.732c7.731-17.8,17.189-37.576,19.62-39.842,2.636-2.239,13.792-6.033,38.87-6.033h6.848c25.078,0,36.234,3.794,38.856,6.019,2.445,2.28,11.9,22.051,19.634,39.856a3.426,3.426,0,0,0,6.287-2.726Z" transform="translate(-42.668 -53.333)" fill="#fff"/>
            </g>
          </g>
          <g id="Group_27" data-name="Group 27" transform="translate(116.418 102.722)">
            <g id="Group_26" data-name="Group 26">
              <path id="Path_58" data-name="Path 58" d="M400.33,373.333a3.426,3.426,0,0,0-3.424,3.424v13.7a3.43,3.43,0,0,1-3.424,3.424H372.938a3.43,3.43,0,0,1-3.424-3.424V380.181a3.424,3.424,0,1,0-6.848,0v10.272a10.285,10.285,0,0,0,10.272,10.272h20.544a10.285,10.285,0,0,0,10.272-10.272v-13.7A3.425,3.425,0,0,0,400.33,373.333Z" transform="translate(-362.665 -373.333)" fill="#fff"/>
            </g>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>
`;
}