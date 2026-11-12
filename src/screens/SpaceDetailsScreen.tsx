import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Chip from "../components/Chip";
import EmptyState from "../components/EmptyState";
import OccupancyBar from "../components/OccupancyBar";
import OccupancyRing from "../components/OccupancyRing";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHero from "../components/ScreenHero";
import SlotChip from "../components/SlotChip";
import { colors, font, radius, sheet, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { freeSlots, occupancyLabel, occupancyPercent, seatsLeft } from "../utils/occupancy";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"SpaceDetails"> & {
  spaces: StudySpace[];
  favorites: string[];
  onToggleFavorite: (spaceId: string) => void;
};

/**
 * F7 - Space Details.
 * The route carries only spaceId, so the space is looked up here.
 * The heart in the header is added with navigation.setOptions.
 */
export default function SpaceDetailsScreen({
  route,
  navigation,
  spaces,
  favorites,
  onToggleFavorite,
}: Props) {
  const { spaceId } = route.params;
  const space = spaces.find((s) => s.id === spaceId);
  const isFavorite = favorites.includes(spaceId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        space ? (
          <Pressable
            onPress={() => onToggleFavorite(space.id)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={23}
              color={isFavorite ? colors.heart : colors.white}
            />
          </Pressable>
        ) : null,
    });
  }, [navigation, space, isFavorite, onToggleFavorite]);

  if (!space) {
    return (
      <View style={styles.notFound}>
        <EmptyState
          icon="alert-circle-outline"
          title="Space not found."
          message="This space may have been removed. Go back and pick another one."
        />
      </View>
    );
  }

  const percent = occupancyPercent(space);
  const openCount = freeSlots(space).length;

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
          {/* image placeholder - a real photo would go here */}
          <View style={styles.photo}>
            <Ionicons name="image-outline" size={30} color={colors.violetMid} />
            <Text style={styles.photoText}>Photo coming soon</Text>
          </View>

          <View style={styles.chipRow}>
            <Chip label={space.type} />
            {space.amenities.map((amenity) => (
              <Chip key={amenity} label={amenity} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Live occupancy</Text>
            <OccupancyBar percent={percent} height={9} />
            <Text style={styles.cardNote}>
              {space.occupied} of {space.seats} seats taken right now
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHead}>
              <Text style={styles.cardLabel}>Available slots today</Text>
              <Text style={styles.cardCount}>
                {openCount} open
              </Text>
            </View>

            <View style={styles.slotRow}>
              {space.slots.map((slot) => (
                                <SlotChip
                  key={slot}
                  label={slot}
                  disabled={space.bookedSlots.includes(slot)}
                  onPress={() =>
                    navigation.navigate("Booking", { spaceId: space.id, slot })
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>About this space</Text>
            <Text style={styles.description}>{space.description}</Text>
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  notFound: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
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
  photo: {
    height: 140,
    borderRadius: radius.xl,
    backgroundColor: colors.violetSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  photoText: {
    fontSize: font.tiny,
    fontWeight: "700",
    color: colors.violetDark,
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
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.textFaint,
  },
  cardCount: {
    fontSize: font.tiny,
    fontWeight: "800",
    color: colors.violetDark,
  },
  cardNote: {
    fontSize: font.small,
    color: colors.textMuted,
  },
  slotRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  description: {
    fontSize: font.body,
    lineHeight: 22,
    color: colors.textMuted,
  },
  footer: {
    padding: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});