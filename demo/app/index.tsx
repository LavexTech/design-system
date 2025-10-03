import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { TextArea } from "@src/components/TextArea/TextArea";
import { useState } from "react";

export default function Index() {
  const [contactMessage, setContactMessage] = useState("");
  const [comment, setComment] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid columns={3} gap={4}>
        <>
          <Text text="Column 1" />
          <MainTitle text="Hello World" />
        </>
        <>
          <Text text="Column 2" />
          <Title text="Hello World" />
        </>
        <>
          <Text text="Column 3" />
          <Subtitle text="Hello World" />
        </>
      </Grid>

      <View style={{ marginTop: 20, width: "70%" }}>
        <TextArea label="Mensagem" value={contactMessage} onChange={setContactMessage} placeholder="Digite sua mensagem aqui..." />
      </View>
    </View>
  );
}
