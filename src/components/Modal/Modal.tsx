import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal as RNModal,
    StyleSheet,
    Dimensions,
} from "react-native";
import Constants from "../../constants/constants";

export interface ModalProps {
    title: string;
    text: string;
    buttonText: string;
    onClose: () => void;
    visible?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    text,
    buttonText,
    onClose,
    visible = true,
}) => {
    return (
        <RNModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.text}>{text}</Text>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
    },
    modalContainer: {
        backgroundColor: Constants.styles.backgroundColor.WHITE,
        borderRadius: Constants.styles.borderRadius.LARGE,
        padding: Constants.styles.spacing.LARGE,
        width: width * 0.85,
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalContent: {
        alignItems: "center",
    },
    title: {
        fontSize: Constants.styles.fontSize.LARGER,
        fontWeight: Constants.styles.fontWeight.BOLD,
        fontFamily: Constants.styles.fontFamily.BOLD,
        color: Constants.styles.textColor.DEFAULT,
        textAlign: "center",
        marginBottom: Constants.styles.spacing.MEDIUM,
    },
    text: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontWeight: Constants.styles.fontWeight.NORMAL,
        fontFamily: Constants.styles.fontFamily.REGULAR,
        color: Constants.styles.textColor.DEFAULT,
        textAlign: "center",
        lineHeight: Constants.styles.fontSize.MEDIUM * 1.4,
        marginBottom: Constants.styles.spacing.LARGE,
    },
    button: {
        backgroundColor: Constants.styles.textColor.DEFAULT,
        paddingHorizontal: Constants.styles.spacing.LARGE,
        paddingVertical: Constants.styles.spacing.MEDIUM,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        minWidth: 120,
    },
    buttonText: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontWeight: Constants.styles.fontWeight.BOLD,
        fontFamily: Constants.styles.fontFamily.BOLD,
        color: Constants.styles.backgroundColor.WHITE,
        textAlign: "center",
    },
});
