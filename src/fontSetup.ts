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
  const fontKey = fontNames.join(",");
  const [ready, setReady] = useState(() =>
    fontNames.every((name) => Font.isLoaded(name))
  );

  useEffect(() => {
    let alive = true;

    if (fontNames.every((name) => Font.isLoaded(name))) {
      setReady(true);
      return;
    }

    const loadFonts = async () => {
      try {
        await loadSpecificFonts(fontNames);
        if (alive) setReady(true);
      } catch (error) {
        console.error("Erro ao carregar fontes:", error);
        if (alive) setReady(true);
      }
    };

    loadFonts();
    return () => {
      alive = false;
    };
  }, [fontKey]);

  return ready;
}

export function useGlobalFonts() {
  return useFonts(Object.keys(AVAILABLE_FONTS));
}

export function useResolvedFontFamily(fontName: string): string | undefined {
  const known = fontName in AVAILABLE_FONTS;
  const [ready, setReady] = useState(() => known && Font.isLoaded(fontName));

  useEffect(() => {
    if (!known || ready) return;
    let alive = true;
    loadSpecificFonts([fontName])
      .then(() => {
        if (alive) setReady(true);
      })
      .catch((error) => {
        console.error("Erro ao carregar fontes:", error);
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, [fontName, known, ready]);

  return known && ready ? fontName : undefined;
}
