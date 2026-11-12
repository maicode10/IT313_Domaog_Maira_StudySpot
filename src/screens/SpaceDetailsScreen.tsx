import React, { useLayoutEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Chip from "../components/Chip";
import EmptyState from "../components/EmptyState";
import OccupancyBar from "../components/OccupancyBar";
import OccupancyRing from "../components/OccupancyRing";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHero from "../components/ScreenHero";
import SlotChip from "../components/SlotChip";
import SpaceImage from "../components/SpaceImage";
import { colors, font, Palette, radius, sheetStyle, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { freeSlots, occupancyLabel, occupancyPercent, seatsLeft } from "../utils/occupancy";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"SpaceDetails"> & {
  spaces: StudySpace[];
  favorites: string[];
  palette: Palette;
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
  palette,
  onToggleFavorite,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

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
          palette={palette}
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
          <OccupancyRing
            percent={percent}
            palette={palette}
            size={62}
            stroke={7}
            holeColor={colors.navy}
          />
          <View style={styles.heroStatText}>
            <Text style={styles.heroStatValue}>{occupancyLabel(percent)} right now</Text>
            <Text style={styles.heroStatNote}>
              {seatsLeft(space)} of {space.seats} seats free
            </Text>
          </View>
        </View>
      </ScreenHero>

      <View style={sheetStyle(palette)}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <SpaceImage uri={space.imageUrl} label={space.name} palette={palette} />

          <View style={styles.chipRow}>
            <Chip label={space.type} palette={palette} />
            {space.amenities.map((amenity) => (
              <Chip key={amenity} label={amenity} palette={palette} />
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>Live occupancy</Text>
            <OccupancyBar percent={percent} palette={palette} height={9} />
            <Text style={styles.cardNote}>
              {space.occupied} of {space.seats} seats taken right now
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHead}>
              <Text style={styles.cardLabel}>Available slots today</Text>
              <Text style={styles.cardCount}>{openCount} open</Text>
            </View>

            <View style={styles.slotRow}>
              {space.slots.map((slot) => (
                <SlotChip
                  key={slot}
                  label={slot}
                  palette={palette}
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
            palette={palette}
            onPress={() => navigation.navigate("Booking", { spaceId: space.id })}
          />
        </View>
      </View>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.navy },
    notFound: {
      flex: 1,
      backgroundColor: p.bg,
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
    chipRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    card: {
      backgroundColor: p.surface,
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
      color: p.textFaint,
    },
    cardCount: {
      fontSize: font.tiny,
      fontWeight: "800",
      color: p.accentText,
    },
    cardNote: {
      fontSize: font.small,
      color: p.textMuted,
    },
    slotRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    description: {
      fontSize: font.body,
      lineHeight: 22,
      color: p.textMuted,
    },
    footer: {
      padding: spacing.xl,
      paddingTop: spacing.md,
      backgroundColor: p.surface,
      borderTopWidth: 1,
      borderTopColor: p.border,
    },
  });
