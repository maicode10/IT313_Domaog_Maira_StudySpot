import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { freeSlots, occupancyPercent } from "../utils/occupancy";

type Props = {
  space: StudySpace | null;
  onPress: () => void;
};

/**
 * Innovation feature - "Best match right now".
 * The screen works out which space wins; this only draws it.
 * When nothing qualifies it shows a calm empty version instead of vanishing.
 */
export default function BestMatchBanner({ space, onPress }: Props) {
  if (!space) {
    return (
      <View style={[styles.banner, styles.bannerEmpty]}>
        <View style={[styles.icon, { backgroundColor: colors.violetSoft }]}>
          <Ionicons name="moon-outline" size={16} color={colors.textMuted} />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.titleEmpty}>No best match right now</Text>
          <Text style={styles.subtitle}>Every space is full or filtered out.</Text>
        </View>
      </View>
    );
  }

  const percent = occupancyPercent(space);
  const open = freeSlots(space).length;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.banner, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.icon}>
        <Ionicons name="sparkles" size={16} color={colors.gold} />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.kicker}>Best match right now</Text>
        <Text style={styles.title} numberOfLines={1}>
          {space.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {space.building} · {percent}% full · {open} open slot{open === 1 ? "" : "s"}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.navy} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.goldSoft,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#F4DCA9",
    borderLeftWidth: 4,
    borderLeftColor: colors.gold,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  bannerEmpty: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderLeftColor: colors.borderStrong,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  kicker: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#A0761B",
  },
  title: {
    fontSize: font.h3,
    fontWeight: "700",
    color: colors.text,
  },
  titleEmpty: {
    fontSize: font.body,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: font.small,
    color: colors.textMuted,
  },
});