import React, { createContext, useContext, useMemo } from "react";
import { ThemeColors, ThemeMode, darkColors, lightColors } from "./tokens";

export type LavexTheme = {
  mode: ThemeMode;
  colors: ThemeColors;
};

const LIGHT_THEME: LavexTheme = { mode: "light", colors: lightColors };
const DARK_THEME: LavexTheme = { mode: "dark", colors: darkColors };

// Sem provider na árvore, o tema é o claro (mesmas cores de antes do tema).
const LavexThemeContext = createContext<LavexTheme>(LIGHT_THEME);

export interface LavexThemeProviderProps {
  mode?: ThemeMode;
  children?: React.ReactNode;
}

export const LavexThemeProvider: React.FC<LavexThemeProviderProps> = ({
  mode = "light",
  children,
}) => {
  const theme = useMemo(() => (mode === "dark" ? DARK_THEME : LIGHT_THEME), [mode]);

  return <LavexThemeContext.Provider value={theme}>{children}</LavexThemeContext.Provider>;
};

export const useLavexTheme = (): LavexTheme => useContext(LavexThemeContext);
