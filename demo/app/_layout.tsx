import { Stack } from "expo-router";
import { GluestackUIProvider } from '@src/ui/gluestack-ui-provider';
import '@src/global.css';

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
