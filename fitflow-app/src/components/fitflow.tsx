import type { PropsWithChildren, ReactNode } from 'react';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const colors = {
  blue: '#3478F6',
  blueDark: '#2056C7',
  blueLight: '#EAF1FF',
  green: '#20B486',
  greenLight: '#E6F7F1',
  ink: '#17233B',
  body: '#526078',
  muted: '#97A2B5',
  border: '#E9EDF3',
  canvas: '#F6F8FB',
  white: '#FFFFFF',
  orange: '#FFAA55',
  pink: '#F07886',
};

export function Page({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.page, { flex: 1 }]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  back = false,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerMain}>
        {back && (
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={colors.ink} />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  badge = false,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  badge?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={icon} onPress={onPress} style={styles.iconButton}>
      <Feather name={icon} size={19} color={colors.ink} />
      {badge ? <View style={styles.badgeDot} /> : null}
    </Pressable>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onAction}>
          <Text style={styles.actionText}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  icon,
  style,
}: {
  title: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof Feather>['name'];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable accessibilityRole="button" style={[styles.primaryButton, style]} onPress={onPress}>
      {icon ? <Feather name={icon} size={17} color={colors.white} /> : null}
      <Text style={styles.primaryButtonText}>{title}</Text>
    </Pressable>
  );
}

export function OutlineButton({
  title,
  onPress,
  icon,
}: {
  title: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof Feather>['name'];
}) {
  return (
    <Pressable accessibilityRole="button" style={styles.outlineButton} onPress={onPress}>
      {icon ? <Feather name={icon} size={16} color={colors.blue} /> : null}
      <Text style={styles.outlineButtonText}>{title}</Text>
    </Pressable>
  );
}

export function ProgressBar({ value, tint = colors.blue, track = colors.blueLight }: { value: number; tint?: string; track?: string }) {
  return (
    <View style={[styles.progressTrack, { backgroundColor: track }]}>
      <View style={[styles.progressFill, { width: `${Math.max(0, Math.min(value, 100))}%`, backgroundColor: tint }]} />
    </View>
  );
}

export function Tag({ text, tint = colors.green, background = colors.greenLight }: { text: string; tint?: string; background?: string }) {
  return (
    <View style={[styles.tag, { backgroundColor: background }]}>
      <Text style={[styles.tagText, { color: tint }]}>{text}</Text>
    </View>
  );
}

export function MiniMetric({
  icon,
  label,
  value,
  unit,
  color,
  background,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  value: string;
  unit: string;
  color: string;
  background: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: background }]}>
        <Feather name={icon} size={16} color={color} />
      </View>
      <Text style={styles.metricValue}>{value}<Text style={styles.metricUnit}> {unit}</Text></Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

export function Avatar({ size = 42, initial = 'A' }: { size?: number; initial?: string }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ color: colors.blueDark, fontSize: size * 0.36, fontWeight: '800' }}>{initial}</Text>
    </View>
  );
}

export function LabelValue({ label, value, style }: { label: string; value: string; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.labelValue, style]}>{label}<Text style={styles.valueText}> {value}</Text></Text>;
}

export const sharedStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  spread: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  muted: { color: colors.body, fontSize: 13, lineHeight: 19 },
  smallMuted: { color: colors.muted, fontSize: 11, lineHeight: 16 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  page: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 28, gap: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 48 },
  headerMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  backButton: { width: 38, height: 38, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  screenTitle: { color: colors.ink, fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: colors.body, fontSize: 13, marginTop: 3 },
  iconButton: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badgeDot: { position: 'absolute', right: 10, top: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.pink, borderWidth: 1, borderColor: colors.white },
  card: { backgroundColor: colors.white, borderRadius: 22, padding: 17, borderWidth: 1, borderColor: '#F0F2F6' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: colors.ink, fontSize: 17, fontWeight: '700' },
  actionText: { color: colors.blue, fontSize: 12, fontWeight: '700' },
  primaryButton: { minHeight: 48, backgroundColor: colors.blue, borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, paddingHorizontal: 18 },
  primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  outlineButton: { minHeight: 42, borderWidth: 1, borderColor: '#DCE7FF', borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 14, backgroundColor: colors.white },
  outlineButtonText: { color: colors.blue, fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 7, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  tag: { alignSelf: 'flex-start', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 9 },
  tagText: { fontSize: 10, fontWeight: '700' },
  metricCard: { flex: 1, minHeight: 120, padding: 12, backgroundColor: colors.white, borderRadius: 19, borderWidth: 1, borderColor: '#F0F2F6' },
  metricIcon: { width: 31, height: 31, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  metricValue: { color: colors.ink, fontSize: 18, fontWeight: '800', letterSpacing: -0.4 },
  metricUnit: { color: colors.body, fontSize: 10, fontWeight: '500', letterSpacing: 0 },
  metricLabel: { color: colors.body, fontSize: 11, marginTop: 3 },
  avatar: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#DCEAFF', borderWidth: 2, borderColor: colors.white },
  labelValue: { color: colors.body, fontSize: 12 },
  valueText: { color: colors.ink, fontWeight: '700' },
});
