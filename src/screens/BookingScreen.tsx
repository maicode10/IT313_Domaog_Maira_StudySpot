import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import EmptyState from "../components/EmptyState";
import Notice from "../components/Notice";
import PrimaryButton from "../components/PrimaryButton";
import SlotChip from "../components/SlotChip";
import Stepper from "../components/Stepper";
import { colors, font, Palette, radius, shadow, spacing } from "../theme/theme";
import { Booking, StudySpace } from "../types";
import { findConflict, todayLabel } from "../utils/occupancy";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"Booking"> & {
  spaces: StudySpace[];
  bookings: Booking[];
  palette: Palette;
  onConfirmBooking: (booking: Booking) => void;
};

const MIN_PURPOSE = 10;

/**
 * F8 - Booking modal.
 * Pick a free slot, set the group size, write a purpose of at least 10
 * characters. Errors show inline and Confirm is blocked until it is valid.
 *
 * Enhancement - Smart conflict warning: the slot is also checked against
 * every other booking the student already has today, in any space.
 */
export default function BookingScreen({
  route,
  navigation,
  spaces,
  bookings,
  palette,
  onConfirmBooking,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const { spaceId, slot: presetSlot } = route.params;
  const space = spaces.find((s) => s.id === spaceId);

  // preselected when the student tapped a block on the day strip
  const [slot, setSlot] = useState<string | null>(presetSlot ?? null);
  const [groupSize, setGroupSize] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [touched, setTouched] = useState(false);

  if (!space) {
    return (
      <View style={styles.notFound}>
        <EmptyState palette={palette} icon="alert-circle-outline" title="Space not found." />
      </View>
    );
  }

  const date = todayLabel();

  // a slot is gone if the space already has it, or the student booked it
  const isTaken = (value: string) =>
    space.bookedSlots.includes(value) ||
    bookings.some((b) => b.spaceId === space.id && b.slot === value && b.date === date);

  // the enhancement: clash with any booking today, across all spaces
  const conflict = slot ? findConflict(bookings, date, slot) : null;

  const slotError = touched && !slot ? "Pick a time slot." : null;
  const purposeError =
    touched && purpose.trim().length < MIN_PURPOSE
      ? `Purpose must be at least ${MIN_PURPOSE} characters.`
      : null;

  const isValid = !!slot && !conflict && purpose.trim().length >= MIN_PURPOSE;

  const handleConfirm = () => {
    setTouched(true);
    if (!isValid || !slot) return;

    onConfirmBooking({
      id: `${space.id}-${slot}-${Date.now()}`,
      spaceId: space.id,
      spaceName: space.name,
      date,
      slot,
      groupSize,
      purpose: purpose.trim(),
      confirmed: true,
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>You are booking</Text>
          <Text style={styles.summaryName}>{space.name}</Text>
          <Text style={styles.summaryMeta}>
            {date} · {space.building}
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Time slot</Text>

          <View style={styles.slotRow}>
            {space.slots.map((value) => (
              <SlotChip
                key={value}
                label={value}
                palette={palette}
                selected={slot === value}
                disabled={isTaken(value)}
                onPress={() => setSlot(value)}
              />
            ))}
          </View>

          {!!slotError && <Text style={styles.error}>{slotError}</Text>}

          {!!conflict && (
            <Notice
              palette={palette}
              tone="warning"
              title="That overlaps a booking you already have"
              message={`${conflict.spaceName} is reserved for ${conflict.slot} on the same day. Cancel that one first, or pick another slot.`}
            />
          )}
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Group size</Text>
          <Stepper
            value={groupSize}
            max={space.seats}
            palette={palette}
            onChange={setGroupSize}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.label}>Purpose of use</Text>

          <TextInput
            style={[styles.textArea, !!purposeError && styles.inputError]}
            value={purpose}
            onChangeText={setPurpose}
            placeholder="e.g. Reviewing for the Networking 2 quiz"
            placeholderTextColor={palette.textFaint}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={purposeError ? styles.error : styles.counter}>
            {purposeError ?? `${purpose.trim().length}/${MIN_PURPOSE} characters`}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Confirm Booking"
          palette={palette}
          onPress={handleConfirm}
          disabled={!!conflict || (touched && !isValid)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: p.bg },
    notFound: { flex: 1, backgroundColor: p.bg, justifyContent: "center" },
    scroll: {
      padding: spacing.xl,
      paddingBottom: spacing.xl,
      gap: spacing.xl,
    },
    summary: {
      backgroundColor: p.surface,
      borderRadius: radius.xxl,
      padding: spacing.xl,
      gap: spacing.xs,
      ...shadow.card,
    },
    summaryLabel: {
      fontSize: font.tiny,
      fontWeight: "800",
      letterSpacing: 1.1,
      textTransform: "uppercase",
      color: p.textFaint,
    },
    summaryName: {
      fontSize: font.h1,
      fontWeight: "800",
      color: p.isDark ? p.text : colors.navy,
      letterSpacing: -0.3,
    },
    summaryMeta: {
      fontSize: font.small,
      color: p.textMuted,
    },
    block: { gap: spacing.md },
    label: {
      fontSize: font.tiny,
      fontWeight: "800",
      letterSpacing: 1.1,
      textTransform: "uppercase",
      color: p.textFaint,
    },
    slotRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    textArea: {
      minHeight: 96,
      borderRadius: radius.lg,
      borderWidth: 1.5,
      borderColor: p.border,
      backgroundColor: p.surface,
      padding: spacing.lg,
      fontSize: font.body,
      color: p.text,
      lineHeight: 21,
    },
    inputError: {
      borderColor: colors.red,
      backgroundColor: p.badSoft,
    },
    error: {
      fontSize: font.small,
      color: colors.red,
      fontWeight: "600",
    },
    counter: {
      fontSize: font.tiny,
      color: p.textFaint,
    },
    footer: {
      padding: spacing.xl,
      paddingTop: spacing.md,
      backgroundColor: p.surface,
      borderTopWidth: 1,
      borderTopColor: p.border,
    },
  });
