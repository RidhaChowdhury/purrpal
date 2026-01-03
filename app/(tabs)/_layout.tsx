import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
      }}
    >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: 'Tab One',
          }}
        />
        <MaterialTopTabs.Screen
          name="two"
          options={{
            title: 'Tab Two',
          }}
        />
        <MaterialTopTabs.Screen
          name="three"
          options={{
            title: 'Tab Three',
          }}
        />
      </MaterialTopTabs>
  );
}

