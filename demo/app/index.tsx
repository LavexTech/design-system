import React, { useState } from "react";
import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { InputName } from "@src/components/InputName/InputName";

export default function Index() {
  const [userName, setUserName] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Grid columns={3} gap={4}>
        <>
          <Text text="Column 1" />
          <MainTitle text="Hello World" />
        </>
        <>
          <Text text="Column 2" />
          <Title text="Hello World" />
        </>
        <>
          <Text text="Column 3" />
          <Subtitle text="Hello World" />
        </>
      </Grid>
      <View style={{ marginTop: 40, width: '100%', maxWidth: 300 }}>
        <InputName
          label="Nome Completo"
          value={userName}
          placeholder="Digite seu nome completo"
          onChange={setUserName}
        />
      </View>
    </View>
  );
}
