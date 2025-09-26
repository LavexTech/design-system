import React from "react";
import { ScrollView } from "react-native";
import { InputDemo } from "../examples/InputDemo/InputDemo";
import { InputPasswordDemo } from "../examples/InputPasswordDemo/InputPasswordDemo";

export default function Index() {
  return (
    <ScrollView>
      <InputDemo />
      <InputPasswordDemo />
    </ScrollView>
  );
}
