import { useState } from "react";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { InputToolbar } from "@src/components/InputToolbar/InputToolbar";

export default function Index() {
  const [inputValue, setInputValue] = useState('');
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    console.log('Mensagem enviada:', inputValue);
    setInputValue('');
  };

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
      >
        <View style={{ paddingBottom: insets.bottom }}>
          <InputToolbar
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            placeholder="Digite sua mensagem..."
          />
        </View>
      </KeyboardAvoidingView>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <MainTitle text="Main Title" />
        <Subtitle text="Subtitle" />
        <Title text="Title" />
        <Text text="TextBox" />
        <Info text="Info" />
        <Grid columns={3} gap={4}>
          <Text text="Column 1" />
          <Text text="Column 2" />
          <Text text="Column 3" />
        </Grid>
        <Card>
          <Text text="Card" />
        </Card>
      </ScrollView>
    </View>
  )
}