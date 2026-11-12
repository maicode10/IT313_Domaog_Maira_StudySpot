import React, { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { colors, font, Palette, radius, spacing } from "../theme/theme";

type Props = {
  label: string;
  palette: Palette;
  uri?: string;
  height?: number;
};

/**
 * The photo for a study space (F7).
 * Shows a spinner while it loads and a placeholder when there is no photo
 * or the phone is offline, so the screen never looks broken on mobile data.
 */
export default function SpaceImage({ label, palette, uri, height = 150 }: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const [loading, setLoading] = useState(!!uri);
  const [failed, setFailed] = useState(false);

  const showPlaceholder = !uri || failed;

  return (
    <View style={[styles.frame, { height }]}>
      {!showPlaceholder && (
        <Image
          source={{ uri }}
          style={styles.photo}
          resizeMode="cover"
          accessibilityLabel={`Photo of ${label}`}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setFailed(true);
            setLoading(false);
          }}
        />
      )}

      {showPlaceholder && (
        <View style={styles.center}>
          <Ionicons name="image-outline" size={30} color={colors.violetMid} />
          <Text style={styles.placeholderText}>No photo yet</Text>
        </View>
      )}

      {loading && !showPlaceholder && (
        <View style={[styles.center, styles.loader]}>
          <ActivityIndicator color={colors.violet} />
        </View>
      )}
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    frame: {
      borderRadius: radius.xl,
      overflow: "hidden",
      backgroundColor: p.accentSoft,
      borderWidth: 1,
      borderColor: p.border,
    },
    photo: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    center: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
    },
    loader: {
      backgroundColor: p.accentSoft,
    },
    placeholderText: {
      fontSize: font.tiny,
      fontWeight: "700",
      color: p.accentText,
    },
  });
