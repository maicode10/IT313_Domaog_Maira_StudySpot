import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import { colors, headerTheme, Palette } from "../theme/theme";
import { Booking, StudySpace, User } from "../types";
import { RootStackParamList } from "./types";

import LoginScreen from "../screens/LoginScreen";
import MainTabs from "./MainTabs";
import SpaceDetailsScreen from "../screens/SpaceDetailsScreen";
import BookingScreen from "../screens/BookingScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  user: User | null;
  spaces: StudySpace[];
  bookings: Booking[];
  favorites: string[];
  palette: Palette;
  remindersOn: boolean;
  darkMode: boolean;
  liveOccupancy: boolean;
  onSignIn: (name: string, section: string) => void;
  onSignOut: () => void;
  onSaveProfile: (name: string, section: string) => void;
  onToggleFavorite: (spaceId: string) => void;
  onConfirmBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onToggleReminders: (value: boolean) => void;
  onToggleDarkMode: (value: boolean) => void;
  onToggleLiveOccupancy: (value: boolean) => void;
};

/**
 * F2 - Conditional navigation.
 * Signed out -> only Login is registered.
 * Signed in  -> Main (tabs) + SpaceDetails + Booking + EditProfile (modals).
 * We never navigate by hand between the two halves; changing `user` does it.
 */
export default function RootNavigator({
  user,
  spaces,
  bookings,
  favorites,
  palette,
  remindersOn,
  darkMode,
  liveOccupancy,
  onSignIn,
  onSignOut,
  onSaveProfile,
  onToggleFavorite,
  onConfirmBooking,
  onCancelBooking,
  onToggleReminders,
  onToggleDarkMode,
  onToggleLiveOccupancy,
}: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...headerTheme,
        contentStyle: { backgroundColor: palette.bg },
      }}
    >
      {user === null ? (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} palette={palette} onSignIn={onSignIn} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => (
              <MainTabs
                user={user}
                spaces={spaces}
                bookings={bookings}
                favorites={favorites}
                palette={palette}
                remindersOn={remindersOn}
                darkMode={darkMode}
                liveOccupancy={liveOccupancy}
                onToggleFavorite={onToggleFavorite}
                onCancelBooking={onCancelBooking}
                onToggleReminders={onToggleReminders}
                onToggleDarkMode={onToggleDarkMode}
                onToggleLiveOccupancy={onToggleLiveOccupancy}
                onSignOut={onSignOut}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="SpaceDetails" options={{ title: "" }}>
            {(props) => (
              <SpaceDetailsScreen
                {...props}
                spaces={spaces}
                favorites={favorites}
                palette={palette}
                onToggleFavorite={onToggleFavorite}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Booking"
            options={({ navigation }) => ({
              presentation: "modal",
              title: "Book Space",
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                  <Ionicons name="close" size={24} color={colors.white} />
                </Pressable>
              ),
            })}
          >
            {(props) => (
              <BookingScreen
                {...props}
                spaces={spaces}
                bookings={bookings}
                palette={palette}
                onConfirmBooking={onConfirmBooking}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="EditProfile"
            options={({ navigation }) => ({
              presentation: "modal",
              title: "Edit Profile",
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
                  <Ionicons name="close" size={24} color={colors.white} />
                </Pressable>
              ),
            })}
          >
            {(props) => (
              <EditProfileScreen
                {...props}
                user={user}
                palette={palette}
                onSaveProfile={onSaveProfile}
              />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}
