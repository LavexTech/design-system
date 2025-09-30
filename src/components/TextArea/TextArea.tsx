import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Constants from "../../constants/constants";

export interface TextAreaProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  placeholder,
  maxLength,
  onChange,
}: TextAreaProps) => {
  const handleChange = (text: string) => {
    if (maxLength && text.length > maxLength) {
      return;
    }
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textArea}
        value={value}
        placeholder={placeholder}
        onChangeText={handleChange}
        multiline={true}
        textAlignVertical="top"
      />
      {maxLength && (
        <Text style={styles.charCounter}>
          {value.length}/{maxLength} caracteres
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Constants.styles.spacing.MEDIUM,
  },
  label: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    marginBottom: Constants.styles.spacing.SMALL,
  },
  textArea: {
    borderWidth: Constants.styles.borderWidth.REGULAR,
    borderColor: Constants.styles.borderColor.MEDIUM,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    padding: Constants.styles.spacing.MEDIUM,
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCounter: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    marginTop: Constants.styles.spacing.SMALL,
    textAlign: "right",
  },
});
