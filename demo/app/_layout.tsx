import { Stack } from "expo-router";
import { useGlobalFonts } from "@src/fontSetup";

export default function RootLayout() {
  const ready = useGlobalFonts();

  if (!ready) {
    return null;
  }

  return <Stack />;
}
