import { Stack } from "expo-router";
import { GluestackUIProvider } from '@src/ui/gluestack-ui-provider';
import '@src/global.css';

export default function RootLayout() {
  return (
    // TODO: Mover para nível componentes, a fim de isentar os projetos de borda de importarem essa dependência diretamente
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
