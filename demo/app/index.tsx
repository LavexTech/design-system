import { Text, View } from "react-native";
import { InputEmailDemo } from "../examples/InputEmailDemo";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputEmailDemo />
    </View>
  );
}
