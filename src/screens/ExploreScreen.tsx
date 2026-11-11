import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenHero from "../components/ScreenHero";
import SpaceCard from "../components/SpaceCard";
import { colors, font, sheet, spacing } from "../theme/theme";
import { StudySpace } from "../types";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Explore"> & {
  spaces: StudySpace[];
  favorites: string[];
  onToggleFavorite: (spaceId: string) => void;
};

/**
 * Explore - milestone 1 version.
 * A plain list for now. Sections, search and filters come with Module 8.
 */
export default function ExploreScreen({
  navigation,
  spaces,
  favorites,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.navyTop}>
        <ScreenHero
          title="Explore"
          subtitle={`${spaces.length} study spaces across campus`}
        />
      </SafeAreaView>

      <View style={sheet}>
        <FlatList
          data={spaces}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          ListHeaderComponent={<Text style={styles.sectionLabel}>All spaces</Text>}
          renderItem={({ item }) => (
            <SpaceCard
              space={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => navigation.navigate("SpaceDetails", { spaceId: item.id })}
              onToggleFavorite={() => onToggleFavorite(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  navyTop: { backgroundColor: colors.navy },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  sectionLabel: {
    fontSize: font.tiny,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.textFaint,
    marginBottom: spacing.md,
  },
});