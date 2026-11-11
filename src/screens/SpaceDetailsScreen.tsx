import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Chip from "../components/Chip";
import OccupancyRing from "../components/OccupancyRing";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHero from "../components/ScreenHero";
import { colors, font, radius, sheet, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { occupancyLabel, occupancyPercent, seatsLeft } from "../utils/occupancy";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"SpaceDetails"> & {
  spaces: StudySpace[];
};

/**
 * Space Details - milestone 1 version.
 * Proves the route param works: only spaceId travels, we look the rest up.
 * The slot grid and the favourite header button come with Module 9.
 */
export default function SpaceDetailsScreen({ route, navigation, spaces }: Props) {
  const { spaceId } = route.params;
  const space = spaces.find((s) => s.id === spaceId);

  if (!space) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Space not found.</Text>
      </View>
    );
  }

  const percent = occupancyPercent(space);

  return (
    <View style={styles.root}>
      <ScreenHero compact title={space.name} subtitle={`${space.building} · ${space.floor}`}>
        <View style={styles.heroStats}>
          <OccupancyRing percent={percent} size={62} stroke={7} holeColor={colors.navy} />
          <View style={styles.heroStatText}>
            <Text style={styles.heroStatValue}>{occupancyLabel(percent)} right now</Text>
            <Text style={styles.heroStatNote}>
              {seatsLeft(space)} of {space.seats} seats free
            </Text>
          </View>
        </View>
      </ScreenHero>

      <View style={sheet}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.chipRow}>
            <Chip label={space.type} />
            {space.amenities.map((amenity) => (
              <Chip key={amenity} label={amenity} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>About this space</Text>
            <Text style={styles.description}>{space.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Capacity</Text>
            <View style={styles.statGrid}>
              <Stat value={String(space.seats)} label="Seats" />
              <Stat value={String(space.occupied)} label="In use" />
              <Stat value={String(space.slots.length)} label="Slots" />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label="Book This Space"
            onPress={() => navigation.navigate("Booking", { spaceId: space.id })}
          />
        </View>
      </View>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  center: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    fontSize: font.h3,
    fontWeight: "700",
    color: colors.text,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  heroStatText: { flex: 1, gap: 2 },
  heroStatValue: {
    fontSize: font.h3,
    fontWeight: "700",
    color: colors.onNavy,
  },
  heroStatNote: {
    fontSize: font.small,
    color: colors.onNavyMuted,
  },
  scroll: {
    padding: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadow.card,
  },
  cardLabel: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.textFaint,
  },
  description: {
    fontSize: font.body,
    lineHeight: 22,
    color: colors.textMuted,
  },
  statGrid: {
    flexDirection: "row",
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.violetTint,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
    gap: 1,
  },
  statValue: {
    fontSize: font.h1,
    fontWeight: "800",
    color: colors.navy,
  },
  statLabel: {
    fontSize: font.tiny,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.textFaint,
  },
  footer: {
    padding: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});