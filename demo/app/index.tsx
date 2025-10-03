import { useState } from "react";
import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { InputEmail } from "@src/components/InputEmail/InputEmail";
import { Info } from "@src/components/Info/Info";

export default function Index() {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

      <View style={{ marginTop: 20, padding: 20 }}>
        <Subtitle text="Input de email básico com valores padrão" />
        <InputEmail value={email1} onChange={setEmail1} />
      </View>
      <View style={{ marginTop: 20, padding: 20 }}>
        <Subtitle text="Input email com mensagem de erro personalizada" />
        <InputEmail
          value={email2}
          onChange={setEmail2}
          errorMessage="Email deve ser válido e conter @ e ."
        />
      </View>
    </View>
  );
  // return <CardDemo />;
  // return <ButtonDemo />;
}
