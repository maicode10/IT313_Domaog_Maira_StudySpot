import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Tone = "warning" | "info" | "danger";

type Props = {
  tone?: Tone;
  title: string;
  message?: string;
};

const TONES: Record<
  Tone,
  { bg: string; border: string; fg: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  warning: { bg: colors.amberSoft, border: "#F0D4A3", fg: "#9A6A14", icon: "alert-circle-outline" },
  info: { bg: colors.violetSoft, border: colors.borderStrong, fg: colors.violetDark, icon: "information-circle-outline" },
  danger: { bg: colors.redSoft, border: "#F3C9C8", fg: "#A93935", icon: "close-circle-outline" },
};

/** Inline banner. Used for the conflict warning and other soft messages. */
export default function Notice({ tone = "info", title, message }: Props) {
  const t = TONES[tone];

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

const styles = StyleSheet.create({
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
    color: colors.textMuted,
    lineHeight: 19,
  },
});