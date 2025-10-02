import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { Order } from "@src/components/Order/Order";

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
        <>
          <Text text="Column 4" />
          <Order title="Pedido 1" createdAt={new Date()} images={["https://images.unsplash.com/photo-1693443688057-85f57b872a3c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]} itemList={[{ name: "Item 1", quantity: 1 }, { name: "Item 2", quantity: 2 }]} />
        </>
      </Grid>
    </View>
  );
}
