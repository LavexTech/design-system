import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";

export default function Index() {
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
          <Text text="Main Title" />
          <MainTitle text="Hello World" />
        </>
        <>
          <Text text="Subtitle" />
          <Subtitle text="Hello World" />
        </>
        <>
          <Text text="Title" />
          <Title text="Hello World" />
        </>
      </Grid>
    </View>
  );
}
