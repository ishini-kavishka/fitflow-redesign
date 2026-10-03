import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Card,
  colors,
  OutlineButton,
  Page,
  PrimaryButton,
  ProgressBar,
  ScreenHeader,
  SectionTitle,
} from '@/components/fitflow';

type MealName = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
type Meal = { name: string; detail: string; calories: number };
const initialMeals: Record<MealName, Meal[]> = {
  Breakfast: [{ name: 'Avocado toast & eggs', detail: '2 slices · 2 eggs', calories: 420 }],
  Lunch: [{ name: 'Grilled chicken bowl', detail: 'Quinoa · greens · feta', calories: 560 }],
  Dinner: [{ name: 'Not logged yet', detail: 'Add your evening meal', calories: 0 }],
  Snacks: [{ name: 'Greek yogurt', detail: 'Honey · blueberries', calories: 180 }],
};
const mealNames: MealName[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export default function NutritionScreen() {
  const [meals, setMeals] = useState(initialMeals);
  const [water, setWater] = useState(5);
  const [modal, setModal] = useState<'meal' | 'scan' | null>(null);
  const consumed = Object.values(meals).flat().reduce((total, meal) => total + meal.calories, 0);

  function addMeal(mealType: MealName, scanned = false) {
    const nextMeal: Meal = scanned
      ? { name: 'Fresh fruit bowl', detail: 'Sample scan · banana & berries', calories: 210 }
      : {
          name: mealType === 'Breakfast' ? 'Berry protein oats' : mealType === 'Lunch' ? 'Salmon grain bowl' : mealType === 'Dinner' ? 'Roasted veggie plate' : 'Almonds & apple',
          detail: 'Added just now · estimated serving',
          calories: mealType === 'Breakfast' ? 350 : mealType === 'Lunch' ? 490 : mealType === 'Dinner' ? 420 : 190,
        };
    setMeals((current) => ({ ...current, [mealType]: [...current[mealType].filter((entry) => entry.calories > 0), nextMeal] }));
    setModal(null);
  }

  return (
    <Page>
      <ScreenHeader title="Nutrition" subtitle="Fuel your day, one meal at a time" />

      <Card style={styles.calorieCard}>
        <View style={styles.calorieHeader}>
          <View><Text style={styles.cardLabel}>CALORIES TODAY</Text><Text style={styles.calorieNumber}>{consumed.toLocaleString()} <Text style={styles.calorieGoal}>/ 2,200</Text></Text></View>
          <View style={styles.donut}><View style={styles.donutInner}><Text style={styles.donutPercent}>{Math.min(100, Math.round(consumed / 2200 * 100))}%</Text></View></View>
        </View>
        <ProgressBar value={consumed / 2200 * 100} tint={colors.green} track="#E8F5EF" />
        <Text style={styles.remaining}>{Math.max(0, 2200 - consumed).toLocaleString()} kcal remaining · You’re right on track</Text>
      </Card>

      <View style={styles.macroRow}>
        <MacroCard label="Protein" amount="82" goal="120 g" color={colors.blue} fill={68} />
        <MacroCard label="Carbs" amount="156" goal="220 g" color={colors.orange} fill={71} />
        <MacroCard label="Fat" amount="48" goal="70 g" color={colors.pink} fill={69} />
      </View>

      <View style={styles.mealsHead}>
        <SectionTitle title="Today's meals" />
        <Pressable accessibilityRole="button" onPress={() => setModal('meal')} style={styles.addButton}>
          <Feather name="plus" size={15} color={colors.white} /><Text style={styles.addText}>Add meal</Text>
        </Pressable>
      </View>
      <View style={styles.mealList}>
        {mealNames.map((mealName) => {
          const list = meals[mealName];
          const calories = list.reduce((sum, meal) => sum + meal.calories, 0);
          return (
            <Card key={mealName} style={styles.mealCard}>
              <View style={styles.mealHeading}>
                <View style={styles.mealIcon}><Feather name={mealName === 'Breakfast' ? 'sunrise' : mealName === 'Lunch' ? 'sun' : mealName === 'Dinner' ? 'moon' : 'coffee'} size={16} color={colors.green} /></View>
                <Text style={styles.mealName}>{mealName}</Text>
                <Text style={styles.mealKcal}>{calories ? `${calories} kcal` : '—'}</Text>
                <Feather name="chevron-down" size={16} color={colors.muted} />
              </View>
              {list.map((meal, index) => (
                <View key={`${meal.name}-${index}`} style={styles.foodRow}>
                  <View style={styles.bullet} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.foodName, meal.calories === 0 && { color: colors.muted }]}>{meal.name}</Text>
                    <Text style={styles.foodDetail}>{meal.detail}</Text>
                  </View>
                  {meal.calories > 0 ? <Text style={styles.foodCalories}>{meal.calories}</Text> : null}
                </View>
              ))}
            </Card>
          );
        })}
      </View>

      <View style={styles.sectionHeading}><SectionTitle title="Water intake" /><Text style={styles.waterTotal}>{water * 250} / 2,000 ml</Text></View>
      <Card style={styles.waterCard}>
        <View style={styles.waterTop}>
          <View style={styles.waterIcon}><Feather name="droplet" size={19} color={colors.blue} /></View>
          <View style={{ flex: 1 }}><Text style={styles.waterTitle}>Stay hydrated</Text><Text style={styles.waterHint}>{Math.max(0, 8 - water)} glasses to your daily goal</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Add a glass of water" style={styles.waterAdd} onPress={() => setWater((current) => Math.min(8, current + 1))}>
            <Feather name="plus" size={17} color={colors.blue} />
          </Pressable>
        </View>
        <View style={styles.glasses}>
          {Array.from({ length: 8 }, (_, index) => (
            <View key={index} style={[styles.glass, index < water && styles.glassFilled]}>
              <Feather name="droplet" size={14} color={index < water ? colors.white : '#B5C9F3'} />
            </View>
          ))}
        </View>
      </Card>

      <OutlineButton title="Scan food with camera" icon="camera" onPress={() => setModal('scan')} />

      <Modal visible={modal !== null} transparent animationType="fade" onRequestClose={() => setModal(null)}>
        <View style={styles.modalShade}>
          <View style={styles.modalCard}>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" style={styles.closeButton} onPress={() => setModal(null)}><Feather name="x" size={19} color={colors.body} /></Pressable>
            {modal === 'meal' ? (
              <>
                <Text style={styles.modalTitle}>Add a meal</Text>
                <Text style={styles.modalCopy}>Choose a meal and we’ll add a sample entry to your day.</Text>
                {mealNames.map((mealName) => <Pressable key={mealName} style={styles.mealChoice} onPress={() => addMeal(mealName)}><Text style={styles.mealChoiceText}>{mealName}</Text><Feather name="plus-circle" size={18} color={colors.blue} /></Pressable>)}
              </>
            ) : (
              <>
                <View style={styles.scanGraphic}><Feather name="camera" size={32} color={colors.blue} /><View style={styles.scanCorners} /></View>
                <Text style={styles.modalTitle}>Scan your meal</Text>
                <Text style={styles.modalCopy}>Camera scanning is shown as a demo for this lab. Try a sample scan to add a realistic food entry.</Text>
                <PrimaryButton title="Use sample scan" icon="aperture" onPress={() => addMeal('Snacks', true)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </Page>
  );
}

function MacroCard({ label, amount, goal, color, fill }: { label: string; amount: string; goal: string; color: string; fill: number }) {
  return (
    <Card style={styles.macroCard}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroAmount}>{amount}<Text style={styles.macroGoal}>/{goal}</Text></Text>
      <View style={styles.macroTrack}><View style={[styles.macroFill, { width: `${fill}%`, backgroundColor: color }]} /></View>
    </Card>
  );
}

const styles = StyleSheet.create({
  calorieCard: { padding: 18 },
  calorieHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  cardLabel: { color: colors.muted, fontSize: 9, letterSpacing: 0.9, fontWeight: '700' },
  calorieNumber: { color: colors.ink, fontSize: 28, fontWeight: '800', marginTop: 5, letterSpacing: -0.8 },
  calorieGoal: { color: colors.muted, fontSize: 13, fontWeight: '500', letterSpacing: 0 },
  donut: { width: 62, height: 62, borderRadius: 32, borderWidth: 6, borderColor: '#DDF3E9', borderTopColor: colors.green, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '25deg' }] },
  donutInner: { transform: [{ rotate: '-25deg' }] },
  donutPercent: { color: colors.green, fontSize: 12, fontWeight: '800' },
  remaining: { color: colors.body, fontSize: 10, marginTop: 9 },
  macroRow: { flexDirection: 'row', gap: 8 },
  macroCard: { flex: 1, padding: 12, borderRadius: 17 },
  macroLabel: { color: colors.body, fontSize: 10, fontWeight: '600' },
  macroAmount: { color: colors.ink, fontSize: 16, fontWeight: '800', marginTop: 6 },
  macroGoal: { color: colors.muted, fontSize: 9, fontWeight: '500' },
  macroTrack: { height: 5, borderRadius: 4, backgroundColor: '#F0F2F5', marginTop: 9, overflow: 'hidden' },
  macroFill: { height: '100%', borderRadius: 4 },
  mealsHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { height: 34, borderRadius: 12, backgroundColor: colors.blue, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 11 },
  addText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  mealList: { gap: 9, marginTop: -9 },
  mealCard: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 18 },
  mealHeading: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mealIcon: { width: 29, height: 29, backgroundColor: colors.greenLight, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  mealName: { color: colors.ink, fontSize: 12, fontWeight: '800', flex: 1 },
  mealKcal: { color: colors.body, fontSize: 10, marginRight: 3 },
  foodRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 39, marginTop: 9 },
  bullet: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#B9C4D3' },
  foodName: { color: colors.ink, fontSize: 10, fontWeight: '600' },
  foodDetail: { color: colors.muted, fontSize: 9, marginTop: 2 },
  foodCalories: { color: colors.body, fontSize: 10, fontWeight: '600' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  waterTotal: { color: colors.blue, fontSize: 11, fontWeight: '700' },
  waterCard: { padding: 15 },
  waterTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  waterIcon: { width: 37, height: 37, borderRadius: 13, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  waterTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  waterHint: { color: colors.body, fontSize: 10, marginTop: 3 },
  waterAdd: { width: 31, height: 31, borderRadius: 11, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  glasses: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  glass: { width: 28, height: 28, borderRadius: 10, backgroundColor: '#F0F4FC', alignItems: 'center', justifyContent: 'center' },
  glassFilled: { backgroundColor: colors.blue },
  modalShade: { flex: 1, backgroundColor: 'rgba(20,31,51,0.44)', justifyContent: 'center', alignItems: 'center', padding: 22 },
  modalCard: { width: '100%', backgroundColor: colors.white, borderRadius: 25, padding: 22, gap: 12 },
  closeButton: { alignSelf: 'flex-end', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: colors.canvas, marginBottom: -6 },
  modalTitle: { color: colors.ink, fontSize: 20, fontWeight: '800' },
  modalCopy: { color: colors.body, fontSize: 12, lineHeight: 18, marginBottom: 2 },
  mealChoice: { height: 43, borderRadius: 13, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mealChoiceText: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  scanGraphic: { height: 145, borderRadius: 20, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  scanCorners: { position: 'absolute', width: 102, height: 82, borderRadius: 15, borderColor: colors.blue, borderWidth: 1.5 },
});
