import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { colors, font, radius, spacing } from "../theme/theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

/**
 * Controlled search input (F5). It sits on the navy hero, so the field is a
 * translucent white panel rather than a white box.
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search spaces or buildings...",
}: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={17} color={colors.onNavyFaint} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.onNavyFaint}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={10} accessibilityLabel="Clear search">
          <Ionicons name="close-circle" size={17} color={colors.onNavyFaint} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: 46,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: font.body,
    color: colors.onNavy,
  },
});