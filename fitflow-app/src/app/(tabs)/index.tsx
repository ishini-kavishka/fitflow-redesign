import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Avatar,
  Card,
  colors,
  IconButton,
  MiniMetric,
  Page,
  PrimaryButton,
  ProgressBar,
  SectionTitle,
  Tag,
} from '@/components/fitflow';

const week = [
  { day: 'M', amount: 68 },
  { day: 'T', amount: 92 },
  { day: 'W', amount: 52 },
  { day: 'T', amount: 82 },
  { day: 'F', amount: 44 },
  { day: 'S', amount: 74 },
  { day: 'S', amount: 25 },
];

export default function HomeScreen() {
  return (
    <Page>
      <View style={styles.topbar}>
        <View style={styles.greeting}>
          <Text style={styles.eyebrow}>MONDAY, OCTOBER 5</Text>
          <Text style={styles.greetingTitle}>Good Morning, Alex</Text>
          <Text style={styles.greetingSub}>Ready to make today count?</Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton icon="bell" badge onPress={() => router.push('/notifications')} />
          <Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push('/profile')}>
            <Avatar size={43} />
          </Pressable>
        </View>
      </View>

      <Card style={styles.dailyCard}>
        <View style={styles.dailyTitleRow}>
          <View>
            <Text style={styles.cardEyebrow}>YOUR DAILY SNAPSHOT</Text>
            <Text style={styles.dailyTitle}>A strong start</Text>
          </View>
          <View style={styles.sunIcon}><Feather name="sun" size={18} color="#F19A35" /></View>
        </View>
        <View style={styles.goalRow}>
          <Text style={styles.goalLabel}>Daily activity goal</Text>
          <Text style={styles.goalPercent}>68%</Text>
        </View>
        <ProgressBar value={68} tint={colors.green} track="#EAF5F0" />
        <Text style={styles.goalHint}>You’re building a great routine. Keep it going!</Text>
      </Card>

      <View style={styles.metricRow}>
        <MiniMetric icon="zap" label="Calories burned" value="428" unit="kcal" color="#F19A35" background="#FFF3E4" />
        <MiniMetric icon="navigation" label="Steps" value="6,842" unit="steps" color={colors.blue} background={colors.blueLight} />
        <MiniMetric icon="clock" label="Active minutes" value="42" unit="min" color={colors.green} background={colors.greenLight} />
      </View>

      <View style={styles.section}>
        <SectionTitle title="Today's workout" action="See plan" onAction={() => router.push('/workout')} />
        <Card style={styles.workoutCard}>
          <View style={styles.workoutArt}>
            <View style={styles.artCircle}><Feather name="activity" size={24} color={colors.blue} /></View>
            <View style={styles.workoutSummary}>
              <Tag text="AI PICK FOR YOU" tint={colors.blue} background={colors.blueLight} />
              <Text style={styles.workoutTitle}>Full Body Strength</Text>
              <Text style={styles.workoutMeta}>35 min  ·  6 exercises</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.muted} />
          </View>
          <PrimaryButton title="Start today's workout" icon="play" onPress={() => router.push('/active-workout')} />
        </Card>
      </View>

      <Card style={styles.aiCard}>
        <View style={styles.aiTop}>
          <View style={styles.aiSpark}><Feather name="command" size={16} color={colors.white} /></View>
          <Tag text="PERSONALIZED FOR YOU" tint="#FFFFFF" background="rgba(255,255,255,0.17)" />
        </View>
        <Text style={styles.aiTitle}>Your Daily Flow</Text>
        <Text style={styles.aiCopy}>A balanced strength session will help you build on this week’s momentum.</Text>
        <Pressable style={styles.aiLink} onPress={() => router.push('/workout')}>
          <Text style={styles.aiLinkText}>Explore your AI plan</Text><Feather name="arrow-right" size={15} color={colors.white} />
        </Pressable>
        <View style={styles.aiDecoration} />
      </Card>

      <View style={styles.section}>
        <SectionTitle title="Your week so far" action="Details" onAction={() => router.push('/progress')} />
        <Card style={styles.weekCard}>
          <View style={styles.weekTop}>
            <View><Text style={styles.weekValue}>4 <Text style={styles.weekTotal}>/ 5 workouts</Text></Text><Text style={styles.weekHint}>One more to hit your weekly goal!</Text></View>
            <View style={styles.weekIcon}><Feather name="award" size={17} color={colors.green} /></View>
          </View>
          <View style={styles.chart}>
            {week.map((item, index) => (
              <View style={styles.barColumn} key={`${item.day}-${index}`}>
                <View style={styles.barTrack}><View style={[styles.barFill, { height: `${item.amount}%`, backgroundColor: index === 5 ? colors.green : colors.blue }]} /></View>
                <Text style={[styles.dayText, index === 5 && styles.todayText]}>{item.day}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      <View style={styles.quickRow}>
        <Pressable style={[styles.quickCard, { backgroundColor: '#EFF8F5' }]} onPress={() => router.push('/nutrition')}>
          <View style={[styles.quickIcon, { backgroundColor: '#D9F1E7' }]}><Feather name="coffee" size={18} color={colors.green} /></View>
          <Text style={styles.quickTitle}>Nutrition</Text>
          <Text style={styles.quickSub}>Log a meal</Text>
        </Pressable>
        <Pressable style={[styles.quickCard, { backgroundColor: '#F0F3FF' }]} onPress={() => router.push('/community')}>
          <View style={[styles.quickIcon, { backgroundColor: '#DFE7FF' }]}><Feather name="users" size={18} color={colors.blue} /></View>
          <Text style={styles.quickTitle}>Community</Text>
          <Text style={styles.quickSub}>Move together</Text>
        </Pressable>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingTop: 3 },
  greeting: { flex: 1 },
  eyebrow: { color: colors.muted, fontSize: 9, letterSpacing: 1.1, fontWeight: '700' },
  greetingTitle: { color: colors.ink, fontSize: 21, fontWeight: '800', letterSpacing: -0.55, marginTop: 5 },
  greetingSub: { color: colors.body, fontSize: 12, marginTop: 4 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dailyCard: { padding: 18 },
  dailyTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardEyebrow: { color: colors.muted, fontSize: 9, letterSpacing: 0.9, fontWeight: '700' },
  dailyTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginTop: 5 },
  sunIcon: { width: 36, height: 36, backgroundColor: '#FFF3E4', borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, marginBottom: 8 },
  goalLabel: { color: colors.body, fontSize: 11 },
  goalPercent: { color: colors.green, fontSize: 11, fontWeight: '800' },
  goalHint: { color: colors.muted, fontSize: 10, marginTop: 9 },
  metricRow: { flexDirection: 'row', gap: 9 },
  section: { gap: 11 },
  workoutCard: { padding: 13 },
  workoutArt: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 13 },
  artCircle: { width: 52, height: 52, borderRadius: 17, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  workoutSummary: { flex: 1, gap: 4 },
  workoutTitle: { color: colors.ink, fontWeight: '800', fontSize: 14, marginTop: 1 },
  workoutMeta: { color: colors.body, fontSize: 11 },
  aiCard: { padding: 19, overflow: 'hidden', backgroundColor: colors.blueDark, borderColor: colors.blueDark },
  aiTop: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  aiSpark: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.18)' },
  aiTitle: { color: colors.white, fontSize: 20, fontWeight: '800', marginTop: 13 },
  aiCopy: { color: '#D5E1FF', fontSize: 12, lineHeight: 18, maxWidth: '88%', marginTop: 5 },
  aiLink: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15 },
  aiLinkText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  aiDecoration: { position: 'absolute', width: 135, height: 135, borderRadius: 70, borderWidth: 23, borderColor: 'rgba(255,255,255,0.06)', right: -40, bottom: -66 },
  weekCard: { padding: 16 },
  weekTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  weekValue: { color: colors.ink, fontSize: 22, fontWeight: '800' },
  weekTotal: { color: colors.body, fontSize: 12, fontWeight: '500' },
  weekHint: { color: colors.body, fontSize: 10, marginTop: 3 },
  weekIcon: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.greenLight },
  chart: { height: 86, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 13 },
  barColumn: { alignItems: 'center', gap: 6, flex: 1 },
  barTrack: { width: 17, height: 62, backgroundColor: '#F0F3F8', borderRadius: 7, justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 7 },
  dayText: { color: colors.muted, fontSize: 9, fontWeight: '600' },
  todayText: { color: colors.green },
  quickRow: { flexDirection: 'row', gap: 12 },
  quickCard: { flex: 1, minHeight: 116, borderRadius: 20, padding: 15 },
  quickIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickTitle: { color: colors.ink, fontSize: 13, fontWeight: '800', marginTop: 9 },
  quickSub: { color: colors.body, fontSize: 10, marginTop: 2 },
});
