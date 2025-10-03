import { ScrollView, View, TouchableOpacity } from "react-native";
import { MainTitle } from "@src/components/MainTitle/MainTitle";
import { Subtitle } from "@src/components/Subtitle/Subtitle";
import { Title } from "@src/components/Title/Title";
import { TextBox as Text } from "@src/components/Text/Text";
import { Info } from "@src/components/Info/Info";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Alert } from "@src/components/Alert/Alert";
import { useState } from "react";

export default function Index() {
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

        <View style={{ marginTop: 20, gap: 10 }}>
          <Title text="Alert Examples" />
          <TouchableOpacity
            style={{ backgroundColor: "#DC2626", padding: 10, borderRadius: 8, marginBottom: 10 }}
            onPress={() => showAlertExample("danger", "Erro! Algo deu errado.", "⚠️")}
          >
            <Text text="Show Danger Alert" style={{ color: "white", textAlign: "center" }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#059669", padding: 10, borderRadius: 8, marginBottom: 10 }}
            onPress={() => showAlertExample("success", "Sucesso! Operação concluída.", "✅")}
          >
            <Text text="Show Success Alert" style={{ color: "white", textAlign: "center" }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: "#8F98AD", padding: 10, borderRadius: 8, marginBottom: 10 }}
            onPress={() => showAlertExample("info", "Informação importante para você.", "ℹ️")}
          >
            <Text text="Show Info Alert" style={{ color: "white", textAlign: "center" }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showAlert && (
        <Alert
          text={alertText}
          icon={alertIcon}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  )
}