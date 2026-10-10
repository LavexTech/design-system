import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from "react-native"
import Constants from "../../constants/constants"

const TAB_ACTIVE_COLOR = Constants.styles.brand.DARK
const TAB_INACTIVE_COLOR = Constants.styles.text.MUTED
const TAB_TRANSITION_MS = 400
const BUBBLE_TRANSITION_MS = 300
const BUBBLE_TOP = 12
const BUBBLE_WIDTH = 56
const BUBBLE_HEIGHT = 30

type NavigationBarProps = {
  pages: string[]
  icons?: ((isActive: boolean) => React.ReactNode)[]
  activePage: string
  onNavigate?: (page: string) => void
  darkMode?: boolean
  fontScale?: number
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  pages,
  icons,
  activePage,
  onNavigate,
  darkMode = false,
  fontScale = 1,
}: NavigationBarProps) => {
  const [barWidth, setBarWidth] = useState(0)
  const bubbleX = useRef(new Animated.Value(0)).current
  const bubbleReady = useRef(false)
  const activeIndex = Math.max(0, pages.indexOf(activePage))

  useEffect(() => {
    if (barWidth <= 0 || pages.length === 0) return
    const tabWidth = barWidth / pages.length
    const nextX = activeIndex * tabWidth + (tabWidth - BUBBLE_WIDTH) / 2
    if (!bubbleReady.current) {
      bubbleX.setValue(nextX)
      bubbleReady.current = true
      return
    }
    Animated.timing(bubbleX, {
      toValue: nextX,
      duration: BUBBLE_TRANSITION_MS,
      useNativeDriver: true,
    }).start()
  }, [activeIndex, barWidth, bubbleX, pages.length])

  return (
    <View
      style={[styles.container, darkMode ? styles.containerDark : null]}
      onLayout={(event) => {
        const w = event.nativeEvent.layout.width
        setBarWidth((prev) => (Math.abs(prev - w) < 0.5 ? prev : w))
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bubble,
          { top: BUBBLE_TOP, transform: [{ translateX: bubbleX }] },
        ]}
      />
      {pages.map((page, index) => (
        <NavTab
          key={page}
          page={page}
          isActive={activePage === page}
          icon={icons?.[index]}
          fontScale={fontScale}
          onNavigate={onNavigate}
        />
      ))}
    </View>
  )
}

type NavTabProps = {
  page: string
  isActive: boolean
  icon?: (isActive: boolean) => React.ReactNode
  fontScale: number
  onNavigate?: (page: string) => void
}

const NavTab = memo(function NavTab({ page, isActive, icon, fontScale, onNavigate }: NavTabProps) {
  const progress = useRef(new Animated.Value(isActive ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isActive ? 1 : 0,
      duration: TAB_TRANSITION_MS,
      useNativeDriver: true,
    }).start()
  }, [isActive, progress])

  const inactiveOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  const handlePress = useCallback(() => {
    onNavigate?.(page)
  }, [onNavigate, page])

  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={page}
      style={[styles.tab, Platform.OS === "ios" ? styles.tabIos : null]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.tabFace}>
        <Animated.View style={{ opacity: inactiveOpacity }}>
          <TabFace icon={icon} isActive={false} label={page} fontScale={fontScale} />
        </Animated.View>
        <Animated.View style={[styles.tabFaceOverlay, { opacity: progress }]}>
          <TabFace icon={icon} isActive label={page} fontScale={fontScale} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
})

const TabFace = memo(function TabFace({
  icon,
  isActive,
  label,
  fontScale,
}: {
  icon?: (isActive: boolean) => React.ReactNode
  isActive: boolean
  label: string
  fontScale: number
}) {
  const color = isActive ? TAB_ACTIVE_COLOR : TAB_INACTIVE_COLOR

  return (
    <View style={styles.face}>
      {icon ? (
        <View style={styles.iconContainer}>
          {icon(isActive)}
        </View>
      ) : null}
      <Text
        style={[
          styles.tabText,
          {
            color,
            fontSize: 13 * fontScale,
            lineHeight: 18 * fontScale,
            fontWeight: isActive ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: Constants.styles.componentSize.NAVIGATION_BAR_HEIGHT,
    flexDirection: "row",
    backgroundColor: Constants.styles.surface.DEFAULT,
    borderTopWidth: Constants.styles.borderWidth.HAIRLINE,
    borderTopColor: Constants.styles.border.SOFT,
    shadowColor: Constants.styles.shadowColor.DEFAULT,
  },
  containerDark: {
    backgroundColor: Constants.styles.theme.dark.background.surface,
    borderTopColor: Constants.styles.theme.dark.border.default,
  },
  tab: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.styles.spacing.TINY,
    paddingBottom: Constants.styles.spacing.TINY,
  },
  tabIos: {
    paddingTop: Constants.styles.spacing.TINY + 6,
    paddingBottom: Constants.styles.spacing.TINY + 10,
  },
  tabFace: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabFaceOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  face: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    position: "absolute",
    left: 0,
    width: BUBBLE_WIDTH,
    height: BUBBLE_HEIGHT,
    borderRadius: BUBBLE_HEIGHT / 2,
    backgroundColor: Constants.styles.surface.ACCENT,
    zIndex: 0,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    minWidth: BUBBLE_WIDTH,
    height: BUBBLE_HEIGHT,
    zIndex: 1,
  },
  tabText: {
    fontWeight: Constants.styles.fontWeight.NORMAL as any,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    textAlign: "center",
  },
})
