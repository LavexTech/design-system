import { Text, View, ScrollView } from "react-native";
import { Grid } from "@src/components/Grid/Grid";
import { Card } from "@src/components/Card/Card";
import { Button } from "@src/components/Button/Button";

export default function Index() {
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{ fontFamily: "Roboto-Bold", fontSize: 24, marginBottom: 20 }}
      >
        Design System Demo
      </Text>

      <Text
        style={{ fontFamily: "Roboto-Medium", fontSize: 18, marginBottom: 10 }}
      >
        Grid Component Example
      </Text>

      <Grid columns={2} gap={12}>
        <Card title="Card 1">
          <Text>Conteúdo do primeiro card</Text>
        </Card>
        <Card title="Card 2">
          <Text>Conteúdo do segundo card</Text>
        </Card>
        <Card title="Card 3">
          <Text>Conteúdo do terceiro card</Text>
        </Card>
        <Card title="Card 4">
          <Text>Conteúdo do quarto card</Text>
        </Card>
      </Grid>

      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: 18,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Grid with Buttons
      </Text>

      <Grid columns={3} gap={8}>
        <Button text="Ação 1" onClick={() => {}} />
        <Button text="Ação 2" onClick={() => {}} />
        <Button text="Ação 3" onClick={() => {}} />
      </Grid>

      <Text
        style={{
          fontFamily: "Roboto-Medium",
          fontSize: 18,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Font Examples
      </Text>

      <Text style={{ fontFamily: "Roboto-Regular", fontSize: 20 }}>
        Roboto Regular
      </Text>
      <Text style={{ fontFamily: "Roboto-Medium", fontSize: 20 }}>
        Roboto Medium
      </Text>
      <Text style={{ fontFamily: "Roboto-Bold", fontSize: 20 }}>
        Roboto Bold
      </Text>
      <Text style={{ fontFamily: "Roboto-Light", fontSize: 20 }}>
        Roboto Light
      </Text>
      <Text style={{ fontFamily: "Roboto-Thin", fontSize: 20 }}>
        Roboto Thin
      </Text>
      <Text style={{ fontFamily: "Roboto-ExtraLight", fontSize: 20 }}>
        Roboto Extra Light
      </Text>
      <Text style={{ fontFamily: "Roboto-ExtraLightItalic", fontSize: 20 }}>
        Roboto Extra Light Italic
      </Text>

      <Button variant="success" text="Success" onClick={() => {}} />
      <Button variant="danger" text="Danger" onClick={() => {}} />
      <Button variant="default" text="Default" onClick={() => {}} />
      <Button
        variant="default-outline"
        text="Default Outline"
        onClick={() => {}}
      />
      <Button
        variant="success-outline"
        text="Success Outline"
        onClick={() => {}}
      />
      <Button
        variant="danger-outline"
        text="Danger Outline"
        onClick={() => {}}
      />
    </ScrollView>
  );
}
