import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Modal } from "@src/components/Modal/Modal";
import { Info } from "@src/components/Info/Info";
import { Grid, GridItem } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Button } from "@src/components/Button/Button";

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
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button text="Mostrar Modal" onClick={() => setShowModal(true)} />
        </View>
        <Grid columns={3} gap={4}>
          <Text text="Column 1" />
          <Text text="Column 2" />
          <Text text="Column 3" />
        </Grid>
        <Card>
          <Text text="Card" />
        </Card>
        <Grid columns={3} gap={2}>
          <Button variant="default" text="Button" onClick={() => {}} />
          <Button variant="danger" text="Button" onClick={() => {}} />
          <Button variant="success" text="Button" onClick={() => {}} />
          <Button variant="default-outline" text="Button" onClick={() => {}} />
          <Button variant="danger-outline" text="Button" onClick={() => {}} />
          <Button variant="success-outline" text="Button" onClick={() => {}} />
        </Grid>

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
