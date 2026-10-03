import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, colors, Page, PrimaryButton, ProgressBar, ScreenHeader } from '@/components/fitflow';

const activeExercises = ['Goblet squats', 'Dumbbell chest press', 'Bent-over rows', 'Reverse lunges', 'Plank hold'];

export default function ActiveWorkoutScreen() {
  const { customize } = useLocalSearchParams<{ customize?: string }>();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [duration, setDuration] = useState(35);
  const [difficulty, setDifficulty] = useState('Moderate');

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  function formatTime(total: number) {
    const minutes = Math.floor(total / 60).toString().padStart(2, '0');
    const remaining = (total % 60).toString().padStart(2, '0');
    return `${minutes}:${remaining}`;
  }

  if (customize === '1') {
    return (
      <Page>
        <ScreenHeader title="Adjust your plan" subtitle="Make it feel right for you" back />
        <Card style={styles.customCard}>
          <Text style={styles.customTitle}>How much time do you have?</Text>
          <Text style={styles.customHint}>Choose a workout length for today.</Text>
          <View style={styles.options}>
            {[25, 35, 45].map((minutes) => <Option key={minutes} selected={duration === minutes} label={`${minutes} min`} onPress={() => setDuration(minutes)} />)}
          </View>
        </Card>
        <Card style={styles.customCard}>
          <Text style={styles.customTitle}>Choose your intensity</Text>
          <Text style={styles.customHint}>We’ll keep the same balanced exercise focus.</Text>
          <View style={styles.options}>
            {['Easy', 'Moderate', 'Challenging'].map((option) => <Option key={option} selected={difficulty === option} label={option} onPress={() => setDifficulty(option)} />)}
          </View>
        </Card>
        <View style={styles.adaptNote}><Feather name="command" size={16} color={colors.blue} /><Text style={styles.adaptText}>Your plan preview: {duration} minutes · {difficulty.toLowerCase()} intensity</Text></View>
        <PrimaryButton title="Save my plan" onPress={() => router.replace('/(tabs)/workout')} icon="check" />
      </Page>
    );
  }

  return (
    <Page>
      <ScreenHeader title="Workout tracking" subtitle="Full Body Strength" back />
      <Card style={styles.timerCard}>
        <View style={styles.liveTag}><View style={[styles.liveDot, running && styles.liveActive]} /><Text style={styles.liveText}>{running ? 'WORKOUT IN PROGRESS' : 'READY WHEN YOU ARE'}</Text></View>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
        <Text style={styles.timerCaption}>TIME ELAPSED</Text>
        <View style={styles.trackingMeta}><Meta icon="activity" value={`${Math.round(seconds / 60 * 8)} kcal`} /><Meta icon="list" value={`${completed.length} / ${activeExercises.length} done`} /></View>
        <PrimaryButton title={running ? 'Pause workout' : seconds > 0 ? 'Resume workout' : 'Start workout'} icon={running ? 'pause' : 'play'} onPress={() => setRunning((value) => !value)} />
      </Card>
      <View style={styles.exercisesHead}><Text style={styles.exerciseHeader}>Your session</Text><Text style={styles.exerciseCount}>{completed.length} / {activeExercises.length} complete</Text></View>
      <Card style={styles.exerciseCard}>
        {activeExercises.map((exercise, index) => {
          const done = completed.includes(exercise);
          return (
            <Pressable key={exercise} accessibilityRole="checkbox" accessibilityState={{ checked: done }} onPress={() => setCompleted((current) => done ? current.filter((value) => value !== exercise) : [...current, exercise])} style={[styles.exerciseRow, index > 0 && styles.border]}>
              <View style={[styles.check, done && styles.checked]}>{done ? <Feather name="check" size={13} color={colors.white} /> : <Text style={styles.exerciseNum}>{index + 1}</Text>}</View>
              <View style={{ flex: 1 }}><Text style={[styles.exerciseName, done && styles.doneName]}>{exercise}</Text><Text style={styles.exerciseReps}>{['3 sets · 12 reps', '3 sets · 10 reps', '3 sets · 12 reps', '3 sets · 10 each side', '3 rounds · 40 sec'][index]}</Text></View>
              <Feather name={done ? 'check-circle' : 'circle'} size={18} color={done ? colors.green : colors.muted} />
            </Pressable>
          );
        })}
      </Card>
      <Card style={styles.encouragement}>
        <Feather name="heart" size={17} color={colors.pink} />
        <Text style={styles.encouragementText}>Go at your own pace. Every rep counts.</Text>
      </Card>
      <Pressable accessibilityRole="button" onPress={() => { setRunning(false); router.replace('/'); }} style={styles.finishButton}>
        <Text style={styles.finishText}>Finish workout</Text><Feather name="arrow-right" size={16} color={colors.blue} />
      </Pressable>
      <ProgressBar value={completed.length / activeExercises.length * 100} tint={colors.green} track="#EAF5F0" />
    </Page>
  );
}

function Option({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} style={[styles.option, selected && styles.optionSelected]}><Text style={[styles.optionText, selected && styles.optionSelectedText]}>{label}</Text></Pressable>;
}

function Meta({ icon, value }: { icon: React.ComponentProps<typeof Feather>['name']; value: string }) {
  return <View style={styles.metaItem}><Feather name={icon} size={13} color={colors.blue} /><Text style={styles.metaText}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  customCard: { gap: 6 },
  customTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  customHint: { color: colors.body, fontSize: 10, lineHeight: 15 },
  options: { flexDirection: 'row', gap: 7, marginTop: 10 },
  option: { minHeight: 37, flex: 1, borderRadius: 12, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  optionSelected: { backgroundColor: colors.blueLight, borderColor: colors.blue },
  optionText: { color: colors.body, fontSize: 10, fontWeight: '600' },
  optionSelectedText: { color: colors.blue, fontWeight: '800' },
  adaptNote: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.blueLight, padding: 13, borderRadius: 14 },
  adaptText: { color: colors.blueDark, fontSize: 10, fontWeight: '600', flex: 1 },
  timerCard: { alignItems: 'center', padding: 21 },
  liveTag: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: colors.blueLight, paddingVertical: 6, paddingHorizontal: 9, borderRadius: 10 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.muted },
  liveActive: { backgroundColor: colors.green },
  liveText: { color: colors.blue, fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  timer: { color: colors.ink, fontSize: 49, fontWeight: '800', letterSpacing: -2, marginTop: 9 },
  timerCaption: { color: colors.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  trackingMeta: { flexDirection: 'row', gap: 18, marginTop: 16, marginBottom: 17 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: colors.body, fontSize: 10, fontWeight: '600' },
  exercisesHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 },
  exerciseHeader: { color: colors.ink, fontSize: 16, fontWeight: '800' },
  exerciseCount: { color: colors.green, fontSize: 9, fontWeight: '700' },
  exerciseCard: { paddingVertical: 2 },
  exerciseRow: { flexDirection: 'row', minHeight: 58, alignItems: 'center', gap: 10 },
  border: { borderTopWidth: 1, borderTopColor: colors.border },
  check: { width: 28, height: 28, borderRadius: 10, backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: colors.green, borderColor: colors.green },
  exerciseNum: { color: colors.body, fontSize: 10, fontWeight: '700' },
  exerciseName: { color: colors.ink, fontSize: 11, fontWeight: '700' },
  doneName: { color: colors.muted, textDecorationLine: 'line-through' },
  exerciseReps: { color: colors.body, fontSize: 9, marginTop: 3 },
  encouragement: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 13, backgroundColor: '#FFF7F8', borderColor: '#F9EAEC' },
  encouragementText: { color: colors.body, fontSize: 10, fontWeight: '600' },
  finishButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 10 },
  finishText: { color: colors.blue, fontSize: 11, fontWeight: '700' },
});
