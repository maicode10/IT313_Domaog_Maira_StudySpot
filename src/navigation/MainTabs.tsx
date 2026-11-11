import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { colors, font } from "../theme/theme";
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
  onToggleFavorite: (spaceId: string) => void;
  onSignOut: () => void;
  remindersOn: boolean;
  onToggleReminders: (value: boolean) => void;
};

/**
 * F3 - Bottom tabs: Explore, Bookings, Profile.
 * Navy active colour, and a badge on Bookings that hides at zero.
 */
export default function MainTabs({
  user,
  spaces,
  bookings,
  favorites,
  onToggleFavorite,
  onSignOut,
  remindersOn,
  onToggleReminders,
}: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 86 : 64,
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
        {(props) => <MyBookingsScreen {...props} bookings={bookings} />}
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
            bookingCount={bookings.length}
            favoriteCount={favorites.length}
            remindersOn={remindersOn}
            onToggleReminders={onToggleReminders}
            onSignOut={onSignOut}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}