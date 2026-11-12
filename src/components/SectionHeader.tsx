import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  title: string;
  count: number;
};

/** Building header inside the Explore SectionList (F4). */
export default function SectionHeader({ title, count }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>

      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.bg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.navy,
  },
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.violetSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.violetDark,
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.xs,
  },
});