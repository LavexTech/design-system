import { Text, View } from "react-native";
import { Title1 } from "@src/components/Title1/Title1";
import { Title2 } from "@src/components/Title2/Title2";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title1 text="Hello World" />
      <Title2 text="Hello World" />
    </View>
  );
}
