import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Auth from '../../components/Auth';

export default function LoginScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
      <Auth />
    </SafeAreaView>
  );
}

