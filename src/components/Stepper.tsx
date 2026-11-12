import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  value: number;
  min?: number;
  max: number;
  onChange: (next: number) => void;
};

/** Minus / number / plus, capped at the space's seat count (F8). */
export default function Stepper({ value, min = 1, max, onChange }: Props) {
  const canDown = value > min;
  const canUp = value < max;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => canDown && onChange(value - 1)}
        disabled={!canDown}
        hitSlop={8}
        accessibilityLabel="Decrease group size"
        style={[styles.btn, !canDown && styles.btnOff]}
      >
        <Ionicons name="remove" size={20} color={canDown ? colors.navy : colors.textFaint} />
      </Pressable>

      <Text style={styles.value}>{value}</Text>

      <Pressable
        onPress={() => canUp && onChange(value + 1)}
        disabled={!canUp}
        hitSlop={8}
        accessibilityLabel="Increase group size"
        style={[styles.btn, !canUp && styles.btnOff]}
      >
        <Ionicons name="add" size={20} color={canUp ? colors.navy : colors.textFaint} />
      </Pressable>

      <Text style={styles.hint}>max {max} people</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  btnOff: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  value: {
    fontSize: font.h1,
    fontWeight: "800",
    color: colors.text,
    minWidth: 34,
    textAlign: "center",
  },
  hint: {
    fontSize: font.small,
    color: colors.textFaint,
    marginLeft: spacing.xs,
  },
});