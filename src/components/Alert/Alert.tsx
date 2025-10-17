import React from "react";
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider";
import { Button } from "../Button/Button";
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
        <GluestackUIProvider>
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}
                onClick={onClose}
            >
                <div 
                    style={{
                        maxWidth: '600px',
                        width: '100%',
                        position: 'relative'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{
                        backgroundColor: alertStyles.backgroundColor,
                        borderColor: alertStyles.borderColor,
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderRadius: '12px',
                        padding: '30px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '120px'
                    }}>
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: '25px'
                        }}>
                            <div style={{
                                fontSize: '18px',
                                lineHeight: '1.5',
                                fontWeight: '500',
                                color: alertStyles.iconColor
                            }}>
                                <Text text={text} />
                            </div>
                        </div>
                        <Button 
                            variant="default" 
                            text="Fechar" 
                            onClick={onClose} 
                        />
                    </div>
                </div>
            </div>
        </GluestackUIProvider>
    );
};
