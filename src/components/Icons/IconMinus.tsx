import React from "react";
import { SvgXml } from "react-native-svg";
import Constants from "../../constants/constants";

type Props = {
  fill?: string
  stroke?: string
  width?: number
  height?: number
}

const SVGMinus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/></svg>`

export const IconMinus: React.FC<Props> = (props) => {
	const fill = props.fill || Constants.styles.textColor.DEFAULT
	const stroke = props.stroke || Constants.styles.textColor.DEFAULT
	const width = props.width || 25
	const height = props.height || 25

  return <SvgXml xml={SVGMinus} width={width} height={height} fill={fill} stroke={stroke} />
}