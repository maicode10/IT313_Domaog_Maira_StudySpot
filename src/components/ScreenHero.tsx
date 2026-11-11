import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  title: string;
  subtitle?: string;
  /** anything that should sit inside the navy block, under the title */
  children?: React.ReactNode;
  /** shorter version, for screens that already have a stack header */
  compact?: boolean;
};

/**
 * The navy block at the top of every screen.
 * The "glow" is three blurred-looking circles behind the text - no gradient
 * library needed, just translucent violet and gold discs with a big radius.
 */
export default function ScreenHero({ title, subtitle, children, compact = false }: Props) {
  return (
    <View style={[styles.hero, compact && styles.heroCompact]}>
      <View pointerEvents="none" style={styles.glowLayer}>
        <View style={[styles.blob, styles.blobA]} />
        <View style={[styles.blob, styles.blobB]} />
        <View style={[styles.blob, styles.blobC]} />
      </View>

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
  glowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blob: {
    position: "absolute",
    borderRadius: radius.pill,
    opacity: 0.9,
  },
  blobA: {
    width: 230,
    height: 230,
    top: -120,
    right: -70,
    backgroundColor: colors.heroGlowA,
  },
  blobB: {
    width: 180,
    height: 180,
    bottom: -90,
    left: -50,
    backgroundColor: colors.heroGlowB,
  },
  blobC: {
    width: 110,
    height: 110,
    top: -30,
    left: 90,
    backgroundColor: colors.heroGlowC,
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