import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Ye pura (tabs) folder ek screen ki tarah handle hoga */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Normal pages */}
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
