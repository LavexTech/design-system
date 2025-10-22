import React from "react";
import { TextBox as Text } from "../Text/Text";
import { View, StyleSheet, Dimensions } from "react-native";
import { InfoAlertIcon } from "../Icons/InfoAlertIcon";
import Constants from "../../constants/constants";

export interface AlertProps {
    text: string;
}

export const Alert: React.FC<AlertProps> = ({ text }) => {

    return (
        <View style={styles.container}>
            <View style={styles.alertBox}>
                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <InfoAlertIcon />
                    </View>
                    <View style={styles.textContainer}>
                        <Text text={text} size="medium" position="center" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Constants.styles.spacing.MEDIUM,
        paddingVertical: Constants.styles.spacing.LARGE,
        minHeight: 200,
    },
    alertBox: {
        width: '100%',
        maxWidth: Math.min(width * 0.9, 400),
        backgroundColor: '#FFFFFF',
        padding: Constants.styles.spacing.LARGE,
        borderRadius: Constants.styles.borderRadius.LARGE,
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: Constants.styles.spacing.MEDIUM,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});