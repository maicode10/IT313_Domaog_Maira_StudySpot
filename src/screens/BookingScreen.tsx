import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, font, radius, shadow, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"Booking"> & {
  spaces: StudySpace[];
};

/**
 * Booking - milestone 1 version.
 * It only has to open as a modal and read its route param for now.
 * The slot picker, stepper and validation come with Module 8.
 */
export default function BookingScreen({ route, spaces }: Props) {
  const space = spaces.find((s) => s.id === route.params.spaceId);

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.label}>You are booking</Text>
        <Text style={styles.name}>{space ? space.name : "Space not found."}</Text>
        {!!space && (
          <Text style={styles.meta}>
            {space.building} · up to {space.seats} seats
          </Text>
        )}
      </View>

      <Text style={styles.todo}>
        Slot picker, group size and validation arrive in the next milestone.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    gap: spacing.xs,
    ...shadow.card,
  },
  label: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.textFaint,
  },
  name: {
    fontSize: font.h1,
    fontWeight: "800",
    color: colors.navy,
    letterSpacing: -0.3,
  },
  meta: {
    fontSize: font.small,
    color: colors.textMuted,
  },
  todo: {
    fontSize: font.small,
    color: colors.textFaint,
    textAlign: "center",
  },
});