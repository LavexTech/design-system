import React from 'react';
import { Text } from 'react-native';

export interface HelloWorldProps {}

export const HelloWorld: React.FC<HelloWorldProps> = ({}) => {
  return (
    <Text>
      Hello World
    </Text>
  );
};
