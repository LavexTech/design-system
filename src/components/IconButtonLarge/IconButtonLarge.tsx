import React from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Constants from "../../constants/constants"
import { TextBox as Text } from "../Text/Text"
import { Info } from "../Info/Info"
import { IconCreditCard } from "../Icons/IconCreditCard"
import { IconMessageSquare } from "../Icons/IconMessageSquare"
import { IconChevronRight } from "../Icons/IconChevronRight"

type IconButtonLargeName = "credit-card" | "message-square"

type IconButtonLargeProps = {
  icon: IconButtonLargeName
  title: string
  description: string
  onClick: () => void
  /** `first` arredonda os cantos superiores; `last`, os inferiores; `middle` fica reto e cola na borda do anterior. */
  position?: "first" | "middle" | "last"
}

const ICONS: Record<IconButtonLargeName, React.ComponentType<{ size?: number; color?: string }>> = {
  "credit-card": IconCreditCard,
  "message-square": IconMessageSquare,
}

const RADIUS = Constants.styles.borderRadius["2XL"]
const BORDER = Constants.styles.borderWidth.HAIRLINE
const ICON_BOX = 40

export const IconButtonLarge: React.FC<IconButtonLargeProps> = ({
  icon,
  title,
  description,
  onClick,
  position,
}) => {
  const Icon = ICONS[icon]
  const isFirst = position === "first"
  const isLast = position === "last"

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      onPress={onClick}
      style={({ pressed }) => [
        styles.button,
        {
          borderTopLeftRadius: isFirst ? RADIUS : 0,
          borderTopRightRadius: isFirst ? RADIUS : 0,
          borderBottomLeftRadius: isLast ? RADIUS : 0,
          borderBottomRightRadius: isLast ? RADIUS : 0,
          marginTop: position === "middle" || isLast ? -BORDER : 0,
          backgroundColor: pressed ? Constants.styles.surface.SUBTLE : Constants.styles.surface.DEFAULT,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.iconColumn}>
          <View style={styles.iconBox}>
            <Icon size={22} color={Constants.styles.text.DEFAULT} />
          </View>
        </View>
        <View style={styles.texts}>
          <Text text={title} fill={false} bold />
          <Info text={description} />
        </View>
        <View style={styles.chevron}>
          <IconChevronRight size={20} color={Constants.styles.text.MUTED} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    borderWidth: BORDER,
    borderColor: Constants.styles.border.SOFT,
    paddingVertical: Constants.styles.spacing.MEDIUM,
    paddingHorizontal: Constants.styles.spacing.SMALL,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconColumn: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    width: ICON_BOX,
    height: ICON_BOX,
    borderRadius: Constants.styles.borderRadius.LARGE,
    backgroundColor: Constants.styles.surface.ZINC,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    flex: 9,
    gap: 2,
    justifyContent: "center",
    minWidth: 0,
  },
  chevron: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
