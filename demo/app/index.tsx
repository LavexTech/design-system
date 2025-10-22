import { ScrollView, View } from "react-native";
import { useState } from "react";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid, GridItem } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { TextList } from "@src/components/TextList/TextList";
import { List } from "@src/components/List/List";
import { Input } from "@src/components/Input/Input";
import { InputPassword } from "@src/components/InputPassword/InputPassword";
import { Image } from "@src/components/Image/Image";

export default function Index() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={true}
    >
      <Grid columns={1} gap={2}>
        <View style={{ marginTop: 20 }}>
          <Input
            label="Input"
            value={value}
            placeholder="Enter Text here..."
            onChange={setValue}
            validation={validateInput}
            errorMessage="Input must be less than 7 characters" />
        </View>
        <View style={{ marginTop: 20 }}>
          <InputPassword
            label="Senha"
            value={password}
            placeholder="Digite sua senha"
            onChange={setPassword}
            showPasswordToggle={true}
            errorMessage="Senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e número" />
        </View>
        <MainTitle text="Main Title" />
        <Subtitle text="Subtitle" />
        <Title text="Title" />
        <Text text="TextBox" />
        <Info text="Info" />
        <Title text="Grid Components" />
        <Grid columns={3} gap={4}>
          <Text text="Column 1" />
          <Text text="Column 2" />
          <Text text="Column 3" />
        </Grid>
        <Subtitle text="Grid with Cards (2 columns)" />
        <Grid columns={2} gap={4}>
          <Card>
            <Text text="Card 1" />
          </Card>
          <Card>
            <Text text="Card 2" />
          </Card>
          <Card>
            <Text text="Card 3" />
          </Card>
          <Card>
            <Text text="Card 4" />
          </Card>
        </Grid>
        <Grid columns={3} gap={0}>
          <GridItem>
            <Text text="Column 1" />
            <MainTitle text="Hello World" />
            <Image
              src="https://picsum.photos/id/11/100/100"
              alt="Placeholder image"
              size="lg"
              type="circle"
              onClick={() => console.log("Image clicked!")}
            />
          </GridItem>
          <GridItem>
            <Text text="Column 2" />
            <Title text="Hello World" />
            <Image src="https://picsum.photos/id/1/100" alt="Logo placeholder" size="md" type="default" />
          </GridItem>
          <GridItem>
            <Text text="Column 3" />
            <Subtitle text="Hello World" />
            <Image
              src="https://picsum.photos/id/10/100/100"
              alt="Icon placeholder"
              size="xl"
              type="circle"
              onClick={() => alert("Icon clicked!")}
            />
          </GridItem>
          <Text text="Column 1" size="small" />
          <Text text="Column 2" level="success" />
          <Text text="Column 3" size="large" />
        </Grid>

        <Subtitle text="Custom Column Spans (10 columns grid)" />
        <Grid columns={10} gap={4}>
          <GridItem colSpan={3}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={5}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={6}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={2}>
            <Card>
              <></>
            </Card>
          </GridItem>
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
        </Grid>
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
      <View style={{ marginTop: 20 }} >
        <List title="Lista de exemplo">
          <Text text="Item 1" />
          <Text text="Item 2" />
          <Text text="Item 3" />
        </List>
      </View>
    </ScrollView>
  )
}

const validateInput = (value: string) => {
  return value.length < 7;
}
