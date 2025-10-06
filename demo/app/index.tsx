import { View, Text, ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox } from "@src/components/Text/Text";
import { TabBar } from "@src/components/TabBar/TabBar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['Home', 'Perfil', 'Configurações'];
  const icons = [
    (isSelected: boolean) => (
      <Ionicons name="home" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
    (isSelected: boolean) => (
      <Ionicons name="person" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
    (isSelected: boolean) => (
      <Ionicons name="settings" size={24} color={isSelected ? "#262627" : "#8F98AD"} />
    ),
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <View style={{ gap: 24 }}>
            <MainTitle text="Bem-vindo" />
            <Text style={{ fontSize: 16 }}>Esta é a página inicial</Text>
          </View>
        );
      case 1:
        return (
          <View style={{ gap: 24 }}>
            <Title text="Perfil" />
            <Text style={{ fontSize: 16 }}>Configurações do seu perfil</Text>
          </View>
        );
      case 2:
        return (
          <View style={{ gap: 24 }}>
            <Subtitle text="Configurações" />
            <Text style={{ fontSize: 16 }}>Ajustes do aplicativo</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100, // Espaço para o TabBar fixo
          gap: 24,
        }}
      >
        {renderContent()}

        <Grid columns={3} gap={4}>
          <>
            <TextBox text="Column 1" />
            <MainTitle text="Hello World" />
          </>
          <>
            <TextBox text="Column 2" />
            <Title text="Hello World" />
          </>
          <>
            <TextBox text="Column 3" />
            <Subtitle text="Hello World" />
          </>
        </Grid>
      </ScrollView>

      <TabBar 
        options={tabs}
        icons={icons}
        onSelected={(index) => {
          setSelectedTab(index);
          console.log('Tab selecionada:', tabs[index]);
        }} 
      />
    </View>
  );
}
