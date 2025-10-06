import React from "react";
import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { TextList } from "@src/components/TextList/TextList";

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
      <Title text="Text list" />
      <Card>
        <TextList
          texts={[
            "1x Calça Tiroliro",
            "2x Blusa xpto etc",
            "5x Camiseta de banda",
            "3x Pares de meia",
            "1x Edredom",
          ]}
        />
      </Card>
    </ScrollView>
  )
}