import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Pressable, type PressableProps, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css';

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function TWPressable({
  className,
  pressedClassName,
  onPressIn,
  onPressOut,
  ...props
}: PressableProps & { className?: string; pressedClassName?: string }) {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <Pressable
      {...props}
      className={cn(className, isPressed && pressedClassName)}
      onPressIn={(e) => {
        setIsPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setIsPressed(false);
        onPressOut?.(e);
      }}
    />
  );
}

type CatProfile = {
  name: string;
  handle: string;
  ageLabel: string;
  locationLabel: string;
  bio: string;
  avatarUri: string;
  coverUri: string;
  badges: string[];
  stats: Array<{ label: string; value: string }>;
  traits: Array<{ label: string; levelPct: number; hint: string }>;
  favorites: Array<{ label: string; value: string }>;
};

const DEMO_CAT: CatProfile = {
  name: 'Miso',
  handle: '@miso.the.cat',
  ageLabel: '3y • Domestic shorthair',
  locationLabel: 'Window District • Apt 7B',
  bio: 'Professional napper, amateur bird-watcher, and full-time menace to unattended plants. Accepting treats and admiration.',
  avatarUri:
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=256&h=256&q=80',
  coverUri:
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=1200&q=80',
  badges: ['Treat Enthusiast', 'Bird TV', 'Sofa Sprinter', 'Box Collector', 'Laser Certified', 'Purr Engine v2'],
  stats: [
    { label: 'Followers', value: '12.4k' },
    { label: 'Zoomies', value: '5/day' },
    { label: 'Naps', value: '14h' },
  ],
  traits: [
    { label: 'Cuteness', levelPct: 96, hint: 'Irrefutable' },
    { label: 'Chaos', levelPct: 82, hint: 'With intent' },
    { label: 'Cuddles', levelPct: 54, hint: 'On schedule' },
    { label: 'Hunger', levelPct: 91, hint: 'Always' },
  ],
  favorites: [
    { label: 'Toy', value: 'Crinkly fish' },
    { label: 'Snack', value: 'Churu (any flavor)' },
    { label: 'Spot', value: 'Sunbeam at 3PM' },
    { label: 'Enemy', value: 'Vacuum (ancient evil)' },
  ],
};

function Pill({
  label,
  tone,
}: {
  label: string;
  tone: 'neutral' | 'brand' | 'warn' | 'success';
}) {
  const toneClasses =
    tone === 'brand'
      ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
      : tone === 'warn'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : tone === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-zinc-200 bg-zinc-50 text-zinc-700';

  return (
    <View className={cn('rounded-full border px-3 py-1', toneClasses)}>
      <Text className="text-xs font-semibold tracking-wide">{label}</Text>
    </View>
  );
}

function ProgressRow({
  label,
  hint,
  levelPct,
  barTone,
}: {
  label: string;
  hint: string;
  levelPct: number;
  barTone: 'indigo' | 'emerald' | 'amber' | 'rose';
}) {
  const bar = cn(
    'h-2 rounded-full',
    barTone === 'indigo'
      ? 'bg-indigo-500'
      : barTone === 'emerald'
        ? 'bg-emerald-500'
        : barTone === 'amber'
          ? 'bg-amber-500'
          : 'bg-rose-500',
  );

  return (
    <View className="gap-2">
      <View className="flex-row items-baseline justify-between">
        <Text className="text-sm font-semibold text-zinc-900">{label}</Text>
        <Text className="text-xs font-medium text-zinc-500">{hint}</Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-zinc-100">
        <View className={bar} style={{ width: `${Math.max(0, Math.min(100, levelPct))}%` }} />
      </View>
    </View>
  );
}

function CatProfileCard({
  cat,
  liked,
  compact,
  onToggleLiked,
}: {
  cat: CatProfile;
  liked: boolean;
  compact: boolean;
  onToggleLiked: () => void;
}) {
  return (
    <View className="w-full max-w-[460px] self-center overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-black/10">
      <View className="relative">
        <Image
          source={{ uri: cat.coverUri }}
          className="h-44 w-full"
          resizeMode="cover"
          accessibilityLabel="Cat cover photo"
        />

        <View className="absolute inset-0">
          <View className="absolute inset-x-0 bottom-0 h-20 bg-black/35" />
        </View>

        <View className="absolute left-5 top-5 flex-row gap-2">
          <Pill label="Verified floof" tone="brand" />
          <Pill label="No gluestack" tone="success" />
        </View>

        <View className="absolute right-5 top-5">
          <TWPressable
            onPress={onToggleLiked}
            pressedClassName="opacity-80"
            className={cn(
              'items-center justify-center rounded-full border px-4 py-2',
              liked ? 'border-rose-200 bg-rose-50' : 'border-white/35 bg-white/15',
            )}
            accessibilityRole="button"
            accessibilityLabel={liked ? 'Unlike' : 'Like'}
          >
            <Text className={cn('text-sm font-bold', liked ? 'text-rose-700' : 'text-white')}>{liked ? '♥ Liked' : '♡ Like'}</Text>
          </TWPressable>
        </View>

        <View className="absolute -bottom-10 left-5">
          <View className="rounded-full bg-white p-1 shadow-lg shadow-black/15">
            <Image
              source={{ uri: cat.avatarUri }}
              className="h-20 w-20 rounded-full"
              resizeMode="cover"
              accessibilityLabel="Cat avatar"
            />
          </View>
        </View>
      </View>

      <View className="px-5 pb-5 pt-12">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-2xl font-extrabold tracking-tight text-zinc-900">{cat.name}</Text>
            <Text className="mt-1 text-sm font-semibold text-zinc-500">{cat.handle}</Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              <Pill label={cat.ageLabel} tone="neutral" />
              <Pill label={cat.locationLabel} tone="neutral" />
              <Pill label={compact ? 'Compact mode' : 'Full mode'} tone={compact ? 'warn' : 'brand'} />
            </View>
          </View>

          <View className="min-w-[120px] rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
            {cat.stats.map((s) => (
              <View key={s.label} className="flex-row items-baseline justify-between">
                <Text className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{s.label}</Text>
                <Text className="text-sm font-extrabold text-zinc-900">{s.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {!compact && (
          <View className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
            <Text className="text-sm font-semibold text-zinc-900">Bio</Text>
            <Text className="mt-2 text-sm leading-5 text-zinc-600">{cat.bio}</Text>

            <View className="mt-4 h-px bg-zinc-100" />

            <Text className="mt-4 text-sm font-semibold text-zinc-900">Traits (Tailwind stress)</Text>
            <View className="mt-3 gap-3">
              <ProgressRow label={cat.traits[0]!.label} hint={cat.traits[0]!.hint} levelPct={cat.traits[0]!.levelPct} barTone="rose" />
              <ProgressRow label={cat.traits[1]!.label} hint={cat.traits[1]!.hint} levelPct={cat.traits[1]!.levelPct} barTone="amber" />
              <ProgressRow label={cat.traits[2]!.label} hint={cat.traits[2]!.hint} levelPct={cat.traits[2]!.levelPct} barTone="emerald" />
              <ProgressRow label={cat.traits[3]!.label} hint={cat.traits[3]!.hint} levelPct={cat.traits[3]!.levelPct} barTone="indigo" />
            </View>
          </View>
        )}

        <View className="mt-5">
          <Text className="text-sm font-semibold text-zinc-900">Badges</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {cat.badges.map((b, idx) => (
              <View
                key={`${b}-${idx}`}
                className={cn(
                  'rounded-full border px-3 py-1',
                  idx % 4 === 0
                    ? 'border-indigo-200 bg-indigo-50'
                    : idx % 4 === 1
                      ? 'border-emerald-200 bg-emerald-50'
                      : idx % 4 === 2
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-rose-200 bg-rose-50',
                )}
              >
                <Text
                  className={cn(
                    'text-xs font-semibold',
                    idx % 4 === 0
                      ? 'text-indigo-700'
                      : idx % 4 === 1
                        ? 'text-emerald-700'
                        : idx % 4 === 2
                          ? 'text-amber-700'
                          : 'text-rose-700',
                  )}
                >
                  {b}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {!compact && (
          <View className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <Text className="text-sm font-semibold text-zinc-900">Favorites</Text>
            <View className="mt-3 gap-2">
              {cat.favorites.map((f) => (
                <View key={f.label} className="flex-row items-center justify-between rounded-xl bg-white px-3 py-2">
                  <Text className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{f.label}</Text>
                  <Text className="text-sm font-bold text-zinc-900">{f.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className="mt-5 flex-row gap-3">
          <TWPressable
            pressedClassName="opacity-90"
            className="flex-1 items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3"
            accessibilityRole="button"
          >
            <Text className="text-sm font-bold text-white">Follow</Text>
            <Text className="mt-0.5 text-xs font-semibold text-white/70">Unlimited purr updates</Text>
          </TWPressable>

          <TWPressable
            pressedClassName="opacity-90"
            className="flex-1 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3"
            accessibilityRole="button"
          >
            <Text className="text-sm font-bold text-zinc-900">Message</Text>
            <Text className="mt-0.5 text-xs font-semibold text-zinc-500">“pspsps” supported</Text>
          </TWPressable>
        </View>

        <View className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-zinc-900">NativeWind signals</Text>
            <View className="flex-row gap-2">
              <View className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <Text className="text-xs font-semibold text-zinc-500">rendered</Text>
            </View>
          </View>
          <Text className="mt-2 text-xs leading-4 text-zinc-500">
            This card uses lots of className permutations (press state, conditional sections, flex wrap, borders, shadows,
            arbitrary max width, and dynamic progress widths) without any UI library.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [isDark, setIsDark] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [compact, setCompact] = React.useState(false);

  return (
    <SafeAreaView className={cn('flex-1', isDark ? 'bg-zinc-950' : 'bg-zinc-50')}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[460px] self-center">
          <Text className={cn('text-2xl font-extrabold tracking-tight', isDark ? 'text-white' : 'text-zinc-900')}>
            Tailwind / NativeWind stress test
          </Text>
          <Text className={cn('mt-1 text-sm font-semibold', isDark ? 'text-white/70' : 'text-zinc-500')}>
            Toggle state and press buttons to exercise conditional className rendering (no gluestack).
          </Text>

          <View className="mt-4 flex-row flex-wrap gap-2">
            <TWPressable
              onPress={() => setIsDark((v) => !v)}
              pressedClassName="opacity-80"
              className={cn(
                'rounded-full border px-4 py-2',
                isDark ? 'border-white/15 bg-white/10' : 'border-zinc-200 bg-white',
              )}
              accessibilityRole="button"
            >
              <Text className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-zinc-900')}>
                Theme: {isDark ? 'Dark' : 'Light'}
              </Text>
            </TWPressable>

            <TWPressable
              onPress={() => setCompact((v) => !v)}
              pressedClassName="opacity-80"
              className={cn(
                'rounded-full border px-4 py-2',
                compact ? 'border-amber-200 bg-amber-50' : 'border-zinc-200 bg-white',
              )}
              accessibilityRole="button"
            >
              <Text className={cn('text-xs font-bold', compact ? 'text-amber-800' : isDark ? 'text-white' : 'text-zinc-900')}>
                Layout: {compact ? 'Compact' : 'Full'}
              </Text>
            </TWPressable>

            <View className="ml-auto" />

            <View className={cn('rounded-full border px-4 py-2', isDark ? 'border-white/15 bg-white/10' : 'border-zinc-200 bg-white')}>
              <Text className={cn('text-xs font-bold', isDark ? 'text-white' : 'text-zinc-900')}>NativeWind ✅</Text>
            </View>
          </View>
        </View>

        <CatProfileCard cat={DEMO_CAT} liked={liked} compact={compact} onToggleLiked={() => setLiked((v) => !v)} />

        <View className="w-full max-w-[460px] self-center rounded-2xl border border-zinc-200 bg-white p-4">
          <Text className="text-sm font-semibold text-zinc-900">Extra stress: dense grid</Text>
          <Text className="mt-1 text-xs font-medium text-zinc-500">
            If you previously saw flaky styling, this section helps catch class parsing / merging issues.
          </Text>
          <View className="mt-4 flex-row flex-wrap gap-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <View
                key={i}
                className={cn(
                  'w-[30%] min-w-[96px] flex-1 rounded-xl border p-3',
                  i % 6 === 0
                    ? 'border-indigo-200 bg-indigo-50'
                    : i % 6 === 1
                      ? 'border-emerald-200 bg-emerald-50'
                      : i % 6 === 2
                        ? 'border-amber-200 bg-amber-50'
                        : i % 6 === 3
                          ? 'border-rose-200 bg-rose-50'
                          : i % 6 === 4
                            ? 'border-cyan-200 bg-cyan-50'
                            : 'border-violet-200 bg-violet-50',
                )}
              >
                <Text className="text-xs font-extrabold text-zinc-900">Tile {i + 1}</Text>
                <Text className="mt-1 text-[11px] font-semibold text-zinc-600">border + bg + wrap</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
