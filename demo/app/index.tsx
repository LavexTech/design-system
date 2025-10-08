import { ScrollView, View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { UserCardHorizontal } from "@src/components/UserCardHorizontal/UserCardHorizontal";
import { UserList } from "@src/components/UserList/UserList";

export default function Index() {
  const sampleUser = {
    id: "1",
    name: "Fulano",
    profileImage: "https://picsum.photos/id/15/200/200",
    ordersCount: 32,
    rating: 3.5,
  };

  const usersList = [
    {
      id: "1",
      name: "Fulano",
      profileImage: "https://picsum.photos/id/10/200/200",
      ordersCount: 32,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Sicrano",
      profileImage: "https://picsum.photos/id/11/200/200",
      ordersCount: 12,
      rating: 3.5,
    },
    {
      id: "3",
      name: "Beltrano",
      profileImage: "https://picsum.photos/id/12/200/200",
      ordersCount: 1,
      rating: 1.5,
    },
  ];

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
      <Title text="UserCardHorizontal" />
      <UserCardHorizontal
        user={sampleUser}
        onClick={() => console.log("Usuário clicado:", sampleUser.id)}
      />
      <UserCardHorizontal
        user={{ ...sampleUser, id: "2", name: "Maria Silva", rating: 5, ordersCount: 48 }}
        onClick={() => console.log("Usuário clicado: 2")}
      />
      <Title text="UserList" />
      <View style={{ marginBottom: 60 }}>
        <UserList
          users={usersList}
          onUserClick={(user: any) => console.log("Usuário da lista clicado:", user.name)}
        />
      </View>
      
    </ScrollView>
  )
}