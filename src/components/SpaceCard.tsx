import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, radius, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { occupancyColor, occupancyLabel, occupancyPercent, seatsLeft } from "../utils/occupancy";
import DayStrip from "./DayStrip";
import OccupancyRing from "./OccupancyRing";

type Props = {
  space: StudySpace;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  /** tapping an open block on the day strip books that slot directly */
  onPressSlot?: (slot: string) => void;
  onLongPress?: () => void;
};

/** One study space in the Explore list. */
export default function SpaceCard({
  space,
  isFavorite,
  onPress,
  onToggleFavorite,
  onPressSlot,
  onLongPress,
}: Props) {
  const percent = occupancyPercent(space);
  const statusColor = occupancyColor(percent);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <OccupancyRing percent={percent} />

        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {space.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {space.floor} · {space.type}
          </Text>

          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.status, { color: statusColor }]}>
              {occupancyLabel(percent)}
            </Text>
            <Text style={styles.seats}>
              {seatsLeft(space)} of {space.seats} free
            </Text>
          </View>
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
    alignItems: "center",
    gap: spacing.lg,
  },
  body: {
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
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  status: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  seats: {
    fontSize: font.tiny,
    color: colors.textFaint,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
  heartBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.violetTint,
  },
});