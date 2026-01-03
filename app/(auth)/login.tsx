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
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 1000 }}
        className="items-center"
      >
        <View className="bg-blue-50 p-6 rounded-full mb-6">
          <LogIn size={48} color="#2563eb" />
        </View>
        <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
        <Text className="text-gray-500 text-center mb-10 px-4">
          This is a dummy auth flow. Press the button below to get started.
        </Text>

        <Pressable
          onPress={signIn}
          className="bg-blue-600 w-full px-4 py-4 rounded-2xl items-center active:opacity-90 active:scale-[0.98] transition-all"
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </Pressable>
      </MotiView>
    </SafeAreaView>
  );
}

