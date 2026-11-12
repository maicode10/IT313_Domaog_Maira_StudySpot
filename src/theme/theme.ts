import { Platform, ViewStyle } from "react-native";

// ---------------------------------------------------------------------------
// StudySpot theme.
//
// Two things live here:
//
//   1. `colors` - accents that look the same in BOTH themes. Navy, violet,
//      and the occupancy green/amber/red. These never flip.
//
//   2. `Palette` - the surface and text colours that DO flip between light
//      and dark. App owns which one is active and passes it down as a prop,
//      because Context and state libraries are not allowed in this task.
//
// Layout values (spacing, radius, font, shadow) never change with the theme,
// so they stay as plain exports.
// ---------------------------------------------------------------------------

export const colors = {
  // brand - identical in both themes
  navy: "#1A1751",
  navyDeep: "#12103A",

  violet: "#6C4CE0",
  violetDark: "#5636C6",
  violetMid: "#8C6BF0",

  gold: "#E9A93C",

  // occupancy
  green: "#2FA86B",
  amber: "#E0982C",
  red: "#DC5450",

  heart: "#E2527F",
  white: "#FFFFFF",

  // text that sits on the navy hero
  onNavy: "#FFFFFF",
  onNavyMuted: "rgba(255, 255, 255, 0.66)",
  onNavyFaint: "rgba(255, 255, 255, 0.4)",
};

/** Every colour that changes between light and dark. */
export type Palette = {
  isDark: boolean;

  bg: string;
  surface: string;
  surfaceAlt: string;
  field: string;

  border: string;
  borderStrong: string;

  text: string;
  textMuted: string;
  textFaint: string;

  accentSoft: string;
  accentTint: string;
  accentText: string;

  disabled: string;

  okSoft: string;
  warnSoft: string;
  badSoft: string;

  goldSoft: string;
  goldBorder: string;
  goldText: string;

  dangerBorder: string;

  tabActive: string;
};

export const lightPalette: Palette = {
  isDark: false,

  bg: "#F6F4FC",
  surface: "#FFFFFF",
  surfaceAlt: "#FBFAFF",
  field: "#F7F4FF",

  border: "#E8E3F6",
  borderStrong: "#D6CEEE",

  text: "#1C1936",
  textMuted: "#6E6889",
  textFaint: "#9C96B2",

  accentSoft: "#EDE7FE",
  accentTint: "#F7F4FF",
  accentText: "#5636C6",

  disabled: "#EFECF7",

  okSoft: "#E6F6EE",
  warnSoft: "#FDF2DF",
  badSoft: "#FCEBEA",

  goldSoft: "#FFF5E2",
  goldBorder: "#F4DCA9",
  goldText: "#A0761B",

  dangerBorder: "#F3C9C8",

  // navy active tab, to match the wireframes
  tabActive: "#1A1751",
};

export const darkPalette: Palette = {
  isDark: true,

  bg: "#100E24",
  surface: "#1A1738",
  surfaceAlt: "#201C44",
  field: "#232048",

  border: "#2C2758",
  borderStrong: "#3B3573",

  text: "#F2F0FB",
  textMuted: "#A9A3C6",
  textFaint: "#7B75A2",

  accentSoft: "#2A2459",
  accentTint: "#221E48",
  accentText: "#BBA9FF",

  disabled: "#262152",

  okSoft: "#14352A",
  warnSoft: "#3A2C12",
  badSoft: "#3A1E1E",

  goldSoft: "#332810",
  goldBorder: "#5C4818",
  goldText: "#EBC57C",

  dangerBorder: "#5E2F2E",

  // navy would vanish against a dark bar, so the accent takes over
  tabActive: "#BBA9FF",
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

/** Header look for the native stack. Navy in both themes. */
export const headerTheme = {
  headerStyle: { backgroundColor: colors.navy },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: "700" as const, fontSize: font.h2 },
  headerShadowVisible: false,
};

/** The panel that slides up over the navy hero. */
export function sheetStyle(p: Palette): ViewStyle {
  return {
    flex: 1,
    backgroundColor: p.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    overflow: "hidden",
  };
}
