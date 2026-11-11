import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, font, radius, shadow, spacing } from "../theme/theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "outline" | "danger";
  style?: ViewStyle;
};

/** The one button style used across the app. */
export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "solid",
  style,
}: Props) {
  const off = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={off}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variant === "solid" && styles.solid,
        variant === "outline" && styles.outline,
        variant === "danger" && styles.danger,
        off && styles.off,
        pressed && !off && { transform: [{ scale: 0.985 }], opacity: 0.92 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "solid" ? colors.white : colors.violetDark} />
      ) : (
        <Text
          style={[
            styles.label,
            variant === "solid" && { color: colors.white },
            variant === "outline" && { color: colors.navy },
            variant === "danger" && { color: colors.red },
            off && { color: colors.textFaint },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  solid: {
    backgroundColor: colors.navy,
    ...shadow.card,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  danger: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: "#F3C9C8",
  },
  off: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: font.h3,
    fontWeight: "700",
  },
});