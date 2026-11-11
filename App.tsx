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
  const [spaces] = useState<StudySpace[]>(initialSpaces);
  const [bookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [remindersOn, setRemindersOn] = useState(true);

  const handleSignIn = useCallback((name: string, section: string) => {
    setUser({ name, section });
  }, []);

  const handleSignOut = useCallback(() => {
    setUser(null);
    setFavorites([]);
  }, []);

  const handleToggleFavorite = useCallback((spaceId: string) => {
    setFavorites((current) =>
      current.includes(spaceId)
        ? current.filter((id) => id !== spaceId)
        : [...current, spaceId]
    );
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
          onToggleFavorite={handleToggleFavorite}
          remindersOn={remindersOn}
          onToggleReminders={setRemindersOn}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}