import { ScrollView, Alert } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { UserCardVertical } from "@src/components/UserCardVertical/UserCardVertical";

export default function Index() {
  const sampleUser = {
    id: "1",
    name: "Fulano",
    profileImage: "https://picsum.photos/id/15/200/200",
    ordersCount: 32,
    rating: 3.5,
  };

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
      
      <Title text="UserCardVertical" />
      <Grid columns={2} gap={1}>
        <UserCardVertical
          user={sampleUser}
          onClick={() => Alert.alert("Usuário clicado", `ID: ${sampleUser.id}`)}
        />
        <UserCardVertical
          user={{ ...sampleUser, id: "2", rating: 4.5, ordersCount: 45 }}
          onClick={() => Alert.alert("Usuário clicado", "ID: 2")}
        />
        <UserCardVertical
          user={{ ...sampleUser, id: "3", rating: 2.0, ordersCount: 12 }}
          onClick={() => Alert.alert("Usuário clicado", "ID: 3")}
        />
      </Grid>
    </ScrollView>
  )
}