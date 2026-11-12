import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { font, Palette, radius, spacing } from "../theme/theme";

type Tone = "warning" | "info" | "danger";

type Props = {
  palette: Palette;
  tone?: Tone;
  title: string;
  message?: string;
};

/** Inline banner. Used for the conflict warning and other soft messages. */
export default function Notice({ palette, tone = "info", title, message }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const tones: Record<Tone, { bg: string; border: string; fg: string; icon: keyof typeof Ionicons.glyphMap }> = {
    warning: {
      bg: palette.warnSoft,
      border: palette.goldBorder,
      fg: palette.isDark ? "#E8B65F" : "#9A6A14",
      icon: "alert-circle-outline",
    },
    info: {
      bg: palette.accentSoft,
      border: palette.borderStrong,
      fg: palette.accentText,
      icon: "information-circle-outline",
    },
    danger: {
      bg: palette.badSoft,
      border: palette.dangerBorder,
      fg: palette.isDark ? "#F08A86" : "#A93935",
      icon: "close-circle-outline",
    },
  };

  const t = tones[tone];

  return (
    <View style={[styles.wrap, { backgroundColor: t.bg, borderColor: t.border }]}>
      <Ionicons name={t.icon} size={18} color={t.fg} style={styles.icon} />

      <View style={styles.text}>
        <Text style={[styles.title, { color: t.fg }]}>{title}</Text>
        {!!message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    wrap: {
      flexDirection: "row",
      gap: spacing.md,
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: spacing.lg,
    },
    icon: { marginTop: 1 },
    text: { flex: 1, gap: 3 },
    title: {
      fontSize: font.small,
      fontWeight: "700",
    },
    message: {
      fontSize: font.small,
      color: p.textMuted,
      lineHeight: 19,
    },
  });
