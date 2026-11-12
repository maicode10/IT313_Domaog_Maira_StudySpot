import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeroGlow from "./HeroGlow";
import { colors, font, spacing } from "../theme/theme";

type Props = {
  /** small all-caps line above the title */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** anything that should sit inside the navy block, under the title */
  children?: React.ReactNode;
  /** shorter version, for screens that already have a stack header */
  compact?: boolean;
};

/** The navy block at the top of every screen. */
export default function ScreenHero({
  eyebrow,
  title,
  subtitle,
  children,
  compact = false,
}: Props) {
  return (
    <View style={[styles.hero, compact && styles.heroCompact]}>
      <HeroGlow />

      {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}

      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl + spacing.lg,
    overflow: "hidden",
  },
  heroCompact: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl + spacing.lg,
  },
  eyebrow: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: colors.onNavyFaint,
    marginBottom: 6,
  },
  title: {
    fontSize: font.display,
    fontWeight: "800",
    color: colors.onNavy,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: font.small,
    color: colors.onNavyMuted,
    marginTop: 3,
  },
});