import React from "react"
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
  disabled?: boolean
}

const C = Constants.styles

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onAdd,
  onRemove,
  onPressImage,
  maxImages,
  columns = 3,
  addLabel = "Adicionar",
  disabled = false,
}) => {
  const labelFont = useResolvedFontFamily(C.fontFamily.BOLD)
  const showAdd = maxImages == null || images.length < maxImages
  return (
    <View style={styles.grid}>
      {images.map((uri, index) => (
        <Pressable key={`${uri}-${index}`} style={styles.cell} onPress={() => onPressImage?.(uri, index)}>
          <RNImage source={{ uri }} style={styles.photo} />
          {onRemove && !disabled ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Remover foto" onPress={() => onRemove(uri, index)} style={styles.remove}>
              <View style={styles.removeDot}>
                <IconClose size={14} color={C.color.WHITE} />
              </View>
            </Pressable>
          ) : null}
        </Pressable>
      ))}
      {showAdd ? (
        <Pressable accessibilityRole="button" accessibilityLabel={addLabel} disabled={disabled} onPress={onAdd} style={[styles.cell, styles.add, { width: `${100 / columns}%` as any }]}>
          <IconCamera size={24} color={C.brand.DARK} />
          <Text style={[styles.addLabel, { fontFamily: labelFont, fontWeight: "normal" }]}>{addLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: { alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap", gap: 12 },
  cell: { width: "30%", aspectRatio: 1, borderRadius: C.borderRadius.XL, overflow: "visible" },
  photo: { width: "100%", height: "100%", borderRadius: C.borderRadius.XL, backgroundColor: C.border.SOFT },
  add: { borderWidth: C.borderWidth.INTERACTIVE, borderStyle: "dashed", borderColor: C.brand.DARK, backgroundColor: C.surface.DEFAULT, alignItems: "center", justifyContent: "center", gap: 6 },
  addLabel: { color: C.brand.DARK, fontSize: C.fontSize.LABEL, textAlign: "center" },
  remove: { position: "absolute", top: -6, right: -6, width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  removeDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: C.brand.SURFACE, alignItems: "center", justifyContent: "center" },
})
