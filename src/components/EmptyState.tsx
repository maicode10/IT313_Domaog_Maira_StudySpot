import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  palette: Palette;
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
};

/** Used by ListEmptyComponent on Explore (F5) and My Bookings (F9). */
export default function EmptyState({
  palette,
  icon = "search-outline",
  title,
  message,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={26} color={colors.violet} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    wrap: {
      alignItems: "center",
      paddingVertical: spacing.xxxl,
      paddingHorizontal: spacing.xl,
      gap: spacing.sm,
    },
    circle: {
      width: 64,
      height: 64,
      borderRadius: radius.pill,
      backgroundColor: p.accentSoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.xs,
    },
    title: {
      fontSize: font.h3,
      fontWeight: "700",
      color: p.text,
      textAlign: "center",
    },
    message: {
      fontSize: font.small,
      color: p.textMuted,
      textAlign: "center",
      lineHeight: 20,
    },
  });
