import React from "react";
import { View, StyleSheet } from "react-native";
import { TextBox } from "../Text/Text";

export interface TextListProps {
  texts: string[];
}

export const TextList: React.FC<TextListProps> = ({ texts }: TextListProps) => {
  return (
    <View style={styles.container}>
      {texts.map((text, index) => (
        <View key={index} style={styles.itemContainer}>
          <TextBox text={text} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  itemContainer: {
    flexDirection: "row",
  },
});
