import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { View, Pressable } from 'react-native';
import { Home, Search, Settings } from 'lucide-react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

function AnimatedIcon({ Icon, isFocused }: { Icon: any, isFocused: boolean }) {
  return (
    <MotiView
      animate={{
        scale: isFocused ? 1.05 : 0.9,
        opacity: isFocused ? 1 : 0.5,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 20,
        mass: 0.8,
        opacity: {
          type: 'timing',
          duration: 150,
        },
      }}
      className="items-center justify-center"
    >
      {Icon && (
        <Icon
          size={28}
          color={isFocused ? '#2563eb' : '#9ca3af'}
          strokeWidth={isFocused ? 2.5 : 2}
        />
      )}
    </MotiView>
  );
}

function MyTabBar({ state, descriptors, navigation }: any) {
  const icons: any = {
    index: Home,
    two: Search,
    three: Settings,
  };

  return (
    <View className="flex-row bg-white border-t border-gray-100 pt-4 pb-12">
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const Icon = icons[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.name}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`Navigate to ${route.name}`}
            className="flex-1 items-center justify-center active:opacity-70"
          >
            <AnimatedIcon Icon={Icon} isFocused={isFocused} />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, router]);

  return (
    <MaterialTopTabs
      tabBar={(props) => <MyTabBar {...props} />}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <MaterialTopTabs.Screen
        name="two"
        options={{ title: 'Search' }}
      />
      <MaterialTopTabs.Screen
        name="three"
        options={{ title: 'Settings' }}
      />
    </MaterialTopTabs>
  );
}

