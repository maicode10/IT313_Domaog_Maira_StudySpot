import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

/** One time slot. Struck through and not pressable when already booked. */
export default function SlotChip({
  label,
  selected = false,
  disabled = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selected,
        disabled && styles.disabled,
        pressed && !disabled && { opacity: 0.8 },
      ]}
    >
      <Text style={[styles.text, selected && styles.textSelected, disabled && styles.textDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.violetTint,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.violetSoft,
    borderColor: colors.violet,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  text: {
    fontSize: font.small,
    fontWeight: "600",
    color: colors.text,
  },
  textSelected: {
    color: colors.violetDark,
    fontWeight: "700",
  },
  textDisabled: {
    color: colors.textFaint,
    textDecorationLine: "line-through",
  },
});