import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, font, Palette, radius, shadow, spacing } from "../theme/theme";

type Props = {
  label: string;
  onPress: () => void;
  palette: Palette;
  disabled?: boolean;
  variant?: "solid" | "outline" | "danger";
  style?: ViewStyle;
};

/** The one button style used across the app. */
export default function PrimaryButton({
  label,
  onPress,
  palette,
  disabled = false,
  variant = "solid",
  style,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === "solid" && styles.solid,
        variant === "outline" && styles.outline,
        variant === "danger" && styles.danger,
        disabled && styles.off,
        pressed && !disabled && { transform: [{ scale: 0.985 }], opacity: 0.92 },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === "solid" && styles.labelSolid,
          variant === "outline" && styles.labelOutline,
          variant === "danger" && styles.labelDanger,
          disabled && { color: palette.textFaint },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    base: {
      height: 52,
      borderRadius: radius.lg,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
    },
    solid: {
      backgroundColor: p.isDark ? colors.violet : colors.navy,
      ...shadow.card,
    },
    outline: {
      backgroundColor: p.surface,
      borderWidth: 1.5,
      borderColor: p.borderStrong,
    },
    danger: {
      backgroundColor: p.surface,
      borderWidth: 1.5,
      borderColor: p.dangerBorder,
    },
    off: {
      backgroundColor: p.disabled,
      borderColor: p.disabled,
      shadowOpacity: 0,
      elevation: 0,
    },
    label: {
      fontSize: font.h3,
      fontWeight: "700",
    },
    labelSolid: { color: colors.white },
    labelOutline: { color: p.isDark ? p.accentText : colors.navy },
    labelDanger: { color: colors.red },
  });
