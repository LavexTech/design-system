import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Image } from "../Image/Image"
import Constants from "@/src/constants/constants"

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
                <Image
                    key={`${imageUrl}-${index}`}
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    size="md"
                    onClick={onClick ? () => onClick(imageUrl, index) : undefined}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: Constants.styles.spacing.TINY,
        gap: Constants.styles.gallery.CONTAINER_GAP,
    }
})
