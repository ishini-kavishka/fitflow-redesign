import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, colors, Page, PrimaryButton, ScreenHeader } from '@/components/fitflow';

export default function ProfileScreen() {
  const [workoutNotifications, setWorkoutNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  return (
    <Page>
      <ScreenHeader title="My profile" back />

      <Card style={styles.profileCard}>
        <Avatar size={76} />
        <Text style={styles.name}>Alex Morgan</Text>
        <Text style={styles.email}>alex.morgan@email.com</Text>
        <View style={styles.memberTag}><Feather name="award" size={12} color={colors.green} /><Text style={styles.memberText}>FITFLOW MEMBER SINCE 2024</Text></View>
        <PrimaryButton title="Edit profile" icon="edit-2" onPress={() => Alert.alert('Edit profile', 'Profile editing is a demo feature for this lab version.')} />
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>YOUR FITNESS</Text>
        <Card style={styles.infoCard}>
          <InfoRow icon="target" label="Fitness goal" value="Build strength" />
          <InfoRow icon="activity" label="Activity level" value="Moderately active" />
          <InfoRow icon="calendar" label="Workout days" value="5 days / week" last />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <Card style={styles.settingsCard}>
          <SettingRow icon="bell" title="Workout reminders" detail="Gentle nudges to keep you moving" value={workoutNotifications} onChange={setWorkoutNotifications} />
          <SettingRow icon="bar-chart-2" title="Weekly summary" detail="Your progress, delivered each Sunday" value={weeklySummary} onChange={setWeeklySummary} />
          <SettingRow icon="lock" title="Private profile" detail="Only friends can see your activity" value={privateProfile} onChange={setPrivateProfile} last />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <Card style={styles.infoCard}>
          <Pressable style={styles.linkRow} onPress={() => Alert.alert('Privacy', 'Your activity and health details are only stored locally in this demo.')}>
            <View style={styles.rowIcon}><Feather name="shield" size={16} color={colors.blue} /></View><Text style={styles.linkLabel}>Privacy & data</Text><Feather name="chevron-right" size={17} color={colors.muted} />
          </Pressable>
          <Pressable style={[styles.linkRow, styles.lastRow]} onPress={() => Alert.alert('Help & support', 'Thanks for using FitFlow! This lab prototype does not connect to support.')}>
            <View style={styles.rowIcon}><Feather name="help-circle" size={16} color={colors.blue} /></View><Text style={styles.linkLabel}>Help & support</Text><Feather name="chevron-right" size={17} color={colors.muted} />
          </Pressable>
        </Card>
      </View>
      <Pressable accessibilityRole="button" style={styles.logout} onPress={() => Alert.alert('Log out', 'This local demo does not have an account session to end.', [{ text: 'OK' }])}>
        <Feather name="log-out" size={16} color={colors.pink} /><Text style={styles.logoutText}>Log out</Text>
      </Pressable>
      <Text style={styles.version}>FITFLOW · VERSION 1.0.0</Text>
    </Page>
  );
}

function InfoRow({ icon, label, value, last = false }: { icon: React.ComponentProps<typeof Feather>['name']; label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && styles.rowBorder]}>
      <View style={styles.rowIcon}><Feather name={icon} size={16} color={colors.blue} /></View>
      <Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function SettingRow({ icon, title, detail, value, onChange, last = false }: { icon: React.ComponentProps<typeof Feather>['name']; title: string; detail: string; value: boolean; onChange: (value: boolean) => void; last?: boolean }) {
  return (
    <View style={[styles.settingRow, !last && styles.rowBorder]}>
      <View style={styles.rowIcon}><Feather name={icon} size={16} color={colors.blue} /></View>
      <View style={{ flex: 1 }}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.settingDetail}>{detail}</Text></View>
      <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} accessibilityLabel={title} onPress={() => onChange(!value)} style={[styles.switch, value && styles.switchOn]}>
        <View style={[styles.switchKnob, value && styles.switchKnobOn]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: { alignItems: 'center', padding: 20, gap: 8 },
  name: { color: colors.ink, fontSize: 19, fontWeight: '800', marginTop: 2 },
  email: { color: colors.body, fontSize: 11 },
  memberTag: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.greenLight, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 10, marginTop: 3, marginBottom: 5 },
  memberText: { color: colors.green, fontSize: 8, fontWeight: '800', letterSpacing: 0.5 },
  section: { gap: 9 },
  sectionLabel: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 0.9, marginLeft: 3 },
  infoCard: { paddingVertical: 4 },
  infoRow: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowIcon: { width: 31, height: 31, borderRadius: 11, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { color: colors.body, fontSize: 11, flex: 1 },
  infoValue: { color: colors.ink, fontSize: 10, fontWeight: '700' },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  settingsCard: { paddingHorizontal: 13, paddingVertical: 2 },
  settingRow: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 9 },
  settingTitle: { color: colors.ink, fontSize: 11, fontWeight: '700' },
  settingDetail: { color: colors.muted, fontSize: 9, marginTop: 3 },
  switch: { width: 38, height: 22, borderRadius: 12, backgroundColor: '#E4E8EF', padding: 3, justifyContent: 'center' },
  switchOn: { backgroundColor: colors.green },
  switchKnob: { width: 16, height: 16, borderRadius: 9, backgroundColor: colors.white, elevation: 1 },
  switchKnobOn: { alignSelf: 'flex-end' },
  linkRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10 },
  linkLabel: { color: colors.ink, fontSize: 11, fontWeight: '600', flex: 1 },
  lastRow: { borderBottomWidth: 0 },
  logout: { minHeight: 47, backgroundColor: '#FFF0F2', borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  logoutText: { color: colors.pink, fontSize: 12, fontWeight: '700' },
  version: { color: colors.muted, fontSize: 8, letterSpacing: 1, textAlign: 'center', marginTop: -8 },
});
