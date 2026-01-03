import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { LogOut } from 'lucide-react-native';

export default function TabThreeScreen() {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-slate-100 p-6">
      <Text className="text-3xl font-bold">Settings</Text>
      <Text className="mt-2 text-lg text-gray-500 mb-10">Swipe right to go back</Text>

      <Pressable
        onPress={signOut}
        className="flex-row items-center bg-red-50 px-6 py-4 rounded-2xl active:bg-red-100"
      >
        <LogOut size={20} color="#ef4444" />
        <Text className="ml-2 text-red-500 font-bold text-lg">Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
