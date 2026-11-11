import React, { useState } from "react";
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

import PrimaryButton from "../components/PrimaryButton";
import { colors, font, radius, shadow, spacing } from "../theme/theme";
import { RootStackScreenProps } from "../navigation/types";

type Props = RootStackScreenProps<"Login"> & {
  onSignIn: (name: string, section: string) => void;
};

/**
 * F1 - Login screen.
 * Controlled TextInputs. An empty name shows an inline error and blocks
 * sign-in. The header is hidden here (set in RootNavigator).
 */
export default function LoginScreen({ onSignIn }: Props) {
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
      {/* glow sits behind everything on this screen */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.blob, styles.blobA]} />
        <View style={[styles.blob, styles.blobB]} />
        <View style={[styles.blob, styles.blobC]} />
      </View>

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
                  placeholderTextColor={colors.textFaint}
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
                  placeholderTextColor={colors.textFaint}
                  autoCapitalize="characters"
                  returnKeyType="done"
                  onSubmitEditing={handleSignIn}
                />
              </View>

              <PrimaryButton label="Log In" onPress={handleSignIn} style={styles.button} />
            </View>

            <Text style={styles.note}>
              Any non-empty name works. Sign-in is simulated.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy, overflow: "hidden" },
  flex: { flex: 1 },
  blob: { position: "absolute", borderRadius: radius.pill },
  blobA: {
    width: 320,
    height: 320,
    top: -130,
    right: -110,
    backgroundColor: colors.heroGlowA,
  },
  blobB: {
    width: 260,
    height: 260,
    top: 120,
    left: -130,
    backgroundColor: colors.heroGlowB,
  },
  blobC: {
    width: 140,
    height: 140,
    top: 40,
    left: 120,
    backgroundColor: colors.heroGlowC,
  },
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
    backgroundColor: colors.surface,
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
    color: colors.textFaint,
  },
  input: {
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.violetTint,
    borderWidth: 1.5,
    borderColor: "transparent",
    paddingHorizontal: spacing.lg,
    fontSize: font.body,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.red,
    backgroundColor: colors.redSoft,
  },
  errorText: {
    fontSize: font.small,
    color: colors.red,
    fontWeight: "600",
  },
  button: { marginTop: spacing.xs },
  note: {
    fontSize: font.tiny,
    color: colors.onNavyFaint,
    textAlign: "center",
  },
});