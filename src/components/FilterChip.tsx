import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

/** A tappable filter pill on the navy hero (F5). */
export default function FilterChip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  chipActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  text: {
    fontSize: font.small,
    fontWeight: "600",
    color: colors.onNavyMuted,
  },
  textActive: {
    color: colors.navy,
    fontWeight: "700",
  },
});
