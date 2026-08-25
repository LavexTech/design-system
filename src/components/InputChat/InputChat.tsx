import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { IconSend } from '../Icons/IconSend'
import { Input } from '../Input/Input'
import Constants from '../../constants/constants'

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
    <View style={styles.row}>
      <View style={styles.inputContainer}>
        <Input
          label=""
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          placeholderTextColor={Constants.styles.color.GRAY}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !value.trim() && styles.disabledButton]}
          onPress={handleSend}
          disabled={!value.trim()}
        >
          <IconSend
            fill={value.trim() ? Constants.styles.color.BLUE : Constants.styles.color.MEDIUM_GRAY}
            width={Constants.styles.icon.MEDIUM}
            height={Constants.styles.icon.MEDIUM}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Constants.styles.spacing.SMALL,
  },
  inputContainer: {
    flex: 1,
    minWidth: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
