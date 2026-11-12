import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Chip from "../components/Chip";
import EmptyState from "../components/EmptyState";
import ScreenHero from "../components/ScreenHero";
import { colors, font, radius, sheet, shadow, spacing } from "../theme/theme";
import { Booking } from "../types";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Bookings"> & {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
};

/**
 * F9 - My Bookings.
 * A FlatList of what the student reserved. Cancel asks first, and a long
 * press is a shortcut to the same confirmation.
 */
export default function MyBookingsScreen({ bookings, onCancelBooking }: Props) {
  const confirmCancel = (booking: Booking) => {
    Alert.alert("Cancel booking?", `${booking.spaceName} · ${booking.slot}`, [
      { text: "Keep it", style: "cancel" },
      {
        text: "Cancel booking",
        style: "destructive",
        onPress: () => onCancelBooking(booking.id),
      },
    ]);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.navyTop}>
        <ScreenHero
          title="My Bookings"
          subtitle={`${bookings.length} active booking${bookings.length === 1 ? "" : "s"}`}
        />
      </SafeAreaView>

      <View style={sheet}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          ListEmptyComponent={
            <EmptyState
              icon="calendar-outline"
              title="No bookings yet."
              message="Find a space in Explore and reserve a slot to see it here."
            />
          }
          ListFooterComponent={
            bookings.length > 0 ? (
              <Text style={styles.hint}>Long-press a booking to cancel it.</Text>
            ) : undefined
          }
          renderItem={({ item }) => (
            <Pressable
              onLongPress={() => confirmCancel(item)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardText}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.spaceName}
                  </Text>
                  <Text style={styles.meta} numberOfLines={1}>
                    {item.date} · {item.slot} · {item.groupSize} people
                  </Text>
                </View>

                <Ionicons name="time-outline" size={18} color={colors.textFaint} />
              </View>

              <Text style={styles.purpose} numberOfLines={2}>
                {item.purpose}
              </Text>

              <View style={styles.cardBottom}>
                <Chip
                  label={item.confirmed ? "Confirmed" : "Pending"}
                  color={item.confirmed ? colors.green : colors.amber}
                  background={item.confirmed ? colors.greenSoft : colors.amberSoft}
                />

                <Pressable
                  onPress={() => confirmCancel(item)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.cancelBtn, pressed && { opacity: 0.7 }]}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  navyTop: { backgroundColor: colors.navy },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
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
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  cardText: { flex: 1, gap: 3 },
  name: {
    fontSize: font.h3,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    fontSize: font.small,
    color: colors.textMuted,
  },
  purpose: {
    fontSize: font.small,
    color: colors.textFaint,
    lineHeight: 19,
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: "#F3C9C8",
    backgroundColor: colors.surface,
  },
  cancelText: {
    fontSize: font.small,
    fontWeight: "700",
    color: colors.red,
  },
  hint: {
    fontSize: font.tiny,
    color: colors.textFaint,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});