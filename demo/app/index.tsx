import { View } from "react-native";
import { Title1 } from "@src/components/Title1/Title1";
import { Title2 } from "@src/components/Title2/Title2";
import { Title3 } from "@src/components/Title3/Title3";
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
          <Text text="Column 1" />
          <Title1 text="Hello World" />
        </>
        <>
          <Text text="Column 2" />
          <Title2 text="Hello World" />
        </>
        <>
          <Text text="Column 3" />
          <Title3 text="Hello World" />
        </>
      </Grid>
    </View>
  );
}
