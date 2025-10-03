import { ScrollView, View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Message } from "@src/components/Message/Message";

export default function Index() {
  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
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
      <View style={{ marginTop: 20, padding: 20 }}>
        <Message
          text="Olá! Como você está?"
          onClick={() => console.log("Mensagem clicada!")}
          isOwn={false}
        />
        <Message
          text="Oi! Estou bem, obrigado! E você?"
          onClick={() => console.log("Mensagem clicada!")}
          isOwn={true}
        />
        <Message
          text="Também estou bem! Que bom te ver por aqui."
          onClick={() => console.log("Mensagem clicada!")}
          isOwn={false}
        />
        <Message
          text="Sim! Foi um prazer conversar com você."
          onClick={() => console.log("Mensagem clicada!")}
          isOwn={true}
        />
      </View>
    </ScrollView>
  )
}