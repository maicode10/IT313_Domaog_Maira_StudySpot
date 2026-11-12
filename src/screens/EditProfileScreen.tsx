import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Avatar from "../components/Avatar";
import PrimaryButton from "../components/PrimaryButton";
import { colors, font, Palette, radius, shadow, spacing } from "../theme/theme";
import { User } from "../types";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"EditProfile"> & {
  user: User;
  palette: Palette;
  onSaveProfile: (name: string, section: string) => void;
};

/**
 * Edit Profile - a modal off the Profile tab.
 * Same controlled-input and inline-error rules as Login: the name cannot
 * be emptied, and Save stays blocked until it is valid.
 */
export default function EditProfileScreen({
  navigation,
  user,
  palette,
  onSaveProfile,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const [name, setName] = useState(user.name);
  const [section, setSection] = useState(user.section);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const isValid = trimmedName.length > 0;
  const isDirty = trimmedName !== user.name || section.trim() !== user.section;

  const handleNameChange = (text: string) => {
    setName(text);
    if (error && text.trim().length > 0) setError(null);
  };

  const handleSave = () => {
    if (!isValid) {
      setError("Your name cannot be empty.");
      return;
    }

    onSaveProfile(trimmedName, section.trim());
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.preview}>
          <Avatar name={trimmedName || "S"} size={72} />
          <Text style={styles.previewNote}>Your initials update as you type.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={[styles.input, !!error && styles.inputError]}
              value={name}
              onChangeText={handleNameChange}
              placeholder="Enter your name"
              placeholderTextColor={palette.textFaint}
              autoCapitalize="words"
              returnKeyType="next"
            />
            {!!error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Section</Text>
            <TextInput
              style={styles.input}
              value={section}
              onChangeText={setSection}
              placeholder="e.g. IT3R4"
              placeholderTextColor={palette.textFaint}
              autoCapitalize="characters"
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Save Changes"
          onPress={handleSave}
          palette={palette}
          disabled={!isValid || !isDirty}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: p.bg },
    scroll: {
      padding: spacing.xl,
      paddingBottom: spacing.xl,
      gap: spacing.xl,
    },
    preview: {
      alignItems: "center",
      gap: spacing.md,
      paddingTop: spacing.md,
    },
    previewNote: {
      fontSize: font.small,
      color: p.textMuted,
    },
    card: {
      backgroundColor: p.surface,
      borderRadius: radius.xxl,
      padding: spacing.xl,
      gap: spacing.xl,
      ...shadow.card,
    },
    field: { gap: spacing.sm },
    label: {
      fontSize: font.tiny,
      fontWeight: "800",
      letterSpacing: 1.1,
      textTransform: "uppercase",
      color: p.textFaint,
    },
    input: {
      height: 52,
      borderRadius: radius.lg,
      backgroundColor: p.field,
      borderWidth: 1.5,
      borderColor: "transparent",
      paddingHorizontal: spacing.lg,
      fontSize: font.body,
      color: p.text,
    },
    inputError: {
      borderColor: colors.red,
      backgroundColor: p.badSoft,
    },
    errorText: {
      fontSize: font.small,
      color: colors.red,
      fontWeight: "600",
    },
    footer: {
      padding: spacing.xl,
      paddingTop: spacing.md,
      backgroundColor: p.surface,
      borderTopWidth: 1,
      borderTopColor: p.border,
    },
  });
