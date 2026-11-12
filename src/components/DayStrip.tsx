import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, Palette, radius } from "../theme/theme";
import { StudySpace } from "../types";
import { nextFreeSlot, slotStart, slotStartHour } from "../utils/occupancy";

type Props = {
  space: StudySpace;
  palette: Palette;
  /** called with the slot when an open block is tapped */
  onPressSlot?: (slot: string) => void;
  showLabel?: boolean;
};

/**
 * "When can I actually sit here?" - the whole day on one row.
 *
 * One block per slot: greyed out when it is taken, outlined when it is open,
 * and solid violet for the next open one. Tapping an open block books it.
 */
export default function DayStrip({
  space,
  palette,
  onPressSlot,
  showLabel = true,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);
  const next = nextFreeSlot(space);

  return (
    <View style={styles.wrap}>
      <View style={styles.strip}>
        {space.slots.map((slot) => {
          const taken = space.bookedSlots.includes(slot);
          const isNext = !taken && slot === next;

          return (
            <Pressable
              key={slot}
              onPress={() => !taken && onPressSlot?.(slot)}
              disabled={taken || !onPressSlot}
              accessibilityRole="button"
              accessibilityLabel={taken ? `${slot} is booked` : `Book ${slot}`}
              style={({ pressed }) => [
                styles.block,
                taken && styles.blockTaken,
                isNext && styles.blockNext,
                pressed && !taken && { opacity: 0.7 },
              ]}
            >
              <Text
                style={[
                  styles.blockText,
                  taken && styles.blockTextTaken,
                  isNext && styles.blockTextNext,
                ]}
              >
                {slotStartHour(slot)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {showLabel && (
        <Text style={[styles.label, !next && styles.labelFull]}>
          {next ? `Free at ${slotStart(next)} · tap to book` : "Fully booked today"}
        </Text>
      )}
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    wrap: {
      gap: 6,
    },
    strip: {
      flexDirection: "row",
      gap: 5,
    },
    block: {
      flex: 1,
      height: 26,
      borderRadius: radius.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.surface,
      borderWidth: 1.5,
      borderColor: p.borderStrong,
    },
    blockTaken: {
      backgroundColor: p.disabled,
      borderColor: p.disabled,
    },
    blockNext: {
      backgroundColor: colors.violet,
      borderColor: colors.violet,
    },
    blockText: {
      fontSize: font.tiny,
      fontWeight: "700",
      color: p.accentText,
    },
    blockTextTaken: {
      color: p.textFaint,
    },
    blockTextNext: {
      color: colors.white,
    },
    label: {
      fontSize: font.tiny,
      fontWeight: "700",
      color: colors.green,
    },
    labelFull: {
      color: p.textFaint,
    },
  });
