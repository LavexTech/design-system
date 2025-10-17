import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Modal } from "@src/components/Modal/Modal";
import { Alert } from "@src/components/Alert/Alert";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Button } from "@src/components/Button/Button";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"danger" | "success" | "info">("info");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState("");

  const showAlertExample = (type: "danger" | "success" | "info", text: string, icon: string) => {
    setAlertType(type);
    setAlertText(text);
    setAlertIcon(icon);
    setShowAlert(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {showAlert && (
        <Alert
          text={alertText}
          icon={alertIcon}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      <ScrollView style={{ marginTop: 20, padding: 20 }}>
        <MainTitle text="Main Title" />
        <Subtitle text="Subtitle" />
        <Title text="Title" />
        <Text text="TextBox" />
        <Info text="Info" />
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button text="Mostrar Modal" onClick={() => setShowModal(true)} />
        </View>

        <View style={{ marginTop: 20, gap: 10 }}>
          <Title text="Alert Examples" />
          <Button
            variant="danger"
            text="Show Danger Alert"
            onClick={() => showAlertExample("danger", "Erro! Algo deu errado.", "")}
          />

          <Button
            variant="success"
            text="Show Success Alert"
            onClick={() => showAlertExample("success", "Sucesso! Operação concluída.", "")}
          />

          <Button
            variant="default"
            text="Show Info Alert"
            onClick={() => showAlertExample("info", "Informação importante para você.", "")}
          />
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
