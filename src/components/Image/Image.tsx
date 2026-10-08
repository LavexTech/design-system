import React, { useEffect, useState } from "react"
import { Image as RNImage, StyleSheet, TouchableOpacity, View } from "react-native"
import { PhotoSkeleton } from "../PhotoSkeleton/PhotoSkeleton"

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
  const radius = isCircle ? px / 2 : 8
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setReady(false)
    setFailed(false)
  }, [src])

  const frameStyle = [
    styles.frame,
    {
      width: px,
      height: px,
      borderRadius: radius,
    },
  ]

  const imageNode = (
    <View style={styles.stack}>
      <RNImage
        source={{ uri: src }}
        accessibilityLabel={alt}
        style={{ width: px, height: px }}
        resizeMode="cover"
        onLoad={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      {!ready && !failed ? (
        <View pointerEvents="none" style={styles.skeleton}>
          <PhotoSkeleton borderRadius={radius} />
        </View>
      ) : null}
    </View>
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
  stack: {
    width: "100%",
    height: "100%",
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
  },
})
