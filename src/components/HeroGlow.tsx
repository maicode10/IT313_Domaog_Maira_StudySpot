import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors, radius } from "../theme/theme";

type OrbProps = {
  size: number;
  color: string;
  /** opacity of ONE layer; they stack, so keep it small */
  strength?: number;
  layers?: number;
  style?: ViewStyle;
};

/**
 * A soft bloom of light, with no gradient library.
 *
 * One translucent circle has a hard edge. Several concentric circles at a
 * low opacity each stack up: the alpha adds together toward the middle and
 * thins out at the rim, which is what a real glow does.
 */
function GlowOrb({ size, color, strength = 0.05, layers = 9, style }: OrbProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.orb,
        { width: size, height: size },
        style,
      ]}
    >
      {Array.from({ length: layers }).map((_, i) => {
        const layerSize = size * (1 - i / layers);

        return (
          <View
            key={i}
            style={{
              position: "absolute",
              width: layerSize,
              height: layerSize,
              borderRadius: layerSize / 2,
              backgroundColor: color,
              opacity: strength,
            }}
          />
        );
      })}
    </View>
  );
}

type Props = {
  /** "hero" for the band at the top of a screen, "screen" for full-page */
  variant?: "hero" | "screen";
};

/** The lighting behind every navy area. */
export default function HeroGlow({ variant = "hero" }: Props) {
  const big = variant === "screen";

  return (
    <View pointerEvents="none" style={styles.layer}>
      <GlowOrb
        size={big ? 420 : 300}
        color={colors.violetMid}
        strength={big ? 0.055 : 0.05}
        layers={10}
        style={{ top: big ? -190 : -150, right: big ? -150 : -110 }}
      />

      <GlowOrb
        size={big ? 320 : 230}
        color={colors.violet}
        strength={0.045}
        layers={9}
        style={{ bottom: big ? -120 : -140, left: big ? -140 : -90 }}
      />

      {/* one hairline ring, so the light has something to sit against */}
      <View
        style={[
          styles.ring,
          big
            ? { width: 260, height: 260, borderRadius: radius.pill, top: 60, left: -70 }
            : { width: 190, height: 190, borderRadius: radius.pill, top: -60, left: 30 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
});