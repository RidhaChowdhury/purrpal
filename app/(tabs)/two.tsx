import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
      <Text className="text-3xl font-bold">Tab Two</Text>
      <Text className="mt-2 text-lg text-gray-500">Swipe left or right</Text>
    </SafeAreaView>
  );
}
