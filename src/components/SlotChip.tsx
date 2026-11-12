import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  palette: Palette;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

/** One time slot. Struck through and not pressable when already booked. */
export default function SlotChip({
  label,
  palette,
  selected = false,
  disabled = false,
  onPress,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

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

const createStyles = (p: Palette) =>
  StyleSheet.create({
    chip: {
      paddingHorizontal: spacing.lg,
      paddingVertical: 10,
      borderRadius: radius.md,
      backgroundColor: p.accentTint,
      borderWidth: 1.5,
      borderColor: p.border,
    },
    selected: {
      backgroundColor: p.accentSoft,
      borderColor: colors.violet,
    },
    disabled: {
      backgroundColor: p.disabled,
      borderColor: p.disabled,
    },
    text: {
      fontSize: font.small,
      fontWeight: "600",
      color: p.text,
    },
    textSelected: {
      color: p.accentText,
      fontWeight: "700",
    },
    textDisabled: {
      color: p.textFaint,
      textDecorationLine: "line-through",
    },
  });
