import { Text, View } from "react-native";
import { InputCPFDemo } from "../examples/InputCPFDemo";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputCPFDemo />
    </View>
  );
}
