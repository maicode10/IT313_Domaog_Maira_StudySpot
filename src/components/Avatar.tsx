import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  name: string;
  size?: number;
};

/** Circle with the student's initials (F10). */
export default function Avatar({ name, size = 92 }: Props) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.34 }]}>{initials || "S"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "800",
    color: colors.navy,
    letterSpacing: 0.5,
  },
});
