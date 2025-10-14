import React, { useState } from "react";
import { View, ScrollView, Button } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Modal } from "@src/components/Modal/Modal";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";

export default function Index() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
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

        <View style={{ marginTop: 20 }}>
          <Button title="Mostrar Modal" onPress={() => setShowModal(true)} />
        </View>
      </ScrollView>

      {showModal && (
        <View style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 1000 
        }}>
          <Modal
            title="Atenção!"
            text="Deseja realmente excluir este item? Esta ação não pode ser desfeita."
            buttonText="Confirmar"
            onClose={() => setShowModal(false)}
            visible={showModal}
          />
        </View>
      )}
    </View>
  );
}