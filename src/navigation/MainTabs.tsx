import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { colors, font, Palette } from "../theme/theme";
import { Booking, StudySpace, User } from "../types";
import { TabParamList } from "./types";

import ExploreScreen from "../screens/ExploreScreen";
import MyBookingsScreen from "../screens/MyBookingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<TabParamList>();

type Props = {
  user: User;
  spaces: StudySpace[];
  bookings: Booking[];
  favorites: string[];
  palette: Palette;
  remindersOn: boolean;
  darkMode: boolean;
  liveOccupancy: boolean;
  onToggleFavorite: (spaceId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onToggleReminders: (value: boolean) => void;
  onToggleDarkMode: (value: boolean) => void;
  onToggleLiveOccupancy: (value: boolean) => void;
  onSignOut: () => void;
};

/**
 * F3 - Bottom tabs: Explore, Bookings, Profile.
 * Navy active colour in the light theme, and a badge on Bookings that
 * hides at zero.
 */
export default function MainTabs({
  user,
  spaces,
  bookings,
  favorites,
  palette,
  remindersOn,
  darkMode,
  liveOccupancy,
  onToggleFavorite,
  onCancelBooking,
  onToggleReminders,
  onToggleDarkMode,
  onToggleLiveOccupancy,
  onSignOut,
}: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.tabActive,
        tabBarInactiveTintColor: palette.textFaint,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 86 : 66,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
        },
        tabBarLabelStyle: {
          fontSize: font.tiny,
          fontWeight: "700",
        },
        tabBarBadgeStyle: {
          backgroundColor: colors.violet,
          color: colors.white,
          fontSize: 10,
          fontWeight: "800",
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <ExploreScreen
            {...props}
            spaces={spaces}
            favorites={favorites}
            palette={palette}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Bookings"
        options={{
          // hidden at zero
          tabBarBadge: bookings.length > 0 ? bookings.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <MyBookingsScreen
            {...props}
            bookings={bookings}
            palette={palette}
            onCancelBooking={onCancelBooking}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            user={user}
            palette={palette}
            bookingCount={bookings.length}
            favoriteCount={favorites.length}
            remindersOn={remindersOn}
            darkMode={darkMode}
            liveOccupancy={liveOccupancy}
            onToggleReminders={onToggleReminders}
            onToggleDarkMode={onToggleDarkMode}
            onToggleLiveOccupancy={onToggleLiveOccupancy}
            onSignOut={onSignOut}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
