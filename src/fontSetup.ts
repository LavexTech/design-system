import * as Font from "expo-font";
import { useEffect, useState } from "react";

const AVAILABLE_FONTS = {
  "PlusJakartaSans-Regular": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Regular.ttf"),
  "PlusJakartaSans-Medium": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Medium.ttf"),
  "PlusJakartaSans-SemiBold": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-SemiBold.ttf"),
  "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Bold.ttf"),
};

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

export function useFonts(fontNames: string[] = ["PlusJakartaSans-Regular"]) {
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

export function useGlobalFonts() {
  return useFonts(Object.keys(AVAILABLE_FONTS));
}

export function useResolvedFontFamily(fontName: string): string | undefined {
  const known = fontName in AVAILABLE_FONTS;
  const ready = useFonts(known ? [fontName] : []);
  return known && ready ? fontName : undefined;
}
