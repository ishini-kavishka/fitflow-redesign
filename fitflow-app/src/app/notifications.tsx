import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, colors, Page, ScreenHeader, Tag } from '@/components/fitflow';

const notifications = [
  { title: 'You’re on a 12-day streak!', detail: 'Your consistency is something to celebrate. Keep it going!', time: '12 min ago', icon: 'award' as const, tint: '#F19A35', bg: '#FFF3E4', unread: true },
  { title: 'Jamie left you some love', detail: '“First 5K of the year is in the books!”', time: '1 hour ago', icon: 'heart' as const, tint: colors.pink, bg: '#FFF0F2', unread: true },
  { title: 'Your Daily Flow is ready', detail: 'Today’s personalized workout is waiting for you.', time: '8:00 AM', icon: 'activity' as const, tint: colors.blue, bg: colors.blueLight, unread: false },
  { title: 'Challenge update', detail: 'You’re 4 days into the 7-Day Step Streak.', time: 'Yesterday', icon: 'trending-up' as const, tint: colors.green, bg: colors.greenLight, unread: false },
];

export default function NotificationsScreen() {
  return (
    <Page>
      <ScreenHeader title="Notifications" subtitle="A little good news for your day" back right={<Tag text="2 NEW" tint={colors.blue} background={colors.blueLight} />} />
      <View style={styles.sectionLabel}><Text style={styles.labelText}>TODAY</Text><Pressable><Text style={styles.markRead}>Mark all as read</Text></Pressable></View>
      {notifications.map((item) => (
        <Card key={item.title} style={[styles.notification, item.unread && styles.unread]}>
          <View style={[styles.icon, { backgroundColor: item.bg }]}><Feather name={item.icon} size={18} color={item.tint} /></View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}><Text style={styles.title}>{item.title}</Text>{item.unread && <View style={styles.dot} />}</View>
            <Text style={styles.detail}>{item.detail}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </Card>
      ))}
      <View style={styles.tip}>
        <Feather name="bell" size={16} color={colors.blue} />
        <Text style={styles.tipText}>Manage the reminders you receive from your profile settings.</Text>
        <Pressable onPress={() => router.push('/profile')}><Text style={styles.settingsLink}>Settings</Text></Pressable>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -8 },
  labelText: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 0.9 },
  markRead: { color: colors.blue, fontSize: 10, fontWeight: '700' },
  notification: { flexDirection: 'row', alignItems: 'flex-start', gap: 11, padding: 14, borderRadius: 18 },
  unread: { borderColor: '#DDE7FB', backgroundColor: '#FCFDFF' },
  icon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  title: { color: colors.ink, fontSize: 11, fontWeight: '800', flex: 1 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.blue },
  detail: { color: colors.body, fontSize: 10, lineHeight: 15, marginTop: 4 },
  time: { color: colors.muted, fontSize: 9, marginTop: 6 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 13, borderRadius: 15, backgroundColor: colors.blueLight },
  tipText: { color: colors.body, fontSize: 9, lineHeight: 14, flex: 1 },
  settingsLink: { color: colors.blue, fontSize: 9, fontWeight: '800' },
});
