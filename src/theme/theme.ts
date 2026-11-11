import { Platform, TextStyle, ViewStyle } from "react-native";

// ---------------------------------------------------------------------------
// One place for every colour, space and radius in the app.
// Navy #1A1751 stays the header / active-tab colour (required).
// Violet is the accent that sits on top of it.
// ---------------------------------------------------------------------------

export const colors = {
  // brand
  navy: "#1A1751",
  navyDeep: "#12103A",
  navySoft: "#2A2470",

  // violet accent family
  violet: "#6C4CE0",
  violetDark: "#5636C6",
  violetMid: "#8C6BF0",
  violetSoft: "#EDE7FE",
  violetTint: "#F7F4FF",

  // highlight (best match banner, avatar)
  gold: "#E9A93C",
  goldSoft: "#FFF5E2",

  // occupancy
  green: "#2FA86B",
  greenSoft: "#E6F6EE",
  amber: "#E0982C",
  amberSoft: "#FDF2DF",
  red: "#DC5450",
  redSoft: "#FCEBEA",

  // favourite
  heart: "#E2527F",

  // neutrals
  bg: "#F6F4FC",
  surface: "#FFFFFF",
  surfaceAlt: "#FBFAFF",
  border: "#E8E3F6",
  borderStrong: "#D6CEEE",

  text: "#1C1936",
  textMuted: "#6E6889",
  textFaint: "#9C96B2",
  white: "#FFFFFF",
  disabled: "#EFECF7",

  // hero (the navy block at the top of every screen)
  heroGlowA: "rgba(140, 107, 240, 0.55)",
  heroGlowB: "rgba(108, 76, 224, 0.38)",
  heroGlowC: "rgba(233, 169, 60, 0.22)",
  onNavy: "#FFFFFF",
  onNavyMuted: "rgba(255, 255, 255, 0.66)",
  onNavyFaint: "rgba(255, 255, 255, 0.4)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 26,
  pill: 999,
};

export const font = {
  display: 28,
  h1: 22,
  h2: 18,
  h3: 16,
  body: 15,
  small: 13,
  tiny: 11,
};

/** Small all-caps label used above sections and fields. */
export const labelStyle: TextStyle = {
  fontSize: font.tiny,
  fontWeight: "700",
  letterSpacing: 1.1,
  textTransform: "uppercase",
  color: colors.textFaint,
};

// F11 asks for at least one platform-specific style. Cards use a soft
// violet-tinted shadow on iOS and elevation on Android.
export const shadow = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#2E1C7A",
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 3 },
    default: {},
  }) as ViewStyle,

  raised: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#2E1C7A",
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 6 },
    default: {},
  }) as ViewStyle,
};

/** Shared header look for every native-stack navigator. */
export const headerTheme = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: "700" as const, fontSize: font.h2 },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.bg },
};

/**
 * The light panel that slides up over the navy hero.
 * Every screen puts its content inside this, right under <ScreenHero />.
 */
export const sheet: ViewStyle = {
  flex: 1,
  backgroundColor: colors.bg,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: -24,
  overflow: "hidden",
};