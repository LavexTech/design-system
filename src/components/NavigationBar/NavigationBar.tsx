import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from "react-native"
import Constants from "../../constants/constants"
import { useLavexTheme } from "../../theme/LavexThemeProvider"
import { CountBadge } from "../CountBadge/CountBadge"

const TAB_TRANSITION_MS = 400
const BUBBLE_TRANSITION_MS = 300
const BUBBLE_TOP = 12
const BUBBLE_WIDTH = 56
const BUBBLE_HEIGHT = 30

type NavigationBarProps = {
  pages: string[]
  icons?: ((isActive: boolean) => React.ReactNode)[]
  /** Contagem por aba, na ordem de `pages`. Maior que zero mostra o `CountBadge` sobre o ícone. */
  badges?: number[]
  activePage: string
  onNavigate?: (page: string) => void
  darkMode?: boolean
  fontScale?: number
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  pages,
  icons,
  badges,
  activePage,
  onNavigate,
  fontScale = 1,
}: NavigationBarProps) => {
  const { colors } = useLavexTheme()
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
      style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
      onLayout={(event) => {
        const w = event.nativeEvent.layout.width
        setBarWidth((prev) => (Math.abs(prev - w) < 0.5 ? prev : w))
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bubble,
          { backgroundColor: colors.surfaceAccent, top: BUBBLE_TOP, transform: [{ translateX: bubbleX }] },
        ]}
      />
      {pages.map((page, index) => (
        <NavTab
          key={page}
          page={page}
          isActive={activePage === page}
          icon={icons?.[index]}
          badge={badges?.[index]}
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
  badge?: number
  fontScale: number
  onNavigate?: (page: string) => void
}

const NavTab = memo(function NavTab({ page, isActive, icon, badge, fontScale, onNavigate }: NavTabProps) {
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
      accessibilityLabel={badge && badge > 0 ? `${page}, ${badge} não lidas` : page}
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
        {badge && badge > 0 ? (
          <View pointerEvents="none" style={styles.badge}>
            <CountBadge count={badge} />
          </View>
        ) : null}
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
  const { colors } = useLavexTheme()
  const color = isActive ? colors.accent : colors.textMuted

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
    borderTopWidth: Constants.styles.borderWidth.HAIRLINE,
    shadowColor: Constants.styles.shadowColor.DEFAULT,
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
  badge: { position: "absolute", top: -2, left: "50%", marginLeft: 6, zIndex: 2 },
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
