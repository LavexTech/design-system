import { ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { UserCardBio } from "@src/components/UserCardBio/UserCardBio";

export default function Index() {
  const sampleUser = {
    id: "1",
    name: "Fulano",
    profileImage: "https://picsum.photos/id/15/200/200",
    ordersCount: 32,
    rating: 3.5,
    bio: "Olá, eu sou o Fulano e uso produtos de primeira qualidade Padrão LAVEX",
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
      <Title text="UserCardBio" />
      <Grid columns={1} gap={0}>
      <UserCardBio
        user={sampleUser}
        onClick={() => console.log("Usuário clicado:", sampleUser.id)}
      />
      <UserCardBio
        user={{
          ...sampleUser,
          id: "2",
          name: "Maria",
          rating: 5,
          ordersCount: 48,
          bio: "Profissional dedicada com foco em qualidade e excelência no atendimento.",
        }}
        onClick={() => console.log("Usuário clicado: 2")}
      />
      </Grid>
      
    </ScrollView>
  )
}