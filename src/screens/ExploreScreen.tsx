import React, { useCallback, useMemo, useState } from "react";
import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import EmptyState from "../components/EmptyState";
import FilterChip from "../components/FilterChip";
import ScreenHero from "../components/ScreenHero";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import SpaceCard from "../components/SpaceCard";
import { colors, font, sheet, spacing } from "../theme/theme";
import { FILTERS, FilterKey, StudySpace } from "../types";
import { clockLabel, hasOpenSlot } from "../utils/occupancy";
import { TabScreenProps } from "../navigation/types";

type Props = TabScreenProps<"Explore"> & {
  spaces: StudySpace[];
  favorites: string[];
  onToggleFavorite: (spaceId: string) => void;
};

/** Width at which the list switches to two columns (F11). */
const WIDE_BREAKPOINT = 600;

/** Cuts a list into rows: [a,b,c] with size 2 becomes [[a,b],[c]] */
function chunk(items: StudySpace[], size: number): StudySpace[][] {
  if (size <= 1) return items.map((item) => [item]);

  const rows: StudySpace[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

/**
 * F4 / F5 / F6 / F11 - Explore.
 *
 * SectionList grouped by building, a search box and filter chips that apply
 * together, pull to refresh, a time that also updates on focus, and a layout
 * that goes to two columns on a wide screen.
 */
export default function ExploreScreen({
  navigation,
  spaces,
  favorites,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date());

  // F11 - the only thing that changes is how many cards fit on a row.
  const { width } = useWindowDimensions();
  const numColumns = width >= WIDE_BREAKPOINT ? 2 : 1;

  // F6 - the time also updates every time this tab regains focus.
  useFocusEffect(
    useCallback(() => {
      setLastRefreshed(new Date());
    }, [])
  );

  // F6 - pull down to refresh.
  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setLastRefreshed(new Date());
      setRefreshing(false);
    }, 700);
  }, []);

  // 1. search and chip applied together (F5)
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return spaces.filter((space) => {
      const matchesQuery =
        q.length === 0 ||
        space.name.toLowerCase().includes(q) ||
        space.building.toLowerCase().includes(q);

      const matchesFilter =
        filter === "All" ||
        (filter === "Quiet" && space.type === "Quiet") ||
        (filter === "Group" && space.type === "Group") ||
        (filter === "Open now" && hasOpenSlot(space));

      return matchesQuery && matchesFilter;
    });
  }, [spaces, query, filter]);

  // 2. group what is left by building, then into rows (F4 + F11)
  const sections = useMemo(() => {
    const byBuilding = new Map<string, StudySpace[]>();

    visible.forEach((space) => {
      const list = byBuilding.get(space.building) ?? [];
      list.push(space);
      byBuilding.set(space.building, list);
    });

    return Array.from(byBuilding, ([title, list]) => ({
      title,
      count: list.length,
      data: chunk(list, numColumns),
    }));
  }, [visible, numColumns]);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.navyTop}>
        <ScreenHero
          title="Explore"
          subtitle={`${visible.length} of ${spaces.length} spaces shown`}
        >
          <View style={styles.controls}>
            <SearchBar value={query} onChangeText={setQuery} />

            <View style={styles.chipRow}>
              {FILTERS.map((key) => (
                <FilterChip
                  key={key}
                  label={key}
                  active={filter === key}
                  onPress={() => setFilter(key)}
                />
              ))}
            </View>
          </View>
        </ScreenHero>
      </SafeAreaView>

      <View style={sheet}>
        <SectionList
          sections={sections}
          keyExtractor={(row) => row.map((space) => space.id).join("+")}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.violet}
              colors={[colors.violet]}
            />
          }
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} count={section.count} />
          )}
          renderItem={({ item: row }) => (
            <View style={styles.row}>
              {row.map((space) => (
                <View key={space.id} style={styles.cell}>
                  <SpaceCard
                    space={space}
                    isFavorite={favorites.includes(space.id)}
                    onPress={() =>
                      navigation.navigate("SpaceDetails", { spaceId: space.id })
                    }
                    onToggleFavorite={() => onToggleFavorite(space.id)}
                  />
                </View>
              ))}

              {/* keeps a lone last card from stretching across both columns */}
              {row.length < numColumns && <View style={styles.cell} />}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title="No spaces match your search."
              message="Try another word, or switch back to the All filter."
            />
          }
          ListFooterComponent={
            <Text style={styles.refreshed}>
              Last refreshed {clockLabel(lastRefreshed)} · pull down to refresh
            </Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  navyTop: { backgroundColor: colors.navy },
  controls: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  cell: {
    flex: 1,
    minWidth: 0, // lets long names shrink instead of widening the card
  },
  refreshed: {
    fontSize: font.tiny,
    color: colors.textFaint,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});