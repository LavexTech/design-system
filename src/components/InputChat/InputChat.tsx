import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSend } from '../Icons/IconSend';

interface InputChatProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSend: () => void;
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
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#888"
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={[styles.button, !value.trim() && styles.disabledButton]}
        onPress={handleSend}
        disabled={!value.trim()}
      >
        <IconSend fill={value.trim() ? "#007AFF" : "#999"} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 50,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
