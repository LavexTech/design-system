import { useState } from "react";
import { KeyboardAvoidingView, FlatList, View, Platform, ScrollView, Text as RNText } from "react-native";
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
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: { id: string; text: string } = { id: Date.now().toString(), text: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  const renderMain = () => (
    <ScrollView style={{ padding: 20 }}>
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
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f8f8f8', marginTop: 0 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderMain}
        renderItem={({ item }) => (
          <View style={{ 
            backgroundColor: '#e1ffc7',
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            alignSelf: 'flex-start',
            maxWidth: '80%',
            marginHorizontal: 16
          }}>
            <RNText style={{ fontSize: 16, color: '#333'}}>{item.text}</RNText>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <View style={{ paddingBottom: insets.bottom }}>
        <InputToolbar
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          placeholder="Digite sua mensagem..."
        />
      </View>
    </KeyboardAvoidingView>
  )
}