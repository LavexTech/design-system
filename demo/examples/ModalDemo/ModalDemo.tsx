import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Modal } from "@src/components/Modal/Modal";
import Constants from "@src/constants/constants";

export const ModalDemo: React.FC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal Component Demo</Text>

            <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={() => setShowSuccessModal(true)}
            >
                <Text style={styles.buttonText}>Mostrar Modal de Sucesso</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.confirmationButton]}
                onPress={() => setShowConfirmationModal(true)}
            >
                <Text style={styles.buttonText}>Mostrar Modal de Confirmação</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.infoButton]}
                onPress={() => setShowInfoModal(true)}
            >
                <Text style={styles.buttonText}>Mostrar Modal de Informação</Text>
            </TouchableOpacity>

            <Modal
                title="Sucesso!"
                text="Operação realizada com sucesso. Seus dados foram salvos corretamente."
                buttonText="Entendi"
                onClose={() => setShowSuccessModal(false)}
                visible={showSuccessModal}
            />

            <Modal
                title="Atenção!"
                text="Deseja realmente excluir este item? Esta ação não pode ser desfeita."
                buttonText="Confirmar"
                onClose={() => setShowConfirmationModal(false)}
                visible={showConfirmationModal}
            />

            <Modal
                title="Informação Importante"
                text="Esta funcionalidade estará disponível na próxima versão do aplicativo. Agradecemos sua compreensão."
                buttonText="Fechar"
                onClose={() => setShowInfoModal(false)}
                visible={showInfoModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.styles.spacing.LARGE,
        backgroundColor: Constants.styles.backgroundColor.LIGHT_GRAY,
        justifyContent: "center",
    },
    title: {
        fontSize: Constants.styles.fontSize.LARGER,
        fontWeight: Constants.styles.fontWeight.BOLD,
        fontFamily: Constants.styles.fontFamily.BOLD,
        color: Constants.styles.textColor.DEFAULT,
        textAlign: "center",
        marginBottom: Constants.styles.spacing.EXTRA_LARGE,
    },
    button: {
        paddingHorizontal: Constants.styles.spacing.LARGE,
        paddingVertical: Constants.styles.spacing.MEDIUM,
        borderRadius: Constants.styles.borderRadius.MEDIUM,
        marginBottom: Constants.styles.spacing.MEDIUM,
        alignItems: "center",
    },
    successButton: {
        backgroundColor: Constants.styles.textColor.SUCCESS,
    },
    confirmationButton: {
        backgroundColor: Constants.styles.textColor.DANGER,
    },
    infoButton: {
        backgroundColor: Constants.styles.textColor.INFO,
    },
    buttonText: {
        fontSize: Constants.styles.fontSize.MEDIUM,
        fontWeight: Constants.styles.fontWeight.BOLD,
        fontFamily: Constants.styles.fontFamily.BOLD,
        color: Constants.styles.backgroundColor.WHITE,
    },
});
