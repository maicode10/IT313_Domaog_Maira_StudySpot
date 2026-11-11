import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import { colors, headerTheme } from "../theme/theme";
import { Booking, StudySpace, User } from "../types";
import { RootStackParamList } from "./types";

import LoginScreen from "../screens/LoginScreen";
import MainTabs from "./MainTabs";
import SpaceDetailsScreen from "../screens/SpaceDetailsScreen";
import BookingScreen from "../screens/BookingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  user: User | null;
  spaces: StudySpace[];
  bookings: Booking[];
  favorites: string[];
  onSignIn: (name: string, section: string) => void;
  onSignOut: () => void;
  onToggleFavorite: (spaceId: string) => void;
  remindersOn: boolean;
  onToggleReminders: (value: boolean) => void;
};

/**
 * F2 - Conditional navigation.
 * Signed out -> only Login is registered.
 * Signed in  -> Main (tabs) + SpaceDetails + Booking (modal).
 * We never navigate by hand between the two halves; changing `user` does it.
 */
export default function RootNavigator({
  user,
  spaces,
  bookings,
  favorites,
  onSignIn,
  onSignOut,
  onToggleFavorite,
  remindersOn,
  onToggleReminders,
}: Props) {
  return (
    <Stack.Navigator screenOptions={headerTheme}>
      {user === null ? (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} onSignIn={onSignIn} />}
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
                onToggleFavorite={onToggleFavorite}
                onSignOut={onSignOut}
                remindersOn={remindersOn}
                onToggleReminders={onToggleReminders}
              />
            )}
          </Stack.Screen>

         <Stack.Screen name="SpaceDetails" options={{ title: "" }}>
            {(props) => <SpaceDetailsScreen {...props} spaces={spaces} />}
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
            {(props) => <BookingScreen {...props} spaces={spaces} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}