import { ScrollView, View, StyleSheet } from "react-native";
import { useState } from 'react';
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { InputPhone } from "@src/components/InputPhone/InputPhone";

export default function Index() {
  const [phone, setPhone] = useState('');
  
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
      <View style={styles.section}>
        <Subtitle text="Com Mensagem de Erro Customizada" />
        <Info text="Exemplo com mensagem de erro personalizada" />
        <InputPhone
            value={phone}
            onChange={setPhone}
            errorMessage="Por favor, insira um telefone válido"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    section: {
        marginBottom: 30,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
