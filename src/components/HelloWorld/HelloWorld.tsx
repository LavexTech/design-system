import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface HelloWorldProps {
  /**
   * Custom text to display instead of "Hello World"
   */
  text?: string;
  /**
   * Custom style for the text
   */
  style?: any;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ 
  text = 'Hello World',
  style 
}) => {
  return (
    <Text style={[styles.text, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});
