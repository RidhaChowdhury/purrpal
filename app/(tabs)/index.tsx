import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold">Tab One</Text>
      <Text className="mt-2 text-lg text-gray-500">Swipe left to see Tab Two</Text>
    </SafeAreaView>
  );
}
