export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  /** Fundo de tela. */
  background: string;
  /** Cards, campos e caixas com borda. */
  surface: string;
  /** Listas e fundo de linha. */
  surfaceSubtle: string;
  /** Cinza-claro de preenchimento e botão desabilitado. */
  surfaceMuted: string;
  /** Pílula ativa e caixa verde clara. */
  surfaceAccent: string;
  /** Caixa de erro. */
  surfaceDanger: string;
  /** Divisores e bordas suaves. */
  border: string;
  /** Borda de campo e de stepper. */
  borderInteractive: string;
  /** Texto padrão, `h2` e `h3`. */
  text: string;
  /** Texto de apoio, `Info` e ícone inativo. */
  textMuted: string;
  /** Links, `h4`, ícone ativo e foco. */
  accent: string;
  /** Link escuro. */
  accentDeep: string;
  /** Fundo do botão principal e `h1`. */
  primary: string;
  /** Texto sobre `primary`. */
  onPrimary: string;
  /** Erro e lixeira. */
  danger: string;
  /** `DarkInformationBox(Large)` e bolha enviada. */
  inverseSurface: string;
  /** Texto sobre `inverseSurface`. */
  onInverse: string;
  /** Estrela preenchida. */
  star: string;
};

export const lightColors: ThemeColors = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceSubtle: "#FAF9FA",
  surfaceMuted: "#E5E1E6",
  surfaceAccent: "#E2FAF6",
  surfaceDanger: "#FDECEC",
  border: "#E5E1E6",
  borderInteractive: "#869199",
  text: "#2D3B42",
  textMuted: "#5A6A72",
  accent: "#0B7566",
  accentDeep: "#08706D",
  primary: "#3CDBC0",
  onPrimary: "#2D3B42",
  danger: "#C62828",
  inverseSurface: "#2D3B42",
  onInverse: "#FFFFFF",
  star: "#FFD700",
};

export const darkColors: ThemeColors = {
  background: "#1B252A",
  surface: "#24323A",
  surfaceSubtle: "#24323A",
  surfaceMuted: "#34444C",
  surfaceAccent: "#14433D",
  surfaceDanger: "#4A2326",
  border: "#34444C",
  borderInteractive: "#6E7E86",
  text: "#F2F5F6",
  textMuted: "#A9B6BC",
  accent: "#3CDBC0",
  accentDeep: "#3CDBC0",
  primary: "#3CDBC0",
  onPrimary: "#1B252A",
  danger: "#FF6B6B",
  inverseSurface: "#E2FAF6",
  onInverse: "#1B252A",
  star: "#FFD700",
};
