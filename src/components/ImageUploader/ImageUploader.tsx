import React, { useEffect, useRef, useState } from "react"
import { Animated, Easing, Image as RNImage, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import Constants from "../../constants/constants"
import { useResolvedFontFamily } from "../../fontSetup"
import { IconCamera } from "../Icons/IconCamera"
import { IconClose } from "../Icons/IconClose"

type ImageUploaderProps = {
  images: string[]
  onAdd: () => void
  onRemove?: (imageUrl: string, index: number) => void
  onPressImage?: (imageUrl: string, index: number) => void
  maxImages?: number
  columns?: number
  addLabel?: string
  addIcon?: React.ReactNode
  disabled?: boolean
}

const C = Constants.styles
const ITEM_SCALE = 0.9
const ZOOM_MS = 300

type Frame = { x: number; y: number; width: number; height: number }

function containedFrame(imgW: number, imgH: number, screenW: number, screenH: number): Frame {
  const scale = Math.min(screenW / imgW, screenH / imgH)
  const width = imgW * scale
  const height = imgH * scale
  return {
    x: (screenW - width) / 2,
    y: (screenH - height) / 2,
    width,
    height,
  }
}

function PhotoZoom({ uri, origin, onClose }: { uri: string; origin: Frame; onClose: () => void }) {
  const { width: screenW, height: screenH } = useWindowDimensions()
  const progress = useRef(new Animated.Value(0)).current
  const closing = useRef(false)
  const [target, setTarget] = useState<Frame | null>(null)

  useEffect(() => {
    let alive = true
    RNImage.getSize(
      uri,
      (imgW, imgH) => {
        if (!alive || imgW <= 0 || imgH <= 0) {
          return
        }
        setTarget(containedFrame(imgW, imgH, screenW, screenH))
      },
      () => {
        if (!alive) {
          return
        }
        const size = Math.min(screenW, screenH)
        setTarget(containedFrame(size, size, screenW, screenH))
      }
    )
    return () => {
      alive = false
    }
  }, [uri, screenW, screenH])

  useEffect(() => {
    if (!target) {
      return
    }
    progress.setValue(0)
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: ZOOM_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    })
    animation.start()
    return () => animation.stop()
  }, [target, progress])

  function dismiss() {
    if (closing.current || !target) {
      return
    }
    closing.current = true
    Animated.timing(progress, {
      toValue: 0,
      duration: ZOOM_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onClose()
      }
    })
  }

  const end = target ?? origin
  const left = progress.interpolate({ inputRange: [0, 1], outputRange: [origin.x, end.x] })
  const top = progress.interpolate({ inputRange: [0, 1], outputRange: [origin.y, end.y] })
  const width = progress.interpolate({ inputRange: [0, 1], outputRange: [origin.width, end.width] })
  const height = progress.interpolate({ inputRange: [0, 1], outputRange: [origin.height, end.height] })
  const radius = progress.interpolate({ inputRange: [0, 1], outputRange: [C.borderRadius.XL, 0] })

  return (
    <Modal transparent visible animationType="none" statusBarTranslucent onRequestClose={dismiss}>
      <View style={styles.zoomRoot}>
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"],
              }),
            },
          ]}
        />
        <Pressable accessibilityLabel="Fechar foto" style={StyleSheet.absoluteFill} onPress={dismiss} />
        <Animated.View style={{ position: "absolute", left, top, width, height, borderRadius: radius, overflow: "hidden" }}>
          <Pressable accessibilityLabel="Fechar foto" style={styles.zoomPhoto} onPress={dismiss}>
            <RNImage source={{ uri }} resizeMode="cover" style={styles.photo} />
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  )
}

function PhotoCell({
  uri,
  index,
  size,
  onOpen,
  onRemove,
  showRemove,
}: {
  uri: string
  index: number
  size: number
  onOpen: (origin: Frame) => void
  onRemove?: (imageUrl: string, index: number) => void
  showRemove: boolean
}) {
  const cellRef = useRef<View>(null)

  function open() {
    cellRef.current?.measureInWindow((x, y, width, height) => {
      if (width <= 0 || height <= 0) {
        return
      }
      onOpen({ x, y, width, height })
    })
  }

  return (
    <Pressable ref={cellRef} style={[styles.cell, { width: size, height: size }]} onPress={open}>
      <RNImage source={{ uri }} style={styles.photo} />
      {showRemove && onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remover foto"
          onPress={(event) => {
            const press = event as { stopPropagation?: () => void }
            press.stopPropagation?.()
            onRemove(uri, index)
          }}
          style={styles.remove}
        >
          <View style={styles.removeDot}>
            <IconClose size={14} color={C.color.WHITE} />
          </View>
        </Pressable>
      ) : null}
    </Pressable>
  )
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onAdd,
  onRemove,
  onPressImage,
  maxImages,
  columns = 3,
  addLabel = "Adicionar",
  addIcon,
  disabled = false,
}) => {
  const labelFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const showAdd = maxImages == null || images.length < maxImages
  const [containerWidth, setContainerWidth] = useState(0)
  const [zoom, setZoom] = useState<{ uri: string; origin: Frame } | null>(null)
  const columnCount = Math.max(1, columns)
  const itemSize = containerWidth > 0 ? Math.floor((containerWidth / columnCount) * ITEM_SCALE) : 0
  const rowGap = columnCount > 1 ? (containerWidth - itemSize * columnCount) / (columnCount - 1) : 0

  const slots: { key: string; node: React.ReactNode }[] = []
  if (showAdd) {
    slots.push({
      key: "add",
      node: (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={addLabel || "Adicionar foto"}
          disabled={disabled}
          onPress={onAdd}
          style={[styles.cell, styles.add, { width: itemSize, height: itemSize }]}
        >
          {addIcon ?? <IconCamera size={24} color={C.brand.DARK} />}
          {addLabel ? (
            <Text style={[styles.addLabel, { fontFamily: labelFont, fontWeight: "normal" }]}>{addLabel}</Text>
          ) : null}
        </Pressable>
      ),
    })
  }
  images.forEach((uri, index) => {
    slots.push({
      key: `${uri}-${index}`,
      node: (
        <PhotoCell
          uri={uri}
          index={index}
          size={itemSize}
          showRemove={Boolean(onRemove) && !disabled}
          onRemove={onRemove}
          onOpen={(origin) => {
            onPressImage?.(uri, index)
            setZoom({ uri, origin })
          }}
        />
      ),
    })
  })

  const rows: { key: string; node: React.ReactNode }[][] = []
  for (let index = 0; index < slots.length; index += columnCount) {
    rows.push(slots.slice(index, index + columnCount))
  }

  return (
    <View style={[styles.grid, { gap: rowGap }]} onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}>
      {itemSize > 0
        ? rows.map((row, rowIndex) => {
            const full = row.length === columnCount
            return (
              <View key={`row-${rowIndex}`} style={[styles.row, full ? styles.rowFull : styles.rowStart, full ? null : { gap: rowGap }]}>
                {row.map((slot) => (
                  <View key={slot.key}>{slot.node}</View>
                ))}
              </View>
            )
          })
        : null}
      {zoom ? <PhotoZoom uri={zoom.uri} origin={zoom.origin} onClose={() => setZoom(null)} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { alignSelf: "stretch" },
  row: { flexDirection: "row", alignItems: "flex-start" },
  rowFull: { justifyContent: "space-between" },
  rowStart: { justifyContent: "flex-start" },
  cell: { borderRadius: C.borderRadius.XL, overflow: "visible" },
  photo: { width: "100%", height: "100%", borderRadius: C.borderRadius.XL, backgroundColor: C.border.SOFT },
  add: { borderWidth: 2, borderStyle: "dashed", borderColor: C.brand.DARK, backgroundColor: C.surface.DEFAULT, alignItems: "center", justifyContent: "center", gap: 6 },
  addLabel: { color: C.brand.DARK, fontSize: C.fontSize.LABEL, textAlign: "center" },
  remove: { position: "absolute", top: -6, right: -6, width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  removeDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.brand.SURFACE, alignItems: "center", justifyContent: "center" },
  zoomRoot: { flex: 1 },
  zoomPhoto: { flex: 1 },
})
