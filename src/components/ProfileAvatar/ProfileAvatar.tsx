import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { Image } from "../Image/Image"
import { IconProfile } from "../Icons/IconProfile"
import Constants from "../../constants/constants"
import { hasProfileImage } from "../../utils/profileImage"

type AvatarSize = "2xs" | "xs" | "sm" | "md"

type ProfileAvatarProps = {
  profileImage?: string | null
  alt: string
  size?: AvatarSize
  onPress?: () => void
  darkMode?: boolean
}

const SIZE_PX: Record<AvatarSize, number> = {
  "2xs": 32,
  xs: 40,
  sm: 64,
  md: 80,
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  profileImage,
  alt,
  size = "sm",
  onPress,
  darkMode = false,
}) => {
  const px = SIZE_PX[size]
  const showPhoto = hasProfileImage(profileImage)

  const content = showPhoto ? (
    <Image
      size={size}
      src={profileImage!.trim()}
      type="circle"
      alt={alt}
      darkMode={darkMode}
      onClick={onPress}
    />
  ) : (
    <View
      style={[
        styles.placeholder,
        {
          width: px,
          height: px,
          borderRadius: px / 2,
          backgroundColor: darkMode
            ? Constants.styles.theme.dark.background.subtle
            : Constants.styles.backgroundColor.GRAY,
        },
      ]}
    >
      <IconProfile
        size={Math.round(px * 0.45)}
        color={
          darkMode
            ? Constants.styles.theme.dark.text.muted
            : Constants.styles.textColor.INFO
        }
      />
    </View>
  )

  if (!onPress || showPhoto) {
    return content
  }

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={alt}>
      {content}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
})
