import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextBox as Text } from "../Text/Text";
import Constants from "../../constants/constants";

export interface UserInfoProps {
  user: {
    [key: string]: any;
  };
  type: string;
  onClick?: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, type, onClick }) => {
  const getLabel = (type: string): string => {
    const labels: { [key: string]: string } = {
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      address: "Endereço",
      bio: "Bio",
      age: "Idade",
      city: "Cidade",
      country: "País",
      website: "Website",
      company: "Empresa",
      position: "Cargo",
      department: "Departamento",
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getValue = (user: any, type: string): string => {
    return user[type] || "";
  };

  const label = getLabel(type);
  const value = getValue(user, type);

  const Content = () => (
    <View style={styles.container}>
      <Text text={label} />
      <Text text={value} />
    </View>
  );

  if (onClick) {
    return (
      <TouchableOpacity onPress={onClick} style={styles.touchableContainer}>
        <Content />
      </TouchableOpacity>
    );
  }

  return <Content />;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Constants.styles.spacing.SMALL,
  },
  touchableContainer: {
    marginBottom: Constants.styles.spacing.SMALL,
  },
  label: {
    fontSize: Constants.styles.fontSize.SMALL,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.INFO,
    marginBottom: Constants.styles.spacing.TINY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    lineHeight: Constants.styles.fontSize.MEDIUM * 1.4,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
