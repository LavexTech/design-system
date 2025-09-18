import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
    </View>
  );
}
