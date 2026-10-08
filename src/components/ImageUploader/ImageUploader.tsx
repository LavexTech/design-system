import React, { useState } from "react"
import { Image as RNImage, Pressable, StyleSheet, Text, View } from "react-native"
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
        <Pressable style={[styles.cell, { width: itemSize, height: itemSize }]} onPress={() => onPressImage?.(uri, index)}>
          <RNImage source={{ uri }} style={styles.photo} />
          {onRemove && !disabled ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Remover foto" onPress={() => onRemove(uri, index)} style={styles.remove}>
              <View style={styles.removeDot}>
                <IconClose size={14} color={C.color.WHITE} />
              </View>
            </Pressable>
          ) : null}
        </Pressable>
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
        ? rows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((slot) => (
                <View key={slot.key}>{slot.node}</View>
              ))}
            </View>
          ))
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { alignSelf: "stretch" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cell: { borderRadius: C.borderRadius.XL, overflow: "visible" },
  photo: { width: "100%", height: "100%", borderRadius: C.borderRadius.XL, backgroundColor: C.border.SOFT },
  add: { borderWidth: 2, borderStyle: "dashed", borderColor: C.brand.DARK, backgroundColor: C.surface.DEFAULT, alignItems: "center", justifyContent: "center", gap: 6 },
  addLabel: { color: C.brand.DARK, fontSize: C.fontSize.LABEL, textAlign: "center" },
  remove: { position: "absolute", top: -6, right: -6, width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  removeDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.brand.SURFACE, alignItems: "center", justifyContent: "center" },
})
