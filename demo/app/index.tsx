import { useState } from "react";
import { ScrollView, View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { TextArea } from "@src/components/TextArea/TextArea";
import { Info } from "@src/components/Info/Info";
import { Grid, GridItem } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { List } from "@src/components/List/List";
import { Input } from "@src/components/Input/Input";
import { InputPassword } from "@src/components/InputPassword/InputPassword";
import { InputEmail } from "@src/components/InputEmail/InputEmail";

export default function Index() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [contactMessage, setContactMessage] = useState("");

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
      <View style={{ marginTop: 20 }} >
        <TextArea label="Mensagem" value={contactMessage} onChange={setContactMessage} placeholder="Digite sua mensagem aqui..." />
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
         </Grid>
      </Grid>
      <Card>
        <Text text="Card" />
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
