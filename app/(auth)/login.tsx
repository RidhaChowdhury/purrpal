import { View, Text, Pressable } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { LogIn } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && router && typeof router.replace === 'function') {
      try {
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Failed to navigate to /(tabs):', error);
      }
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white p-6">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 1000 }}
        className="items-center">
        <View className="mb-6 rounded-full bg-blue-50 p-6">
          <LogIn size={48} color="#2563eb" />
        </View>
        <Text className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</Text>
        <Text className="mb-10 px-4 text-center text-gray-500">
          This is a dummy auth flow. Press the button below to get started.
        </Text>

        <Pressable
          onPress={signIn}
          className="w-full items-center rounded-2xl bg-blue-600 px-4 py-4 transition-all"
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.98 : 1 }],
              opacity: pressed ? 0.9 : 1,
            },
          ]}>
          <Text className="text-lg font-bold text-white">Sign In</Text>
        </Pressable>
      </MotiView>
    </SafeAreaView>
  );
}
