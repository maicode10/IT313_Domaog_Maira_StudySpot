import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "./src/navigation/RootNavigator";
import { spaces as initialSpaces } from "./src/data/spaces";
import { colors, darkPalette, lightPalette } from "./src/theme/theme";
import { Booking, StudySpace, User } from "./src/types";
import { nudgeOccupancy } from "./src/utils/occupancy";

// ---------------------------------------------------------------------------
// F12 - Shared state lives here, in App, and is passed down as props.
// No Context, no Redux. Screens never import the data file directly.
//
// Dark mode works the same way: App owns the `darkMode` flag, picks the
// matching palette, and hands that palette down. Every component builds its
// StyleSheet from the palette it is given.
// ---------------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [spaces, setSpaces] = useState<StudySpace[]>(initialSpaces);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [remindersOn, setRemindersOn] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [liveOccupancy, setLiveOccupancy] = useState(true);

  // Enhancement - simulated live occupancy.
  // While the app is open the seat counts drift, so the bars, the colours
  // and the Best Match banner all move on their own. The interval is torn
  // down when the effect re-runs or App unmounts, so no timer leaks.
  useEffect(() => {
    if (!liveOccupancy) return;

    const timer = setInterval(() => {
      setSpaces((current) => current.map((space) => nudgeOccupancy(space)));
    }, 5000);

    return () => clearInterval(timer);
  }, [liveOccupancy]);

  const palette = darkMode ? darkPalette : lightPalette;

  // the navigation container needs its own theme so screen transitions
  // do not flash the wrong background
  const navTheme = useMemo(
    () => ({
      ...DefaultTheme,
      dark: darkMode,
      colors: {
        ...DefaultTheme.colors,
        background: colors.navy,
        card: colors.navy,
        text: colors.white,
        border: "transparent",
        primary: colors.violet,
      },
    }),
    [darkMode]
  );

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
          palette={palette}
          remindersOn={remindersOn}
          darkMode={darkMode}
          liveOccupancy={liveOccupancy}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onSaveProfile={handleSaveProfile}
          onToggleFavorite={handleToggleFavorite}
          onConfirmBooking={handleConfirmBooking}
          onCancelBooking={handleCancelBooking}
          onToggleReminders={setRemindersOn}
          onToggleDarkMode={setDarkMode}
          onToggleLiveOccupancy={setLiveOccupancy}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
