import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Image as GluestackImage, NATIVE_IMAGE_SIZE_PX } from "../../ui/image"

type ImageSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type ImageType = "default" | "circle"

type ImageProps = {
  src: string
  alt: string
  onClick?: () => void
  size?: ImageSize
  type?: ImageType
  darkMode?: boolean
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  onClick,
  size = "md",
  type = "default",
  darkMode = false,
}) => {
  void darkMode

  const px = NATIVE_IMAGE_SIZE_PX[size]
  const isCircle = type === "circle"

  const getBorderRadiusClass = () => {
    if (isCircle) {
      return "rounded-full"
    }
    return "rounded-lg"
  }

  const frameStyle = [
    styles.frame,
    {
      width: px,
      height: px,
      borderRadius: isCircle ? px / 2 : undefined,
    },
  ]

  const imageNode = (
    <GluestackImage
      source={{ uri: src }}
      size={size}
      alt={alt}
      className={getBorderRadiusClass()}
    />
  )

  if (onClick === undefined) {
    return <View style={frameStyle}>{imageNode}</View>
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={alt}
      style={frameStyle}
    >
      {imageNode}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  frame: {
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
})
