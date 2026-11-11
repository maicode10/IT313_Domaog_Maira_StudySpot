import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  color?: string;
  background?: string;
};

/** A small read-only pill: amenities, "Confirmed", "Quiet", and so on. */
export default function Chip({
  label,
  color = colors.violetDark,
  background = colors.violetSoft,
}: Props) {
  return (
    <View style={[styles.chip, { backgroundColor: background }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: font.tiny,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});