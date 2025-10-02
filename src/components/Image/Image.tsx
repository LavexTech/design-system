import React from "react";
import { Image as RNImage, TouchableOpacity, StyleSheet, ImageStyle } from "react-native";
import Constants from "../../constants/constants";

export interface ImageProps {
    src: string;
    alt: string;
    onClick?: () => void;
    size?: number;
    style?: ImageStyle;
}

export const Image: React.FC<ImageProps> = ({ src, alt, onClick, size = 100, style }) => {
    const imageStyle = [
        styles.image,
        {
            width: size,
            height: size,
            borderRadius: size / 2,
        },
        style,
    ];

    if (onClick) {
        return (
            <TouchableOpacity onPress={onClick} activeOpacity={0.7}>
                <RNImage
                    source={{ uri: src }}
                    style={imageStyle}
                    accessibilityLabel={alt}
                    accessibilityRole="image"
                />
            </TouchableOpacity>
        );
    }

    return (
        <RNImage
            source={{ uri: src }}
            style={imageStyle}
            accessibilityLabel={alt}
            accessibilityRole="image"
        />
    );
};

const styles = StyleSheet.create({
    image: {
        backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY,
        borderWidth: Constants.styles.borderWidth.THIN,
        borderColor: Constants.styles.borderColor.LIGHT,
    },
});
