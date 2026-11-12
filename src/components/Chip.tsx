import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  palette: Palette;
  color?: string;
  background?: string;
};

/** A small read-only pill: amenities, "Confirmed", and so on. */
export default function Chip({ label, palette, color, background }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={[styles.chip, !!background && { backgroundColor: background }]}>
      <Text style={[styles.text, !!color && { color }]}>{label}</Text>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      borderRadius: radius.pill,
      backgroundColor: p.accentSoft,
    },
    text: {
      fontSize: font.tiny,
      fontWeight: "700",
      letterSpacing: 0.2,
      color: p.accentText,
    },
  });
