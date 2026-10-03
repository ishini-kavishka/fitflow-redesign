import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F6F8FB' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="profile" options={{ presentation: 'card' }} />
        <Stack.Screen name="notifications" options={{ presentation: 'card' }} />
        <Stack.Screen name="active-workout" options={{ presentation: 'card' }} />
      </Stack>
    </>
  );
}
