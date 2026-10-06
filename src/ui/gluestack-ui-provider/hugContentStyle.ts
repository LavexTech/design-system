import { ViewStyle } from "react-native";

/** Ocupa a largura do pai sem absorver altura livre (ao contrário do default flex: 1). */
export const hugContentStyle: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
  alignSelf: "stretch",
  width: "100%",
};
