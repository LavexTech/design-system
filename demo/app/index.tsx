import { useState } from "react";
import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Stepper } from "@src/components/Stepper/Stepper";

export default function Index() {
  const [shirtCount, setShirtCount] = useState(0);
  const [pantsCount, setPantsCount] = useState(1);

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
      <Title text="Stepper Component" />
      <Stepper
        text="Camiseta"
        min={0}
        max={10}
        value={shirtCount}
        onChange={setShirtCount}
      />
      <Stepper
        text="Calça"
        min={0}
        max={5}
        value={pantsCount}
        onChange={setPantsCount}
      />
    </ScrollView>
  )
}