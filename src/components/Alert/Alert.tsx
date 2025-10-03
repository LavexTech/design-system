import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { TextBox as Text } from "../Text/Text";
import Constants from "../../constants/constants";

export interface AlertProps {
    text: string;
    icon?: string;
    type: "danger" | "success" | "info";
    onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ text, icon, type, onClose }) => {
    const getAlertStyles = () => {
        switch (type) {
            case "danger":
                return {
                    backgroundColor: "#FEF2F2",
                    borderColor: Constants.styles.textColor.DANGER,
                    iconColor: Constants.styles.textColor.DANGER,
                };
            case "success":
                return {
                    backgroundColor: "#F0FDF4",
                    borderColor: Constants.styles.textColor.SUCCESS,
                    iconColor: Constants.styles.textColor.SUCCESS,
                };
            case "info":
                return {
                    backgroundColor: "#F8FAFC",
                    borderColor: Constants.styles.textColor.INFO,
                    iconColor: Constants.styles.textColor.INFO,
                };
            default:
                return {
                    backgroundColor: "#F8FAFC",
                    borderColor: Constants.styles.textColor.INFO,
                    iconColor: Constants.styles.textColor.INFO,
                };
        }
    };

    const alertStyles = getAlertStyles();

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.alertContainer, { backgroundColor: alertStyles.backgroundColor, borderColor: alertStyles.borderColor }]}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text text="✕" style={[styles.closeIcon, { color: alertStyles.iconColor }]} />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        {icon && (
                            <View style={styles.iconContainer}>
                                <Text
                                    text={icon}
                                    style={[styles.icon, { color: alertStyles.iconColor }]}
                                />
                            </View>
                        )}
                        <View style={styles.textContainer}>
                            <Text text={text} style={styles.text} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Constants.styles.spacing.LARGE,
    },
    alertContainer: {
        backgroundColor: Constants.styles.backgroundColor.WHITE,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        borderWidth: Constants.styles.borderWidth.REGULAR,
        padding: Constants.styles.spacing.LARGE,
        width: "100%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        position: "relative",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: Constants.styles.spacing.MEDIUM,
    },
    iconContainer: {
        marginRight: Constants.styles.spacing.MEDIUM,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: Constants.styles.fontSize.LARGER,
    },
    textContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        lineHeight: Constants.styles.fontSize.MEDIUM * 1.4,
        textAlign: "center",
    },
    closeButton: {
        position: "absolute",
        top: Constants.styles.spacing.MEDIUM,
        right: Constants.styles.spacing.MEDIUM,
        padding: Constants.styles.spacing.SMALL,
        borderRadius: Constants.styles.borderRadius.SMALL,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 32,
        minHeight: 32,
    },
    closeIcon: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontWeight: Constants.styles.fontWeight.BOLD,
    },
});
