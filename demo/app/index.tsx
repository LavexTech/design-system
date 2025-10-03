import { useState } from "react";
import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { TextArea } from "@src/components/TextArea/TextArea";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";

export default function Index() {
  const [contactMessage, setContactMessage] = useState("");

  return (
    <ScrollView>
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
      <View style={{ marginTop: 20, width: "70%" }}>
        <TextArea label="Mensagem" value={contactMessage} onChange={setContactMessage} placeholder="Digite sua mensagem aqui..." />
      </View>
    </ScrollView>
  )
}
