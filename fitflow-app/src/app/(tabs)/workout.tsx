import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, colors, Page, PrimaryButton, ScreenHeader, SectionTitle, Tag } from '@/components/fitflow';

const exercises = [
  { name: 'Goblet squats', detail: '3 sets · 12 reps', icon: 'activity' as const },
  { name: 'Dumbbell chest press', detail: '3 sets · 10 reps', icon: 'chevrons-up' as const },
  { name: 'Bent-over rows', detail: '3 sets · 12 reps', icon: 'repeat' as const },
  { name: 'Reverse lunges', detail: '3 sets · 10 each side', icon: 'move' as const },
  { name: 'Plank hold', detail: '3 rounds · 40 sec', icon: 'minus' as const },
];

export default function WorkoutScreen() {
  return (
    <Page>
      <ScreenHeader title="AI Workout Plan" subtitle="A plan that moves with you" />

      <Card style={styles.hero}>
        <View style={styles.heroTop}>
          <Tag text="MADE FOR YOUR GOALS" tint="#FFFFFF" background="rgba(255,255,255,0.18)" />
          <View style={styles.spark}><Feather name="zap" size={16} color="#FFE08A" /></View>
        </View>
        <Text style={styles.heroTitle}>Full Body{"\n"}Strength</Text>
        <Text style={styles.heroCopy}>A balanced session to build strength and keep your momentum going.</Text>
        <View style={styles.stats}>
          <View style={styles.stat}><Feather name="clock" size={14} color="#D8E4FF" /><Text style={styles.statText}>35 min</Text></View>
          <View style={styles.stat}><Feather name="bar-chart-2" size={14} color="#D8E4FF" /><Text style={styles.statText}>Moderate</Text></View>
          <View style={styles.stat}><Feather name="activity" size={14} color="#D8E4FF" /><Text style={styles.statText}>280 kcal</Text></View>
        </View>
        <View style={styles.heroDecoration} />
      </Card>

      <Card style={styles.reason}>
        <View style={styles.reasonIcon}><Feather name="message-circle" size={16} color={colors.green} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.reasonTitle}>Why this plan?</Text>
          <Text style={styles.reasonText}>Your recent activity and strength goal make today a great day for a full-body session.</Text>
        </View>
      </Card>

      <View style={styles.section}>
        <SectionTitle title="Today's exercises" />
        <Card style={styles.exerciseCard}>
          {exercises.map((item, index) => (
            <View key={item.name} style={[styles.exerciseRow, index > 0 && styles.exerciseBorder]}>
              <View style={styles.exerciseIcon}><Feather name={item.icon} size={16} color={colors.blue} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseDetail}>{item.detail}</Text>
              </View>
              <Feather name="more-horizontal" size={18} color={colors.muted} />
            </View>
          ))}
        </Card>
      </View>

      <View style={styles.buttonRow}>
        <Pressable accessibilityRole="button" style={styles.customize} onPress={() => router.push('/active-workout?customize=1')}>
          <Feather name="sliders" size={17} color={colors.blue} />
          <Text style={styles.customizeText}>Adjust plan</Text>
        </Pressable>
        <PrimaryButton title="Start workout" icon="play" style={styles.startButton} onPress={() => router.push('/active-workout')} />
      </View>
      <Text style={styles.footerHint}>Your AI plan adapts as your routine changes.</Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 19, overflow: 'hidden', backgroundColor: colors.blue, borderColor: colors.blue },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  spark: { width: 32, height: 32, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { color: colors.white, fontSize: 27, lineHeight: 31, fontWeight: '800', marginTop: 15, letterSpacing: -0.7 },
  heroCopy: { color: '#DFE8FF', fontSize: 12, lineHeight: 18, marginTop: 8, maxWidth: '86%' },
  stats: { flexDirection: 'row', gap: 17, marginTop: 18 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  heroDecoration: { position: 'absolute', right: -48, bottom: -55, width: 160, height: 160, borderWidth: 25, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 80 },
  reason: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', padding: 15 },
  reasonIcon: { backgroundColor: colors.greenLight, width: 32, height: 32, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  reasonTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  reasonText: { color: colors.body, fontSize: 11, lineHeight: 16, marginTop: 4 },
  section: { gap: 10 },
  exerciseCard: { paddingVertical: 4 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', gap: 11, minHeight: 62 },
  exerciseBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  exerciseIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  exerciseName: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  exerciseDetail: { color: colors.body, fontSize: 10, marginTop: 3 },
  buttonRow: { flexDirection: 'row', gap: 9 },
  customize: { flex: 0.82, minHeight: 48, backgroundColor: colors.white, borderWidth: 1, borderColor: '#DCE7FF', borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 },
  customizeText: { color: colors.blue, fontSize: 12, fontWeight: '700' },
  startButton: { flex: 1.25 },
  footerHint: { color: colors.muted, fontSize: 10, textAlign: 'center', marginTop: -10 },
});
