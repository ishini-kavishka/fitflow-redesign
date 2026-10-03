import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Card, colors, MiniMetric, Page, ProgressBar, ScreenHeader, SectionTitle, Tag } from '@/components/fitflow';

const chartData = [
  { day: 'M', height: 42 },
  { day: 'T', height: 70 },
  { day: 'W', height: 51 },
  { day: 'T', height: 88 },
  { day: 'F', height: 57 },
  { day: 'S', height: 77 },
  { day: 'S', height: 33 },
];

export default function ProgressScreen() {
  return (
    <Page>
      <ScreenHeader title="Your progress" subtitle="Small steps. Big changes." right={<Tag text="THIS WEEK" tint={colors.blue} background={colors.blueLight} />} />

      <Card style={styles.weekCard}>
        <View style={styles.weekHeader}>
          <View><Text style={styles.chartLabel}>WEEKLY ACTIVITY</Text><Text style={styles.chartTitle}>You’re on a roll, Alex!</Text></View>
          <View style={styles.trend}><Feather name="trending-up" size={14} color={colors.green} /><Text style={styles.trendText}>+18%</Text></View>
        </View>
        <View style={styles.chart}>
          {chartData.map((item, index) => (
            <View key={`${item.day}-${index}`} style={styles.chartColumn}>
              <View style={styles.chartTrack}><View style={[styles.chartBar, { height: `${item.height}%`, backgroundColor: index === 5 ? colors.green : colors.blue }]} /></View>
              <Text style={[styles.chartDay, index === 5 && { color: colors.green, fontWeight: '800' }]}>{item.day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}><View style={styles.legendDot} /><Text style={styles.legendText}>Activity minutes per day</Text><Text style={styles.legendTotal}>312 min total</Text></View>
      </Card>

      <View style={styles.metrics}>
        <MiniMetric icon="check-circle" label="Workouts done" value="4" unit="/ 5" color={colors.green} background={colors.greenLight} />
        <MiniMetric icon="zap" label="Calories burned" value="2,460" unit="kcal" color="#F19A35" background="#FFF3E4" />
        <MiniMetric icon="clock" label="Active time" value="312" unit="min" color={colors.blue} background={colors.blueLight} />
      </View>

      <View style={styles.section}>
        <SectionTitle title="Your streak" />
        <Card style={styles.streakCard}>
          <View style={styles.streakIcon}><Feather name="award" size={21} color="#F19A35" /></View>
          <View style={{ flex: 1 }}><Text style={styles.streakTitle}>12 day streak!</Text><Text style={styles.streakCopy}>You’ve moved your body 12 days in a row.</Text></View>
          <View style={styles.streakNumber}><Text style={styles.streakNumberText}>12</Text><Text style={styles.streakDays}>DAYS</Text></View>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.goalHeading}><SectionTitle title="Goal progress" action="Edit goals" /><Text style={styles.goalWeek}>THIS WEEK</Text></View>
        <Card style={styles.goalCard}>
          <GoalRow title="Workout sessions" value="4 of 5" progress={80} tint={colors.blue} />
          <GoalRow title="Daily steps" value="6.8k / 8k avg" progress={85} tint={colors.green} />
          <GoalRow title="Active minutes" value="312 / 300 min" progress={100} tint="#F3AA54" />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Achievements" action="View all" />
        <View style={styles.achievementRow}>
          <Achievement icon="zap" title="Early bird" subtitle="5 morning workouts" tint="#F1A33B" bg="#FFF2DD" />
          <Achievement icon="activity" title="Consistency" subtitle="12-day streak" tint={colors.green} bg={colors.greenLight} />
          <Achievement icon="heart" title="Community" subtitle="First challenge" tint={colors.pink} bg="#FFF0F2" />
        </View>
      </View>

      <Card style={styles.weightCard}>
        <View style={styles.weightTop}>
          <View><Text style={styles.chartLabel}>BODY WEIGHT</Text><Text style={styles.weightValue}>68.4 <Text style={styles.weightUnit}>kg</Text></Text></View>
          <View style={styles.changePill}><Feather name="arrow-down-right" size={12} color={colors.green} /><Text style={styles.changeText}>0.8 kg</Text></View>
        </View>
        <Text style={styles.weightCaption}>Down 0.8 kg this month · steady progress toward your goal</Text>
        <View style={styles.weightLine}><View style={styles.weightLineBase} /><View style={[styles.weightPoint, { left: '8%', top: 15 }]} /><View style={[styles.weightPoint, { left: '28%', top: 21 }]} /><View style={[styles.weightPoint, { left: '48%', top: 30 }]} /><View style={[styles.weightPoint, { left: '69%', top: 35 }]} /><View style={[styles.weightPoint, { left: '91%', top: 44, backgroundColor: colors.green }]} /></View>
        <View style={styles.weightDates}><Text>SEP 7</Text><Text>SEP 14</Text><Text>SEP 21</Text><Text>OCT 5</Text></View>
      </Card>
    </Page>
  );
}

function GoalRow({ title, value, progress, tint }: { title: string; value: string; progress: number; tint: string }) {
  return (
    <View style={styles.goalRow}>
      <View style={styles.goalLabels}><Text style={styles.goalTitle}>{title}</Text><Text style={styles.goalValue}>{value}</Text></View>
      <ProgressBar value={progress} tint={tint} track="#EFF2F6" />
    </View>
  );
}

function Achievement({ icon, title, subtitle, tint, bg }: { icon: React.ComponentProps<typeof Feather>['name']; title: string; subtitle: string; tint: string; bg: string }) {
  return (
    <Card style={styles.achievement}>
      <View style={[styles.achievementIcon, { backgroundColor: bg }]}><Feather name={icon} size={17} color={tint} /></View>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementSub}>{subtitle}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  weekCard: { padding: 17 },
  weekHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chartLabel: { color: colors.muted, fontSize: 9, letterSpacing: 0.8, fontWeight: '700' },
  chartTitle: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 5 },
  trend: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.greenLight, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6 },
  trendText: { color: colors.green, fontSize: 10, fontWeight: '800' },
  chart: { height: 115, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 18 },
  chartColumn: { alignItems: 'center', gap: 7, flex: 1 },
  chartTrack: { height: 86, width: 20, backgroundColor: '#F0F3F8', borderRadius: 8, justifyContent: 'flex-end', overflow: 'hidden' },
  chartBar: { width: '100%', borderRadius: 8 },
  chartDay: { color: colors.muted, fontSize: 9, fontWeight: '600' },
  chartLegend: { flexDirection: 'row', alignItems: 'center', marginTop: 13, gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.blue },
  legendText: { color: colors.body, fontSize: 9 },
  legendTotal: { color: colors.ink, fontSize: 9, fontWeight: '700', marginLeft: 'auto' },
  metrics: { flexDirection: 'row', gap: 9 },
  section: { gap: 10 },
  streakCard: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 15, backgroundColor: '#FFF9F0', borderColor: '#F7EDDD' },
  streakIcon: { width: 39, height: 39, borderRadius: 14, backgroundColor: '#FFEDD0', alignItems: 'center', justifyContent: 'center' },
  streakTitle: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  streakCopy: { color: colors.body, fontSize: 10, lineHeight: 15, marginTop: 3 },
  streakNumber: { alignItems: 'center', paddingLeft: 8 },
  streakNumberText: { color: '#F19A35', fontSize: 19, fontWeight: '800' },
  streakDays: { color: colors.body, fontSize: 8, fontWeight: '700' },
  goalHeading: { gap: 5 },
  goalWeek: { color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 0.7 },
  goalCard: { paddingVertical: 15, gap: 16 },
  goalRow: { gap: 8 },
  goalLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  goalTitle: { color: colors.ink, fontSize: 10, fontWeight: '700' },
  goalValue: { color: colors.body, fontSize: 9 },
  achievementRow: { flexDirection: 'row', gap: 8 },
  achievement: { flex: 1, alignItems: 'center', padding: 11, borderRadius: 18 },
  achievementIcon: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  achievementTitle: { color: colors.ink, fontSize: 9, fontWeight: '800' },
  achievementSub: { color: colors.muted, fontSize: 8, textAlign: 'center', marginTop: 3 },
  weightCard: { padding: 16 },
  weightTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  weightValue: { color: colors.ink, fontSize: 25, fontWeight: '800', marginTop: 4 },
  weightUnit: { color: colors.body, fontSize: 13, fontWeight: '500' },
  changePill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.greenLight, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 10 },
  changeText: { color: colors.green, fontSize: 9, fontWeight: '700' },
  weightCaption: { color: colors.body, fontSize: 10, lineHeight: 15, marginTop: 5 },
  weightLine: { height: 66, position: 'relative', marginTop: 7 },
  weightLineBase: { position: 'absolute', left: '8%', right: '7%', top: 31, height: 2, backgroundColor: '#D9E7E3', transform: [{ rotate: '13deg' }] },
  weightPoint: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: colors.greenLight, borderWidth: 2, borderColor: colors.green },
  weightDates: { flexDirection: 'row', justifyContent: 'space-between' },
});
