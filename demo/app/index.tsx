import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Accordion } from "@src/components/Accordion/Accordion";

export default function Index() {
  return (
    <ScrollView style={{ marginTop: 20, padding: 20 }}>
      <MainTitle text="Main Title" />
      <Subtitle text="Subtitle" />
      <Title text="Title" />
      <Text text="TextBox" />
      <Info text="Info" />
      <Accordion text="Accordion">
        <Text text="Accordion Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      </Accordion>
      <Grid columns={3} gap={4}>
        <Text text="Column 1" size="small" />
        <Text text="Column 2"  />
        <Text text="Column 3" size="large"/>
      </Grid>
      <Card>
        <Text text="Card" />
      </Card>
      <Accordion text="Accordion">
        <Text text="Accordion Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      </Accordion>
      <Accordion text="Accordion">
        <Text text="Accordion Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      </Accordion>
      <Accordion text="Accordion">
        <Text text="Accordion Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      </Accordion>
    </ScrollView>
  )
}