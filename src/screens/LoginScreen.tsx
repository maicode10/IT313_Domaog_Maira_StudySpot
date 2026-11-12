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
import { SafeAreaView } from "react-native-safe-area-context";

import HeroGlow from "../components/HeroGlow";
import PrimaryButton from "../components/PrimaryButton";
import { colors, font, Palette, radius, shadow, spacing } from "../theme/theme";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"Login"> & {
  palette: Palette;
  onSignIn: (name: string, section: string) => void;
};

/**
 * F1 - Login screen.
 * Controlled TextInputs. An empty name shows an inline error and blocks
 * sign-in. The header is hidden here (set in RootNavigator).
 */
export default function LoginScreen({ palette, onSignIn }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    if (name.trim().length === 0) {
      setError("Please enter your name.");
      return;
    }
    setError(null);
    onSignIn(name.trim(), section.trim());
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (error && text.trim().length > 0) setError(null);
  };

  return (
    <View style={styles.root}>
      <HeroGlow variant="screen" />

      <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.brand}>
              <Text style={styles.eyebrow}>USTP-CDO</Text>
              <Text style={styles.appName}>StudySpot</Text>
              <Text style={styles.tagline}>
                Find a quiet seat before someone else does.
              </Text>
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
                  onSubmitEditing={handleSignIn}
                />
              </View>

              <PrimaryButton
                label="Log In"
                onPress={handleSignIn}
                palette={palette}
                style={styles.button}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.navy, overflow: "hidden" },
    flex: { flex: 1 },
    scroll: {
      flexGrow: 1,
      justifyContent: "center",
      padding: spacing.xl,
      gap: spacing.xxl,
    },
    brand: {
      gap: spacing.xs,
    },
    eyebrow: {
      fontSize: font.tiny,
      fontWeight: "800",
      letterSpacing: 2,
      color: colors.onNavyFaint,
    },
    appName: {
      fontSize: 42,
      fontWeight: "800",
      color: colors.onNavy,
      letterSpacing: -1.2,
    },
    tagline: {
      fontSize: font.body,
      color: colors.onNavyMuted,
      lineHeight: 21,
      maxWidth: 260,
    },
    card: {
      backgroundColor: p.surface,
      borderRadius: 30,
      padding: spacing.xl,
      gap: spacing.xl,
      ...shadow.raised,
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
    button: { marginTop: spacing.xs },
  });
