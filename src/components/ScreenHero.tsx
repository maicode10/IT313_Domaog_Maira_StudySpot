import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeroGlow from "./HeroGlow";
import { colors, font, spacing } from "../theme/theme";

type Props = {
  title: string;
  subtitle?: string;
  /** anything that should sit inside the navy block, under the title */
  children?: React.ReactNode;
  /** shorter version, for screens that already have a stack header */
  compact?: boolean;
};

/** The navy block at the top of every screen. */
export default function ScreenHero({
  title,
  subtitle,
  children,
  compact = false,
}: Props) {
  return (
    <View style={[styles.hero, compact && styles.heroCompact]}>
      <HeroGlow />

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
