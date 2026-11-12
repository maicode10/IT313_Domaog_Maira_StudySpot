import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { font, Palette } from "../theme/theme";
import { occupancyColor } from "../utils/occupancy";

type Props = {
  percent: number;
  palette: Palette;
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
  palette,
  size = 54,
  stroke = 6,
  holeColor,
}: Props) {
  const styles = useMemo(() => createStyles(palette), [palette]);

  const safe = Math.min(Math.max(Math.round(percent), 0), 100);
  const color = occupancyColor(safe);
  const hole = holeColor ?? palette.surface;

  const half = size / 2;
  const holeSize = size - stroke * 2;

  // 50% of the ring is 180 degrees, so one percent is 3.6 degrees.
  const firstSweep = Math.min(safe, 50) * 3.6;
  const secondSweep = Math.max(safe - 50, 0) * 3.6;
  const pastHalf = safe > 50;

  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: half },
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
            width: holeSize,
            height: holeSize,
            borderRadius: holeSize / 2,
            backgroundColor: hole,
          },
        ]}
      >
        <Text style={[styles.value, { color, fontSize: size * 0.28 }]}>{safe}</Text>
        <Text style={[styles.unit, { color }]}>%</Text>
      </View>
    </View>
  );
}

const createStyles = (p: Palette) =>
  StyleSheet.create({
    ring: {
      overflow: "hidden",
      backgroundColor: p.accentSoft,
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
