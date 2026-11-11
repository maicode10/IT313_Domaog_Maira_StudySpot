import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenHero from "../components/ScreenHero";
import { colors, font, radius, sheet, spacing } from "../theme/theme";
import { Booking } from "../types";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Bookings"> & {
  bookings: Booking[];
};

/**
 * My Bookings - milestone 1 version.
 * The tab and the badge are what matter here. The FlatList of bookings
 * and the cancel gesture come with Module 8.
 */
export default function MyBookingsScreen({ bookings }: Props) {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.navyTop}>
        <ScreenHero
          title="My Bookings"
          subtitle={`${bookings.length} active booking${bookings.length === 1 ? "" : "s"}`}
        />
      </SafeAreaView>

      <View style={sheet}>
        <View style={styles.empty}>
          <View style={styles.circle}>
            <Ionicons name="calendar-outline" size={28} color={colors.violet} />
          </View>
          <Text style={styles.emptyTitle}>No bookings yet.</Text>
          <Text style={styles.emptyNote}>
            Booking is wired up in the next milestone.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  navyTop: { backgroundColor: colors.navy },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.violetSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontSize: font.h2,
    fontWeight: "800",
    color: colors.text,
  },
  emptyNote: {
    fontSize: font.small,
    color: colors.textMuted,
    textAlign: "center",
  },
});