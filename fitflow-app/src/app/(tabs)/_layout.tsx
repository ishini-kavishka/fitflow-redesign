import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/components/fitflow';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 66,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="workout" options={{ title: 'Workout', tabBarIcon: ({ color, size }) => <Feather name="activity" color={color} size={size} /> }} />
      <Tabs.Screen name="nutrition" options={{ title: 'Nutrition', tabBarIcon: ({ color, size }) => <Feather name="pie-chart" color={color} size={size} /> }} />
      <Tabs.Screen name="community" options={{ title: 'Community', tabBarIcon: ({ color, size }) => <Feather name="users" color={color} size={size} /> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: ({ color, size }) => <Feather name="trending-up" color={color} size={size} /> }} />
    </Tabs>
  );
}
