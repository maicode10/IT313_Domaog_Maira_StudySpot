import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Avatar from "../components/Avatar";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHero from "../components/ScreenHero";
import { colors, font, radius, sheet, shadow, spacing } from "../theme/theme";
import { User } from "../types";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Profile"> & {
  user: User;
  bookingCount: number;
  favoriteCount: number;
  remindersOn: boolean;
  onToggleReminders: (value: boolean) => void;
  onSignOut: () => void;
};

/** Profile (F10) - avatar, counts, a Switch, and Log Out. */
export default function ProfileScreen({
  navigation,
  user,
  bookingCount,
  favoriteCount,
  remindersOn,
  onToggleReminders,
  onSignOut,
}: Props) {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.navyTop}>
        <ScreenHero title="Profile">
          <View style={styles.identity}>
            <Avatar name={user.name} size={64} />

            <View style={styles.identityText}>
              <Text style={styles.name} numberOfLines={1}>
                {user.name}
              </Text>
              <Text style={styles.section}>{user.section || "No section set"}</Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate("EditProfile")}
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
              style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.7 }]}
            >
              <Ionicons name="create-outline" size={15} color={colors.onNavy} />
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          </View>
        </ScreenHero>
      </SafeAreaView>

      <View style={sheet}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.statRow}>
            <StatTile icon="calendar" value={bookingCount} label="Bookings" />
            <StatTile icon="heart" value={favoriteCount} label="Favorites" />
          </View>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Booking reminders</Text>
                <Text style={styles.settingNote}>
                  Get a nudge before your slot starts.
                </Text>
              </View>
              <Switch
                value={remindersOn}
                onValueChange={onToggleReminders}
                trackColor={{ false: colors.disabled, true: colors.violetMid }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.disabled}
              />
            </View>
          </View>

          <PrimaryButton label="Log Out" onPress={onSignOut} variant="danger" />
        </ScrollView>
      </View>
    </View>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.tile}>
      <Ionicons name={icon} size={18} color={colors.violet} />
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  navyTop: { backgroundColor: colors.navy },
  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  identityText: { flex: 1, gap: 2 },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  editText: {
    fontSize: font.small,
    fontWeight: "700",
    color: colors.onNavy,
  },
  name: {
    fontSize: font.h1,
    fontWeight: "800",
    color: colors.onNavy,
    letterSpacing: -0.3,
  },
  section: {
    fontSize: font.small,
    color: colors.onNavyMuted,
    fontWeight: "600",
  },
  scroll: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  statRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    paddingVertical: spacing.xl,
    alignItems: "center",
    gap: 2,
    ...shadow.card,
  },
  tileValue: {
    fontSize: font.h1,
    fontWeight: "800",
    color: colors.text,
  },
  tileLabel: {
    fontSize: font.tiny,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.textFaint,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    ...shadow.card,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  settingText: { flex: 1, gap: 2 },
  settingTitle: {
    fontSize: font.body,
    fontWeight: "700",
    color: colors.text,
  },
  settingNote: {
    fontSize: font.small,
    color: colors.textMuted,
  },
});