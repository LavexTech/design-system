import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Image } from "../Image/Image";

export type GalleryClickHandler = (imageUrl: string, index: number) => void;

export interface GalleryProps {
    images: string[];
    onClick?: GalleryClickHandler;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onClick }: GalleryProps) => {
    return (
        <View style={styles.container}>
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
                        size={80}
                        onClick={onClick ? (imageUrl: string, index: number) => onClick(imageUrl, index) : undefined}
                        style={styles.image}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    scrollContent: {
        paddingHorizontal: 4,
        gap: 12,
    },
    image: {
        borderRadius: 16,
    },
});
