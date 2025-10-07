import { ScrollView, View } from "react-native";
import { useState } from "react";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { InputPassword } from "@src/components/InputPassword/InputPassword";

export default function Index() {
  const [password, setPassword] = useState('');
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
      <View style={{ marginTop: 20 }}>
        <InputPassword
          label="Senha"
          value={password}
          placeholder="Digite sua senha"
          onChange={setPassword}
        />
      </View>
      
    </ScrollView>
  )
}
