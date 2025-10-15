import { ScrollView, View } from "react-native";
import { useState } from "react";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid, GridItem } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Input } from "@src/components/Input/Input";
import { InputName } from "@src/components/InputName/InputName";

export default function Index() {
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={true}
    >
      <Grid columns={1} gap={2}>
        <View style={{ marginTop: 20}}>
          <InputName
            label="Nome Completo"
            value={userName}
            placeholder="Digite seu nome completo"
            onChange={setUserName}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Input
            label="Input"
            value={value}
            placeholder="Enter Text here..."
            onChange={setValue}
            validation={validateInput}
            errorMessage="Input must be less than 7 characters" />
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
          <GridItem colSpan={4}>
            <Card>
              <></>
            </Card>
          </GridItem>
        </Grid>
      </Grid>
      <Card>
        <Text text="Card" level="warning" />
      </Card>
    </ScrollView>
  )
}

const validateInput = (value: string) => {
  return value.length < 7;
}
