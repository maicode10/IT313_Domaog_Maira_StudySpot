import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font } from "../theme/theme";
import { occupancyColor } from "../utils/occupancy";

type Props = {
  percent: number;
  size?: number;
  stroke?: number;
  /** colour showing through the middle of the ring */
  holeColor?: string;
};

/**
 * A ring that fills clockwise with the occupancy percentage.
 *
 * How it works without any chart library: a half-disc is parked outside a
 * clipping box, then rotated around the centre of the ring so it sweeps into
 * view. One half-disc covers 0-50%, a second one covers 50-100%. A smaller
 * circle on top punches out the middle and turns the pie into a ring.
 */
export default function OccupancyRing({
  percent,
  size = 54,
  stroke = 6,
  holeColor = colors.surface,
}: Props) {
  const safe = Math.min(Math.max(Math.round(percent), 0), 100);
  const color = occupancyColor(safe);

  const half = size / 2;
  const hole = size - stroke * 2;

  // 50% of the ring is 180 degrees, so one percent is 3.6 degrees.
  const firstSweep = Math.min(safe, 50) * 3.6;
  const secondSweep = Math.max(safe - 50, 0) * 3.6;
  const pastHalf = safe > 50;

  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: half, backgroundColor: colors.violetSoft },
      ]}
    >
      {/* right half: holds the first 50% */}
      <View style={[styles.clip, { left: half, width: half, height: size }]}>
        {pastHalf ? (
          <View
            style={{
              width: half,
              height: size,
              backgroundColor: color,
              borderTopRightRadius: half,
              borderBottomRightRadius: half,
            }}
          />
        ) : (
          <View
            style={{
              position: "absolute",
              left: -half,
              top: 0,
              width: half,
              height: size,
              backgroundColor: color,
              borderTopLeftRadius: half,
              borderBottomLeftRadius: half,
              transformOrigin: "right center",
              transform: [{ rotate: `${firstSweep}deg` }],
            }}
          />
        )}
      </View>

      {/* left half: only needed once we pass 50% */}
      {pastHalf && (
        <View style={[styles.clip, { left: 0, width: half, height: size }]}>
          <View
            style={{
              position: "absolute",
              left: half,
              top: 0,
              width: half,
              height: size,
              backgroundColor: color,
              borderTopRightRadius: half,
              borderBottomRightRadius: half,
              transformOrigin: "left center",
              transform: [{ rotate: `${secondSweep}deg` }],
            }}
          />
        </View>
      )}

      {/* punches the hole so the pie becomes a ring */}
      <View
        style={[
          styles.hole,
          {
            top: stroke,
            left: stroke,
            width: hole,
            height: hole,
            borderRadius: hole / 2,
            backgroundColor: holeColor,
          },
        ]}
      >
        <Text style={[styles.value, { color, fontSize: size * 0.28 }]}>{safe}</Text>
        <Text style={[styles.unit, { color }]}>%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    overflow: "hidden",
  },
  clip: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
  },
  hole: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  unit: {
    fontSize: font.tiny,
    fontWeight: "700",
    marginTop: 2,
  },
});