import { ScrollView, View } from "react-native";
import { TextArea } from "@src/components/TextArea/TextArea";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { useState } from "react";

export default function Index() {
  const [contactMessage, setContactMessage] = useState("");
  const [comment, setComment] = useState("");

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <MainTitle text="TextArea Component Demo" />
      </View>

      <View style={{ marginTop: 20, padding: 20 }}>
        <TextArea
          label="Mensagem simples"
          value={contactMessage}
          placeholder="Digite sua mensagem aqui..."
          onChange={setContactMessage}
        />
      </View>

      <View style={{ marginTop: 20, padding: 20 }}>
        <TextArea
          label="Exemplo com contador de caracteres"
          value={comment}
          placeholder="Digite até 200 caracteres..."
          onChange={setComment}
          maxLength={200}
        />
      </View>

      <View style={{ marginTop: 20, padding: 20 }}>
        <TextArea
          label="Texto pré-definido"
          value="Este é um exemplo de texto que já está preenchido no TextArea."
          placeholder="Digite aqui..."
          onChange={() => {}}
        />
      </View>
    </ScrollView>
  );
}
