import { Text, View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { List } from "@src/components/List/List";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainTitle text="Hello World" />
      <Title text="Hello World" />

      <List title="Lista de exemplo">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </List>
    </View>
  );
}
