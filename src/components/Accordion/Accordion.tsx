import React, { createContext, useContext, useState } from "react"
import {
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
  Text,
  StyleSheet,
} from "react-native"
import { Divider } from "../Divider/Divider"
import { IconChevronDown } from "../Icons/IconChevronDown"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const ACCORDION_ANIMATION = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
}

type AccordionContextValue = {
  expandedId: string | null
  toggle: (id: string) => void
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedId: null,
  toggle: () => {},
})

type AccordionItemProps = {
  id: string
  title: string
  /** Renders immediately after the title (e.g. status Tag). */
  titleAccessory?: React.ReactNode
  /** Renders before the title inside the header (e.g. back chevron). */
  leading?: React.ReactNode
  trailingAccessory?: React.ReactNode
  contentBackground?: string
  children: React.ReactNode
  darkMode?: boolean
  fontScale?: number
}

type AccordionProps = {
  children: React.ReactNode
  darkMode?: boolean
  /** When set, the matching AccordionItem id starts expanded. */
  defaultValue?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  titleAccessory,
  leading,
  trailingAccessory,
  contentBackground,
  children,
  darkMode = false,
  fontScale = 1,
}) => {
  const { expandedId, toggle } = useContext(AccordionContext)
  const expanded = expandedId === id
  const titleFont = useResolvedFontFamily(Constants.styles.fontFamily.BOLD)
  const theme = darkMode ? Constants.styles.theme.dark : Constants.styles.theme.light

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => toggle(id)}
        style={styles.triggerRow}
      >
        <View style={styles.titleRow}>
          {leading ? <View style={styles.leading}>{leading}</View> : null}
          <View style={styles.titleCluster}>
            <Text
              style={{
                color: theme.text.default,
                fontSize: Constants.styles.fontSize.MEDIUM * fontScale,
                flexShrink: 1,
                fontFamily: titleFont,
                fontWeight: titleFont ? "normal" : "700",
              }}
            >
              {title}
            </Text>
            {titleAccessory ? <View style={styles.titleAccessory}>{titleAccessory}</View> : null}
          </View>
        </View>
        {trailingAccessory ? <View style={styles.trailing}>{trailingAccessory}</View> : null}
        <View style={[styles.chevron, expanded ? styles.chevronOpen : null]}>
          <IconChevronDown size={20} color={theme.text.default} />
        </View>
      </Pressable>
      {expanded ? (
        <View style={contentBackground ? { backgroundColor: contentBackground, padding: 16 } : undefined}>
          {children}
        </View>
      ) : null}
      <Divider darkMode={darkMode} />
    </>
  )
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  darkMode = false,
  defaultValue,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(defaultValue ?? null)
  const theme = darkMode ? Constants.styles.theme.dark : Constants.styles.theme.light

  function toggle(id: string) {
    LayoutAnimation.configureNext(ACCORDION_ANIMATION)
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <AccordionContext.Provider value={{ expandedId, toggle }}>
      <View style={{ backgroundColor: theme.background.surface, alignSelf: "stretch" }}>
        {children}
      </View>
    </AccordionContext.Provider>
  )
}

const styles = StyleSheet.create({
  triggerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  titleRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    marginRight: Constants.styles.spacing.MEDIUM,
  },
  leading: {
    marginRight: Constants.styles.spacing.SMALL,
    flexShrink: 0,
  },
  titleCluster: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    flexGrow: 0,
    maxWidth: "100%",
    gap: Constants.styles.spacing.SMALL,
  },
  trailing: { marginRight: 8 },
  titleAccessory: {
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  chevron: {
    flexShrink: 0,
    marginLeft: Constants.styles.spacing.SMALL,
  },
  chevronOpen: {
    transform: [{ rotate: "180deg" }],
  },
})
