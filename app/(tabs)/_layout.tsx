import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext, useRouter } from 'expo-router';
import { ParamListBase, TabNavigationState, Route } from '@react-navigation/native';
import { View, Pressable } from 'react-native';
import { Home, Search, Settings, LucideIcon } from 'lucide-react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

function AnimatedIcon({ Icon, isFocused }: { Icon: LucideIcon; isFocused: boolean }) {
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
      className="items-center justify-center">
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

function MyTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  const insets = useSafeAreaInsets();
  const icons: Record<string, LucideIcon> = {
    index: Home,
    two: Search,
    three: Settings,
  };

  return (
    <View
      className="flex-row border-t border-gray-100 bg-white pt-4"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}>
      {state.routes.map((route: Route<string>, index: number) => {
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
            className="flex-1 items-center justify-center active:opacity-70">
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
    if (!isAuthenticated && router && typeof router.replace === 'function') {
      try {
        router.replace('/(auth)/login');
      } catch (error) {
        console.error('Failed to navigate to /(auth)/login:', error);
      }
    }
  }, [isAuthenticated, router]);

  const renderTabBar = useCallback((props: MaterialTopTabBarProps) => <MyTabBar {...props} />, []);

  return (
    <MaterialTopTabs
      tabBar={renderTabBar}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
      }}>
      <MaterialTopTabs.Screen name="index" options={{ title: 'Home' }} />
      <MaterialTopTabs.Screen name="two" options={{ title: 'Search' }} />
      <MaterialTopTabs.Screen name="three" options={{ title: 'Settings' }} />
    </MaterialTopTabs>
  );
}
