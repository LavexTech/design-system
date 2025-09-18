import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface HelloWorldProps {}

export const HelloWorld: React.FC<HelloWorldProps> = ({}) => {
  return (
    <Text>
      Hello World
    </Text>
  );
};
