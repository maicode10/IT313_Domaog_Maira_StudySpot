import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, radius, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { occupancyPercent, seatsLeft } from "../utils/occupancy";
import DayStrip from "./DayStrip";
import OccupancyBar from "./OccupancyBar";

type Props = {
  space: StudySpace;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  /** tapping an open block on the day strip books that slot directly */
  onPressSlot?: (slot: string) => void;
  onLongPress?: () => void;
};

/** One study space in the Explore list (F4). */
export default function SpaceCard({
  space,
  isFavorite,
  onPress,
  onToggleFavorite,
  onPressSlot,
  onLongPress,
}: Props) {
  const percent = occupancyPercent(space);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.name} numberOfLines={1}>
            {space.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {space.floor} · {space.type} · {space.seats} seats
          </Text>
        </View>

        <Pressable
          onPress={onToggleFavorite}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={styles.heartBtn}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={19}
            color={isFavorite ? colors.heart : colors.textFaint}
          />
        </Pressable>
      </View>

      <OccupancyBar percent={percent} />

      <Text style={styles.footnote}>
        {seatsLeft(space)} of {space.seats} seats free
      </Text>

      <DayStrip space={space} onPressSlot={onPressSlot} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.card,
  },
  cardPressed: {
    backgroundColor: colors.violetTint,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  titleBlock: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: font.h3,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    fontSize: font.small,
    color: colors.textMuted,
  },
  heartBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.violetTint,
  },
  footnote: {
    fontSize: font.tiny,
    color: colors.textFaint,
    fontWeight: "600",
    marginTop: -4,
  },
});