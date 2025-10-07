import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Image } from "@src/components/Image/Image";

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
        <>
          <Text text="Column 1" />
          <MainTitle text="Hello World" />
          <Image
            src="https://picsum.photos/id/11/100/100"
            alt="Placeholder image"
            size={80}
            onClick={() => console.log('Image clicked!')}
          />
        </>
        <>
          <Text text="Column 2" />
          <Title text="Hello World" />
          <Image
            src="https://picsum.photos/id/1/100"
            alt="Logo placeholder"
            size={60}
          />
        </>
        <>
          <Text text="Column 3" />
          <Subtitle text="Hello World" />
          <Image
            src="https://picsum.photos/id/10/100/100"
            alt="Icon placeholder"
            size={100}
            onClick={() => alert('Icon clicked!')}
          />
        </>
      </Grid>
      <Card>
        <Text text="Card" />
      </Card>
    </ScrollView>
  )
}