import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabThreeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-slate-100">
      <Text className="text-3xl font-bold">Tab Three</Text>
      <Text className="mt-2 text-lg text-gray-500">Swipe right to go back</Text>
    </SafeAreaView>
  );
}
