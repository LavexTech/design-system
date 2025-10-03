import React, { useState } from "react";
import { View, Button } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Title } from "@src/components/Title/Title";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Grid } from "@src/components/Grid/Grid";
import { TextBox as Text } from "@src/components/Text/Text";
import { Modal } from "@src/components/Modal/Modal";

export default function Index() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

      <View style={{ marginTop: 20 }}>
        <Button title="Mostrar Modal" onPress={() => setShowModal(true)} />

        <Modal
          title="Atenção!"
          text="Deseja realmente excluir este item? Esta ação não pode ser desfeita."
          buttonText="Confirmar"
          onClose={() => setShowModal(false)}
          visible={showModal}
        />
      </View>
    </View>
  );
}