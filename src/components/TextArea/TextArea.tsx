import React from "react"
import { View, StyleSheet } from "react-native"
import { Textarea, TextareaInput } from "../../ui/textarea"
import { TextBox } from "../Text/Text"
import { GluestackUIProvider } from "../../ui/gluestack-ui-provider"
import { Grid, GridItem } from "../Grid/Grid"
import Constants from "../../constants/constants"

type TextAreaProps = {
  label: string,
  value?: string,
  placeholder?: string,
  onChange: (value: string) => void,
  maxLength?: number,
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
      return
    }
    onChange(text)
  }

  const currentLength = value?.length || 0

  return (
    <GluestackUIProvider>
      <Grid columns={1} gapY={2}>
        <GridItem colSpan={1}>
          <TextBox text={label} size="small" />
        </GridItem>
        <GridItem colSpan={1}>
          <Textarea style={styles.textarea} size="xl">
            <TextareaInput
              {...({
                value,
                placeholder,
                onChangeText: handleChange,
                multiline: true,
                placeholderTextColor: Constants.styles.textColor.INFO,
              } as any)}
            />
          </Textarea>
        </GridItem>
        {maxLength && (
          <View style={styles.charCounterContainer}>
            <TextBox 
              text={`${currentLength}/${maxLength} caracteres`} 
              size="small" 
            />
          </View>
        )}
      </Grid>
    </GluestackUIProvider>
  )
}

const styles = StyleSheet.create({
  textarea: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
  },
  charCounterContainer: {
    alignItems: 'flex-end',
  },
})
