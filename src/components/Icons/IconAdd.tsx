import React from "react";
import { SvgXml } from "react-native-svg";
import Constants from "../../constants/constants";

type Props = {
  fill?: string
  stroke?: string
  width?: number
  height?: number
}

export const IconAdd: React.FC<Props> = (props) => {
	const fill = props.fill || "none"
	const stroke = props.stroke || Constants.styles.textColor.DEFAULT
	const width = props.width || 25
	const height = props.height || 25
	const SVGPortfolioFocused = `<svg width=${width} height=${height} viewBox="0 0 25 24" fill=${fill} xmlns="http://www.w3.org/2000/svg"> <path d="M8.75 8H6.95C5.83 8 5.27 8 4.842 8.218C4.46565 8.40969 4.15969 8.71565 3.968 9.092C3.75 9.52 3.75 10.08 3.75 11.2V16.8C3.75 17.92 3.75 18.48 3.968 18.908C4.15974 19.2843 4.46569 19.5903 4.842 19.782C5.269 20 5.829 20 6.947 20H18.553C19.671 20 20.23 20 20.657 19.782C21.034 19.59 21.34 19.284 21.532 18.908C21.75 18.48 21.75 17.922 21.75 16.804V11.197C21.75 10.079 21.75 9.519 21.532 9.092C21.3399 8.71558 21.0336 8.40963 20.657 8.218C20.23 8 19.67 8 18.55 8H16.75M8.75 8H16.75M8.75 8C8.75 6.93913 9.17143 5.92172 9.92157 5.17157C10.6717 4.42143 11.6891 4 12.75 4C13.8109 4 14.8283 4.42143 15.5784 5.17157C16.3286 5.92172 16.75 6.93913 16.75 8" stroke=${stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`
    return <SvgXml xml={SVGPortfolioFocused} />
}