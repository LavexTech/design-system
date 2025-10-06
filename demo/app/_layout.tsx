import { Stack } from "expo-router";
import { useGlobalFonts } from "@src/fontSetup";

export default function RootLayout() {
  const fontsLoaded = useGlobalFonts();

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
