import * as Font from "expo-font";
import { useEffect, useState } from "react";

const AVAILABLE_FONTS = {
  "PlusJakartaSans-Regular": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Regular.ttf"),
  "PlusJakartaSans-Medium": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Medium.ttf"),
  "PlusJakartaSans-SemiBold": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-SemiBold.ttf"),
  "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans/static/PlusJakartaSans-Bold.ttf"),
};

// Alias temporário: chamadas antigas com o nome Roboto carregam a família nova.
const FONT_ALIASES: Record<string, keyof typeof AVAILABLE_FONTS> = {
  "Roboto-Regular": "PlusJakartaSans-Regular",
  "Roboto-Italic": "PlusJakartaSans-Regular",
  "Roboto-Bold": "PlusJakartaSans-Bold",
  "Roboto-BoldItalic": "PlusJakartaSans-Regular",
  "Roboto-ExtraLight": "PlusJakartaSans-Regular",
  "Roboto-ExtraLightItalic": "PlusJakartaSans-Regular",
};

function resolveFontName(fontName: string): string {
  return FONT_ALIASES[fontName] ?? fontName;
}

const loadedFonts = new Set<string>();

async function loadSpecificFonts(fontNames: string[]) {
  const fontsToLoad: { [key: string]: any } = {};

  fontNames.forEach((requested) => {
    const fontName = resolveFontName(requested);
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
  const resolved = resolveFontName(fontName);
  const ready = useFonts([resolved]);
  return ready ? resolved : undefined;
}
