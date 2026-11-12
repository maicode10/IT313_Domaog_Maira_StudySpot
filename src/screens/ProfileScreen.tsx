import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Avatar from "../components/Avatar";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHero from "../components/ScreenHero";
import { colors, font, Palette, radius, sheetStyle, shadow, spacing } from "../theme/theme";
import { User } from "../types";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Profile"> & {
  user: User;
  palette: Palette;
  bookingCount: number;
  favoriteCount: number;
  remindersOn: boolean;
  darkMode: boolean;
  liveOccupancy: boolean;
  onToggleReminders: (value: boolean) => void;
  onToggleDarkMode: (value: boolean) => void;
  onToggleLiveOccupancy: (value: boolean) => void;
  onSignOut: () => void;
};

/** F10 - Profile: avatar, counts, Switches, Log Out. */
export default function ProfileScreen({
  navigation,
  user,
  palette,
  bookingCount,
  favoriteCount,
  remindersOn,
  darkMode,
  liveOccupancy,
  onToggleReminders,
  onToggleDarkMode,
  onToggleLiveOccupancy,
  onSignOut,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

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

      <View style={sheetStyle(palette)}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.statRow}>
            <StatTile icon="calendar" value={bookingCount} label="Bookings" styles={styles} />
            <StatTile icon="heart" value={favoriteCount} label="Favorites" styles={styles} />
          </View>

          <View style={styles.card}>
            <SettingRow
              title="Booking reminders"
              note="Get a nudge before your slot starts."
              value={remindersOn}
              onValueChange={onToggleReminders}
              palette={palette}
              styles={styles}
            />

            <View style={styles.divider} />

            <SettingRow
              title="Dark mode"
              note="Switch the whole app to a dark palette."
              value={darkMode}
              onValueChange={onToggleDarkMode}
              palette={palette}
              styles={styles}
            />

            <View style={styles.divider} />

            <SettingRow
              title="Live occupancy"
              note="Seat counts keep updating while the app is open."
              value={liveOccupancy}
              onValueChange={onToggleLiveOccupancy}
              palette={palette}
              styles={styles}
            />
          </View>

          <PrimaryButton
            label="Log Out"
            onPress={onSignOut}
            palette={palette}
            variant="danger"
          />
        </ScrollView>
      </View>
    </View>
  );
}

type Styles = ReturnType<typeof createStyles>;

function SettingRow({
  title,
  note,
  value,
  onValueChange,
  palette,
  styles,
}: {
  title: string;
  note: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
  palette: Palette;
  styles: Styles;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingNote}>{note}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.disabled, true: colors.violetMid }}
        thumbColor={colors.white}
        ios_backgroundColor={palette.disabled}
      />
    </View>
  );
}

function StatTile({
  icon,
  value,
  label,
  styles,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  label: string;
  styles: Styles;
}) {
  return (
    <View style={styles.tile}>
      <Ionicons name={icon} size={18} color={colors.violet} />
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
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
      backgroundColor: p.surface,
      borderRadius: radius.xxl,
      paddingVertical: spacing.xl,
      alignItems: "center",
      gap: 2,
      ...shadow.card,
    },
    tileValue: {
      fontSize: font.h1,
      fontWeight: "800",
      color: p.text,
    },
    tileLabel: {
      fontSize: font.tiny,
      fontWeight: "700",
      letterSpacing: 0.6,
      textTransform: "uppercase",
      color: p.textFaint,
    },
    card: {
      backgroundColor: p.surface,
      borderRadius: radius.xxl,
      padding: spacing.xl,
      ...shadow.card,
    },
    divider: {
      height: 1,
      backgroundColor: p.border,
      marginVertical: spacing.lg,
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
      color: p.text,
    },
    settingNote: {
      fontSize: font.small,
      color: p.textMuted,
    },
  });
