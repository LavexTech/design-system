import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../constants/constants";
import { Grid } from "../Grid/Grid";

export interface AccordionProps {
  text: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ text, children, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    if (onClick) {
      onClick();
    }
  };

  return (
    <View style={styles.accordion}>
      <Grid columns={1} gap={Constants.styles.spacing.MEDIUM}>
        <TouchableOpacity
          style={styles.header}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.icon}>{isExpanded ? "−" : "+"}</Text>
        </TouchableOpacity>
        {isExpanded && <View>{children}</View>}
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Constants.styles.fontSize.MEDIUM,
    fontWeight: Constants.styles.fontWeight.BOLD,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    flex: 1,
  },
  icon: {
    fontSize: Constants.styles.fontSize.LARGE,
    fontWeight: Constants.styles.fontWeight.NORMAL,
    fontFamily: Constants.styles.fontFamily.REGULAR,
    color: Constants.styles.textColor.DEFAULT,
    marginLeft: Constants.styles.spacing.SMALL,
  }
});

