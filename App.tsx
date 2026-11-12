import React, { useCallback, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "./src/navigation/RootNavigator";
import { spaces as initialSpaces } from "./src/data/spaces";
import { colors } from "./src/theme/theme";
import { Booking, StudySpace, User } from "./src/types";

// ---------------------------------------------------------------------------
// F12 - Shared state lives here, in App, and is passed down as props.
// No Context, no Redux. Screens never import the data file directly.
// ---------------------------------------------------------------------------

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.navy,
    card: colors.navy,
    text: colors.white,
    border: "transparent",
    primary: colors.violet,
  },
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [spaces, setSpaces] = useState<StudySpace[]>(initialSpaces);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [remindersOn, setRemindersOn] = useState(true);

  const handleSignIn = useCallback((name: string, section: string) => {
    setUser({ name, section });
  }, []);

  const handleSignOut = useCallback(() => {
    setUser(null);
    setBookings([]);
    setFavorites([]);
    setSpaces(initialSpaces);
  }, []);

  const handleSaveProfile = useCallback((name: string, section: string) => {
    setUser({ name, section });
  }, []);

  const handleToggleFavorite = useCallback((spaceId: string) => {
    setFavorites((current) =>
      current.includes(spaceId)
        ? current.filter((id) => id !== spaceId)
        : [...current, spaceId]
    );
  }, []);

  const handleConfirmBooking = useCallback((booking: Booking) => {
    setBookings((current) => [booking, ...current]);

    // the slot is taken now, so mark it on the space as well
    setSpaces((current) =>
      current.map((space) =>
        space.id === booking.spaceId
          ? { ...space, bookedSlots: [...space.bookedSlots, booking.slot] }
          : space
      )
    );
  }, []);

  const handleCancelBooking = useCallback((bookingId: string) => {
    setBookings((current) => {
      const target = current.find((b) => b.id === bookingId);

      if (target) {
        // free the slot again
        setSpaces((all) =>
          all.map((space) =>
            space.id === target.spaceId
              ? {
                  ...space,
                  bookedSlots: space.bookedSlots.filter((s) => s !== target.slot),
                }
              : space
          )
        );
      }

      return current.filter((b) => b.id !== bookingId);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <RootNavigator
          user={user}
          spaces={spaces}
          bookings={bookings}
          favorites={favorites}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onSaveProfile={handleSaveProfile}
          onToggleFavorite={handleToggleFavorite}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          remindersOn={remindersOn}
          onToggleReminders={setRemindersOn}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}