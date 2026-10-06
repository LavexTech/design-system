import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Image } from "../Image/Image"
import Constants from "../../constants/constants"

type GalleryClickHandler = (imageUrl: string, index: number) => void

type GalleryProps = {
    images: string[],
    onClick?: GalleryClickHandler,
}

export const Gallery: React.FC<GalleryProps> = ({ images, onClick }: GalleryProps) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {images.map((imageUrl, index) => (
                <View key={`${imageUrl}-${index}`} style={styles.item}>
                <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    size="md"
                    onClick={onClick ? () => onClick(imageUrl, index) : undefined}
                />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: Constants.styles.spacing.TINY,
        gap: Constants.styles.gallery.CONTAINER_GAP,
    },
    item: {
        borderRadius: Constants.styles.borderRadius.XL,
        overflow: "hidden",
    }
})
