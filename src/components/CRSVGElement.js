import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function CRSVGElement(props) {
    const svgMarkup = props.content;
    const width = props.width + "px";
    const SvgImage = () => <SvgXml xml={svgMarkup} width={width} />;
    return <View style={{overflow: 'hidden', justifyContent: 'center', alignSelf: 'center', width: props.width , height: props.width, ...props.style }}>
        <SvgImage />
    </View>;
}
