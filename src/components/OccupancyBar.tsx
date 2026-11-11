import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, spacing } from "../theme/theme";
import { occupancyColor, occupancyLabel } from "../utils/occupancy";

type Props = {
  percent: number;
  showLabel?: boolean;
  height?: number;
};

/**
 * A thin bar that fills from left to right. The width and the colour both
 * come from the percent we were given, so nothing here is hard-coded.
 */
export default function OccupancyBar({ percent, showLabel = true, height = 7 }: Props) {
  const safe = Math.min(Math.max(percent, 0), 100);
  const barColor = occupancyColor(safe);

  return (
    <View style={styles.row}>
      <View style={[styles.track, { height, borderRadius: height }]}>
        {/* width and backgroundColor change at runtime -> inline style is fine */}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  track: {
    flex: 1,
    backgroundColor: colors.violetSoft,
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