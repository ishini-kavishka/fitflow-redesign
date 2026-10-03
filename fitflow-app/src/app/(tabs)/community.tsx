import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, colors, Page, SectionTitle, Tag } from '@/components/fitflow';

const challengeData = [
  { title: '7-Day Step Streak', detail: 'Walk 8,000 steps every day', members: '1,284 members', progress: 4, goal: 7, icon: 'navigation' as const, tint: colors.blue, bg: colors.blueLight },
  { title: 'Mindful Movement', detail: 'Complete 5 mindful workouts', members: '862 members', progress: 2, goal: 5, icon: 'heart' as const, tint: colors.green, bg: colors.greenLight },
];

export default function CommunityScreen() {
  const [joined, setJoined] = useState<string[]>(['7-Day Step Streak']);
  const [liked, setLiked] = useState<string[]>([]);
  const [tab, setTab] = useState<'For you' | 'Friends'>('For you');

  function toggleItem(items: string[], item: string, setter: (value: string[]) => void) {
    setter(items.includes(item) ? items.filter((value) => value !== item) : [...items, item]);
  }

  return (
    <Page>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}><Text style={styles.screenTitle}>Community</Text><Text style={styles.subtitle}>Good things happen together</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Create a post" style={styles.composeButton}><Feather name="edit-3" size={17} color={colors.blue} /></Pressable>
      </View>

      <Card style={styles.welcomeCard}>
        <View style={styles.welcomeDecor}><Feather name="users" size={24} color={colors.green} /></View>
        <Text style={styles.welcomeTitle}>Find your people</Text>
        <Text style={styles.welcomeCopy}>Celebrate little wins, share your journey, and cheer each other on.</Text>
        <View style={styles.peopleRow}>
          {[0, 1, 2, 3].map((person) => <View key={person} style={[styles.personDot, { marginLeft: person ? -8 : 0, backgroundColor: ['#DCEAFF', '#FBE7DB', '#DDF3E8', '#F2E2F7'][person] }]}><Text style={styles.personLetter}>{['J', 'M', 'S', 'K'][person]}</Text></View>)}
          <Text style={styles.peopleLabel}>+ 2.4k members building better habits</Text>
        </View>
      </Card>

      <View style={styles.section}>
        <SectionTitle title="Community challenges" action="See all" />
        {challengeData.map((challenge) => {
          const isJoined = joined.includes(challenge.title);
          return (
            <Card key={challenge.title} style={styles.challengeCard}>
              <View style={styles.challengeTop}>
                <View style={[styles.challengeIcon, { backgroundColor: challenge.bg }]}><Feather name={challenge.icon} size={18} color={challenge.tint} /></View>
                <View style={{ flex: 1 }}><Text style={styles.challengeTitle}>{challenge.title}</Text><Text style={styles.challengeDetail}>{challenge.detail}</Text></View>
                {isJoined ? <Tag text="JOINED" /> : null}
              </View>
              <View style={styles.challengeBottom}>
                <Text style={styles.members}>{challenge.members}</Text>
                <Pressable accessibilityRole="button" style={[styles.joinButton, isJoined && styles.joinedButton]} onPress={() => toggleItem(joined, challenge.title, setJoined)}>
                  <Text style={[styles.joinText, isJoined && styles.joinedText]}>{isJoined ? 'Joined ✓' : 'Join challenge'}</Text>
                </Pressable>
              </View>
              {isJoined && <Text style={styles.progressLabel}>Your progress · {challenge.progress} of {challenge.goal} days</Text>}
            </Card>
          );
        })}
      </View>

      <View style={styles.section}>
        <View style={styles.feedHeader}>
          <SectionTitle title="From your community" />
        </View>
        <View style={styles.feedTabs}>
          {(['For you', 'Friends'] as const).map((option) => (
            <Pressable key={option} onPress={() => setTab(option)} style={[styles.feedTab, tab === option && styles.selectedFeedTab]}><Text style={[styles.feedTabText, tab === option && styles.selectedFeedTabText]}>{option}</Text></Pressable>
          ))}
        </View>
        <PostCard
          name={tab === 'For you' ? 'Jamie Rivera' : 'Maya Chen'}
          initials={tab === 'For you' ? 'J' : 'M'}
          time="24 min ago"
          text={tab === 'For you' ? 'First 5K of the year is in the books! Didn’t think I could do it, but showing up made all the difference. 🏃' : 'Morning yoga done before work. Feeling calmer already — highly recommend a little movement before your first coffee!'}
          activity="Morning run · 5.02 km"
          likes={tab === 'For you' ? '24' : '18'}
          liked={liked.includes(tab)}
          onLike={() => toggleItem(liked, tab, setLiked)}
        />
        <PostCard
          name="Sam Patel"
          initials="S"
          time="1 hr ago"
          text="Tiny reminder: progress isn’t always a number. Today I just feel more energized, and that counts too. 💚"
          activity="Strength training · 32 min"
          likes="16"
          liked={liked.includes('Sam')}
          onLike={() => toggleItem(liked, 'Sam', setLiked)}
        />
      </View>
    </Page>
  );
}

function PostCard({ name, initials, time, text, activity, likes, liked, onLike }: { name: string; initials: string; time: string; text: string; activity: string; likes: string; liked: boolean; onLike: () => void }) {
  return (
    <Card style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar size={38} initial={initials} />
        <View style={{ flex: 1 }}><Text style={styles.postName}>{name}</Text><Text style={styles.postTime}>{time}</Text></View>
        <Feather name="more-horizontal" size={19} color={colors.muted} />
      </View>
      <Text style={styles.postText}>{text}</Text>
      <View style={styles.activityChip}><Feather name="activity" size={13} color={colors.green} /><Text style={styles.activityText}>{activity}</Text></View>
      <View style={styles.postActions}>
        <Pressable accessibilityRole="button" onPress={onLike} style={styles.postAction}><Feather name={liked ? 'heart' : 'heart'} size={16} color={liked ? colors.pink : colors.body} /><Text style={[styles.postActionText, liked && { color: colors.pink }]}>{Number(likes) + (liked ? 1 : 0)} likes</Text></Pressable>
        <Pressable accessibilityRole="button" style={styles.postAction}><Feather name="message-circle" size={16} color={colors.body} /><Text style={styles.postActionText}>Comment</Text></Pressable>
        <Pressable accessibilityRole="button" style={styles.shareAction}><Feather name="share-2" size={15} color={colors.body} /></Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  screenTitle: { color: colors.ink, fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: colors.body, fontSize: 12, marginTop: 4 },
  composeButton: { width: 42, height: 42, backgroundColor: colors.white, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  welcomeCard: { padding: 18, backgroundColor: '#F0F8F5', borderColor: '#E5F2EC', overflow: 'hidden' },
  welcomeDecor: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDF3E8' },
  welcomeTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', marginTop: 10 },
  welcomeCopy: { color: colors.body, fontSize: 11, lineHeight: 16, marginTop: 4 },
  peopleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  personDot: { width: 25, height: 25, borderRadius: 13, borderWidth: 2, borderColor: '#F0F8F5', alignItems: 'center', justifyContent: 'center' },
  personLetter: { fontSize: 9, color: colors.ink, fontWeight: '800' },
  peopleLabel: { color: colors.body, fontSize: 9, marginLeft: 8, flex: 1 },
  section: { gap: 10 },
  challengeCard: { padding: 14 },
  challengeTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  challengeIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  challengeTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  challengeDetail: { color: colors.body, fontSize: 10, marginTop: 3 },
  challengeBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 13 },
  members: { color: colors.muted, fontSize: 9 },
  joinButton: { borderRadius: 11, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.blue },
  joinedButton: { backgroundColor: colors.greenLight },
  joinText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  joinedText: { color: colors.green },
  progressLabel: { color: colors.green, fontSize: 9, fontWeight: '700', marginTop: 8 },
  feedHeader: { marginBottom: -1 },
  feedTabs: { flexDirection: 'row', backgroundColor: '#EBEFF5', borderRadius: 13, padding: 3 },
  feedTab: { flex: 1, minHeight: 31, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  selectedFeedTab: { backgroundColor: colors.white },
  feedTabText: { color: colors.body, fontSize: 10, fontWeight: '600' },
  selectedFeedTabText: { color: colors.blue, fontWeight: '800' },
  postCard: { padding: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  postName: { color: colors.ink, fontSize: 11, fontWeight: '800' },
  postTime: { color: colors.muted, fontSize: 9, marginTop: 3 },
  postText: { color: colors.body, fontSize: 11, lineHeight: 17, marginTop: 13 },
  activityChip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, backgroundColor: colors.greenLight, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6, marginTop: 10 },
  activityText: { color: colors.green, fontSize: 9, fontWeight: '700' },
  postActions: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, marginTop: 12, paddingTop: 10, gap: 16 },
  postAction: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  postActionText: { color: colors.body, fontSize: 9, fontWeight: '600' },
  shareAction: { marginLeft: 'auto' },
});
