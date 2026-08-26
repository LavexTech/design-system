import React, { useCallback, useEffect, useMemo, useRef } from "react"
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from "react-native"
import Constants from "../../constants/constants"
import { IconTrash } from "../Icons/IconTrash"

const DEFAULT_DELETE_WIDTH = 72
const ACTIVE_OFFSET_X = 10
const FAIL_OFFSET_Y = 10
const OPEN_THRESHOLD_RATIO = 0.45
const OPEN_VELOCITY = 0.45

type SwipeableListItemProps = {
  children: React.ReactNode
  onDelete: () => void
  onPress?: () => void
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  deleteWidth?: number
}

export const SwipeableListItem: React.FC<SwipeableListItemProps> = ({
  children,
  onDelete,
  onPress,
  isOpen,
  onOpenChange,
  deleteWidth = DEFAULT_DELETE_WIDTH,
}) => {
  const translateX = useRef(new Animated.Value(0)).current
  const openRef = useRef(false)
  const dragStartX = useRef(0)
  const isHorizontalSwipe = useRef(false)
  const controlled = isOpen !== undefined

  const animateTo = useCallback(
    (toValue: number, open: boolean) => {
      openRef.current = open
      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start()
    },
    [translateX],
  )

  const setOpen = useCallback(
    (open: boolean) => {
      animateTo(open ? -deleteWidth : 0, open)
      if (!controlled) {
        onOpenChange?.(open)
        return
      }
      if (open !== isOpen) {
        onOpenChange?.(open)
      }
    },
    [animateTo, controlled, deleteWidth, isOpen, onOpenChange],
  )

  useEffect(() => {
    if (!controlled) {
      return
    }
    animateTo(isOpen ? -deleteWidth : 0, !!isOpen)
  }, [animateTo, controlled, deleteWidth, isOpen])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          const { dx, dy } = gestureState
          if (Math.abs(dy) > FAIL_OFFSET_Y && Math.abs(dy) > Math.abs(dx)) {
            isHorizontalSwipe.current = false
            return false
          }
          const claim =
            Math.abs(dx) > ACTIVE_OFFSET_X && Math.abs(dx) > Math.abs(dy)
          isHorizontalSwipe.current = claim
          return claim
        },
        onMoveShouldSetPanResponderCapture: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          const { dx, dy } = gestureState
          return (
            Math.abs(dx) > ACTIVE_OFFSET_X &&
            Math.abs(dx) > Math.abs(dy) &&
            Math.abs(dy) <= FAIL_OFFSET_Y
          )
        },
        onPanResponderTerminationRequest: () => !isHorizontalSwipe.current,
        onPanResponderGrant: () => {
          translateX.stopAnimation((value) => {
            dragStartX.current = typeof value === "number" ? value : 0
          })
        },
        onPanResponderMove: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          const next = Math.min(
            0,
            Math.max(-deleteWidth, dragStartX.current + gestureState.dx),
          )
          translateX.setValue(next)
        },
        onPanResponderRelease: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          isHorizontalSwipe.current = false
          const current = Math.min(
            0,
            Math.max(-deleteWidth, dragStartX.current + gestureState.dx),
          )
          const shouldOpen =
            gestureState.vx < -OPEN_VELOCITY
              ? true
              : gestureState.vx > OPEN_VELOCITY
                ? false
                : current < -deleteWidth * OPEN_THRESHOLD_RATIO
          setOpen(shouldOpen)
        },
        onPanResponderTerminate: () => {
          isHorizontalSwipe.current = false
          setOpen(openRef.current)
        },
      }),
    [deleteWidth, setOpen, translateX],
  )

  const handleContentPress = () => {
    if (openRef.current) {
      setOpen(false)
      return
    }
    onPress?.()
  }

  return (
    <View style={styles.container}>
      <View style={[styles.deleteTrack, { width: deleteWidth }]}>
        <Pressable
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel="Excluir"
          style={styles.deleteButton}
        >
          <IconTrash color={Constants.styles.color.WHITE} size={Constants.styles.icon.MEDIUM} />
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.content,
          { transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Pressable onPress={handleContentPress} style={styles.contentPressable}>
          {children}
        </Pressable>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
  },
  deleteTrack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Constants.styles.textColor.DANGER,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Constants.styles.borderColor.LIGHT,
  },
  contentPressable: {
    width: "100%",
  },
})
