import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { IconSend } from '../Icons/IconSend'
import { Input } from '../Input/Input'
import Constants from '../../constants/constants'
import { Grid, GridItem } from '../Grid/Grid'

type InputChatProps = {
  value: string,
  placeholder?: string,
  onChange: (value: string) => void,
  onSend: () => void
}

export function InputChat({
  value,
  placeholder = 'Enviar mensagem...',
  onChange,
  onSend,
}: InputChatProps) {
  const handleSend = () => {
    if (value.trim()) {
      onSend();
    }
  }

  return (
    <Grid columns={12} gap={4}>
      <GridItem colSpan={11}>
        <Input
          label=""
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          placeholderTextColor={Constants.styles.color.GRAY}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !value.trim() && styles.disabledButton]}
            onPress={handleSend}
            disabled={!value.trim()}
          >
            <IconSend
              fill={value.trim() ? Constants.styles.color.BLUE : Constants.styles.color.GRAY}
              width={Constants.styles.icon.MEDIUM}
              height={Constants.styles.icon.MEDIUM}
            />
          </TouchableOpacity>
        </View>
      </GridItem>
    </Grid>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: Constants.styles.spacing.TINY,
  },
  button: {
    padding: Constants.styles.spacing.SMALL,
    borderRadius: Constants.styles.borderRadius.LARGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: Constants.styles.opacity.LOW,
  },
})
