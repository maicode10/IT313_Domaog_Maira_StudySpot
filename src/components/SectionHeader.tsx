import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  title: string;
  count: number;
  palette: Palette;
};

/** Building header inside the Explore SectionList (F4). */
export default function SectionHeader({ title, count, palette }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

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

const createStyles = (p: Palette) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      backgroundColor: p.bg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: font.tiny,
      fontWeight: "800",
      letterSpacing: 1.1,
      textTransform: "uppercase",
      color: p.isDark ? p.accentText : "#1A1751",
    },
    badge: {
      minWidth: 18,
      height: 18,
      paddingHorizontal: 5,
      borderRadius: radius.pill,
      backgroundColor: p.accentSoft,
      alignItems: "center",
      justifyContent: "center",
    },
    badgeText: {
      fontSize: 10,
      fontWeight: "800",
      color: p.accentText,
    },
    rule: {
      flex: 1,
      height: 1,
      backgroundColor: p.border,
      marginLeft: spacing.xs,
    },
  });
