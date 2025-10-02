import { View } from "react-native";
import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Input } from "@src/components/Input/Input";
import { useState } from "react";

export default function Index() {
  const [input, setInput] = useState("");

  const validateMinLength = (value: string): boolean => {
    return value.length >= 5;
  };

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
      <Input
        label="Entrada com Validação"
        value={input}
        placeholder="Mínimo 5 caracteres"
        onChange={setInput}
        validation={validateMinLength}
        errorMessage="Deve ter pelo menos 5 caracteres"
      />
    </ScrollView>
  );
}
