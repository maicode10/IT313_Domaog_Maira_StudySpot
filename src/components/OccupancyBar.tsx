import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { font, Palette, spacing } from "../theme/theme";
import { occupancyColor, occupancyLabel } from "../utils/occupancy";

type Props = {
  percent: number;
  palette: Palette;
  showLabel?: boolean;
  height?: number;
};

/**
 * A thin bar that fills from left to right. The width and the colour both
 * come from the percent we were given, so nothing here is hard-coded.
 */
export default function OccupancyBar({
  percent,
  palette,
  showLabel = true,
  height = 7,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const safe = Math.min(Math.max(percent, 0), 100);
  const barColor = occupancyColor(safe);

  return (
    <View style={styles.row}>
      <View style={[styles.track, { height, borderRadius: height }]}>
        {/* width and backgroundColor change at runtime -> inline is correct */}
        <View
          style={[
            styles.fill,
            { width: `${safe}%`, backgroundColor: barColor, borderRadius: height },
          ]}
        />
      </View>

      {showLabel && (
        <Text style={[styles.label, { color: barColor }]} numberOfLines={1}>
          {safe}% · {occupancyLabel(safe)}
        </Text>
      )}
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    track: {
      flex: 1,
      backgroundColor: p.accentSoft,
      overflow: "hidden",
    },
    fill: {
      height: "100%",
    },
    label: {
      fontSize: font.tiny,
      fontWeight: "700",
      minWidth: 92,
      textAlign: "right",
    },
  });
