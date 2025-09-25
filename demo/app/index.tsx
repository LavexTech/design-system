import React from "react";
import { ScrollView } from "react-native";
import { InputDemo } from "../examples/InputDemo/InputDemo";
import { InputPhoneDemo } from "../examples/InputPhoneDemo/InputPhoneDemo";

export default function Index() {
  return (
    <ScrollView>
      <InputDemo />
      <InputPhoneDemo />
    </ScrollView>
  );
}
