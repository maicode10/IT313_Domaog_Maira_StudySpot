import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  value: number;
  max: number;
  onChange: (next: number) => void;
  palette: Palette;
  min?: number;
};

/** Minus / number / plus, capped at the space's seat count (F8). */
export default function Stepper({ value, max, onChange, palette, min = 1 }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const canDown = value > min;
  const canUp = value < max;
  const activeIcon = palette.isDark ? palette.accentText : colors.navy;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => canDown && onChange(value - 1)}
        disabled={!canDown}
        hitSlop={8}
        accessibilityLabel="Decrease group size"
        style={[styles.btn, !canDown && styles.btnOff]}
      >
        <Ionicons name="remove" size={20} color={canDown ? activeIcon : palette.textFaint} />
      </Pressable>

      <Text style={styles.value}>{value}</Text>

      <Pressable
        onPress={() => canUp && onChange(value + 1)}
        disabled={!canUp}
        hitSlop={8}
        accessibilityLabel="Increase group size"
        style={[styles.btn, !canUp && styles.btnOff]}
      >
        <Ionicons name="add" size={20} color={canUp ? activeIcon : palette.textFaint} />
      </Pressable>

      <Text style={styles.hint}>max {max} people</Text>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    btn: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: p.surface,
      borderWidth: 1.5,
      borderColor: p.borderStrong,
    },
    btnOff: {
      backgroundColor: p.disabled,
      borderColor: p.disabled,
    },
    value: {
      fontSize: font.h1,
      fontWeight: "800",
      color: p.text,
      minWidth: 34,
      textAlign: "center",
    },
    hint: {
      fontSize: font.small,
      color: p.textFaint,
      marginLeft: spacing.xs,
    },
  });
