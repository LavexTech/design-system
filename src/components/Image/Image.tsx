import React from "react"
import { Image as RNImage, StyleSheet, TouchableOpacity, View } from "react-native"

type ImageSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
type ImageType = "default" | "circle"

const IMAGE_SIZE_PX: Record<ImageSize, number> = {
  "2xs": 24,
  xs: 40,
  sm: 64,
  md: 80,
  lg: 96,
  xl: 128,
  "2xl": 256,
}

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

  const px = IMAGE_SIZE_PX[size]
  const isCircle = type === "circle"
  const frameStyle = [
    styles.frame,
    {
      width: px,
      height: px,
      borderRadius: isCircle ? px / 2 : 8,
    },
  ]

  const imageNode = (
    <RNImage
      source={{ uri: src }}
      accessibilityLabel={alt}
      style={{ width: px, height: px }}
      resizeMode="cover"
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
