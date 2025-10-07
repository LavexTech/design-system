import * as Font from "expo-font";
import { useEffect, useState } from "react";

const AVAILABLE_FONTS = {
  "Roboto-Regular": require("./assets/fonts/Roboto/static/Roboto-Regular.ttf"),
  "Roboto-Italic": require("./assets/fonts/Roboto/static/Roboto-Italic.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto/static/Roboto-Bold.ttf"),
  "Roboto-BoldItalic": require("./assets/fonts/Roboto/static/Roboto-BoldItalic.ttf"),
  "Roboto-ExtraLight": require("./assets/fonts/Roboto/static/Roboto-ExtraLight.ttf"),
  "Roboto-ExtraLightItalic": require("./assets/fonts/Roboto/static/Roboto-ExtraLightItalic.ttf"),
};

// Cache para controlar quais fontes já foram carregadas
const loadedFonts = new Set<string>();

async function loadSpecificFonts(fontNames: string[]) {
  const fontsToLoad: { [key: string]: any } = {};

  fontNames.forEach((fontName) => {
    if (
      !loadedFonts.has(fontName) &&
      AVAILABLE_FONTS[fontName as keyof typeof AVAILABLE_FONTS]
    ) {
      fontsToLoad[fontName] =
        AVAILABLE_FONTS[fontName as keyof typeof AVAILABLE_FONTS];
      loadedFonts.add(fontName);
    }
  });

  if (Object.keys(fontsToLoad).length > 0) {
    await Font.loadAsync(fontsToLoad);
  }
}

export function useFonts(fontNames: string[] = ["Roboto-Regular"]) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await loadSpecificFonts(fontNames);
        setReady(true);
      } catch (error) {
        console.error("Erro ao carregar fontes:", error);
        setReady(true);
      }
    };

    loadFonts();
  }, [fontNames.join(",")]);

  return ready;
}
