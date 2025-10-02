import { View } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { UserInfo } from "@src/components/UserInfo/UserInfo";

export default function Index() {
  const sampleUser = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    bio: "Desenvolvedor React Native apaixonado por criar interfaces incríveis",
    age: 28,
    city: "São Paulo",
    company: "Tech Corp",
    position: "Senior Developer"
  };

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
      <View style={{
        marginTop: 40,
        padding: 20,
        width: "100%",
        maxWidth: 300,
        backgroundColor: "#F8F9FA",
        borderRadius: 8
      }}>
        <MainTitle text="UserInfo Demo" />

        <View style={{ marginTop: 20 }}>
          <UserInfo
            user={sampleUser}
            type="name"
            onClick={() => alert('Nome clicado!')}
          />

          <UserInfo
            user={sampleUser}
            type="email"
            onClick={() => alert('Email clicado!')}
          />

          <UserInfo
            user={sampleUser}
            type="phone"
          />

          <UserInfo
            user={sampleUser}
            type="bio"
          />

          <UserInfo
            user={sampleUser}
            type="company"
            onClick={() => alert('Empresa clicada!')}
          />
        </View>
      </View>
    </View>
  );
}
