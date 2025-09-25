import React from "react";
import { ScrollView } from "react-native";
import { InputDemo } from "../examples/InputDemo/InputDemo";
import { InputEmailDemo } from "../examples/InputEmailDemo/InputEmailDemo";

export default function Index() {
  return (
    <ScrollView>
      <InputDemo />
      <InputEmailDemo />
    </ScrollView>
  );
  // return <CardDemo />;
  // return <ButtonDemo />;
}
