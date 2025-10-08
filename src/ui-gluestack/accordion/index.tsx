import React from 'react';
import { View, Pressable, Text, ViewProps, PressableProps, TextProps } from 'react-native';
import { createAccordion } from '@gluestack-ui/accordion';

// Define simple styled components
const StyledAccordion = React.forwardRef<View, ViewProps>((props, ref) => (
  <View ref={ref} {...props} />
));

const StyledAccordionItem = React.forwardRef<View, ViewProps>((props, ref) => (
  <View 
    ref={ref} 
    {...props}
    style={[
      {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
      },
      props.style
    ]} 
  />
));

const StyledAccordionHeader = React.forwardRef<View, ViewProps>((props, ref) => (
  <View ref={ref} {...props} />
));

const StyledAccordionTrigger = React.forwardRef<View, PressableProps>((props, ref) => {
  const baseStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 16,
    paddingHorizontal: 16,
  };
  
  return (
    <Pressable 
      ref={ref as any} 
      {...props}
      style={({ pressed }) => [
        baseStyle,
        typeof props.style === 'function' ? props.style({ pressed }) : props.style
      ]}
    />
  );
});

const StyledAccordionContent = React.forwardRef<View, ViewProps>((props, ref) => (
  <View 
    ref={ref} 
    {...props}
    style={[
      {
        paddingHorizontal: 16,
        paddingBottom: 16,
      },
      props.style
    ]}
  />
));

const StyledAccordionIcon = React.forwardRef<View, ViewProps>((props, ref) => (
  <View 
    ref={ref} 
    {...props}
    style={[
      {
        marginLeft: 8,
      },
      props.style
    ]}
  />
));

const StyledAccordionTitleText = React.forwardRef<Text, TextProps>((props, ref) => (
  <Text 
    ref={ref} 
    {...props}
    style={[
      {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
      },
      props.style
    ]}
  />
));

const StyledAccordionContentText = React.forwardRef<Text, TextProps>((props, ref) => (
  <Text 
    ref={ref} 
    {...props}
    style={[
      {
        fontSize: 14,
        color: '#666',
      },
      props.style
    ]}
  />
));

// Create the Accordion using gluestack
export const Accordion = createAccordion({
  Root: StyledAccordion,
  Item: StyledAccordionItem,
  Header: StyledAccordionHeader,
  Trigger: StyledAccordionTrigger,
  Content: StyledAccordionContent,
  Icon: StyledAccordionIcon,
  TitleText: StyledAccordionTitleText,
  ContentText: StyledAccordionContentText,
});

