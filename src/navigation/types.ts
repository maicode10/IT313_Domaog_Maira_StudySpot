import type { NavigatorScreenParams, CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// ---------------------------------------------------------------------------
// F13 - Typed navigation.
// Route params live here. Notice SpaceDetails and Booking only carry an id,
// never the whole StudySpace object.
// ---------------------------------------------------------------------------

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<TabParamList> | undefined;
  SpaceDetails: { spaceId: string };
  /** slot is optional: tapping a block on the day strip preselects it. */
  Booking: { spaceId: string; slot?: string };
  EditProfile: undefined;
};

export type TabParamList = {
  Explore: undefined;
  Bookings: undefined;
  Profile: undefined;
};

/** Props for a screen that sits directly in the root stack. */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Props for a screen inside the bottom tabs.
 * "Composite" means: it can also navigate to root-stack screens
 * (for example Explore -> SpaceDetails).
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

// Makes useNavigation() typed everywhere without extra generics.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}