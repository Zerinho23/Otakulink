import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { UserCard } from "@/components/UserCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const FILTERS = ["Todos", "Chile", "LATAM", "Amistad", "Gaming", "Cosplay"];

export default function DiscoverScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { discoverUsers } = useApp();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const currentUser = discoverUsers[currentIndex % discoverUsers.length];

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentIndex(i => i + 1);
  };

  const handlePass = () => {
    setCurrentIndex(i => i + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>Conocer</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Personas con gustos similares</Text>
        </View>
        <Pressable style={[styles.filterBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="options-outline" size={20} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        style={styles.filtersScroll}
      >
        {FILTERS.map(f => (
          <Pressable
            key={f}
            style={[
              styles.chip,
              activeFilter === f
                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                : { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.chipText, { color: activeFilter === f ? "#fff" : colors.mutedForeground }]}>
              {f}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Card stack visual indicator */}
      <View style={styles.stackIndicator}>
        <Text style={[styles.stackText, { color: colors.mutedForeground }]}>
          {discoverUsers.length - (currentIndex % discoverUsers.length)} personas cerca de ti
        </Text>
        <View style={styles.dots}>
          {discoverUsers.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex % discoverUsers.length
                    ? colors.primary
                    : colors.border,
                  width: i === currentIndex % discoverUsers.length ? 16 : 6,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* User Card */}
      <ScrollView
        contentContainerStyle={[styles.cardArea, { paddingBottom: isWeb ? 34 : 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {currentUser && (
          <UserCard
            user={currentUser}
            onLike={handleLike}
            onPass={handlePass}
          />
        )}

        {/* Compatibility score */}
        <View style={[styles.compatCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.compatLabel, { color: colors.mutedForeground }]}>Compatibilidad de afinidad</Text>
          <View style={styles.compatRow}>
            <View style={[styles.compatBar, { backgroundColor: colors.surface }]}>
              <View style={[styles.compatFill, { backgroundColor: colors.primary, width: "82%" }]} />
            </View>
            <Text style={[styles.compatPct, { color: colors.purplePale }]}>82%</Text>
          </View>
          <View style={styles.sharedInterests}>
            {["Anime", "Gaming", "Chile"].map(tag => (
              <View key={tag} style={[styles.sharedTag, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
                <Ionicons name="checkmark-circle" size={11} color={colors.purplePale} />
                <Text style={[styles.sharedTagText, { color: colors.purplePale }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: { fontSize: 24, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  subtitle: { fontSize: 12, fontFamily: "Nunito_400Regular", marginTop: 2 },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filtersScroll: { marginBottom: 10 },
  filtersContent: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  stackIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  stackText: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  dots: { flexDirection: "row", gap: 4, alignItems: "center" },
  dot: { height: 6, borderRadius: 3 },
  cardArea: { alignItems: "center", paddingHorizontal: 16, gap: 12 },
  compatCard: {
    width: "100%",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    marginTop: 4,
  },
  compatLabel: { fontSize: 12, fontFamily: "Nunito_600SemiBold", fontWeight: "600" },
  compatRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  compatBar: { flex: 1, height: 6, borderRadius: 4, overflow: "hidden" },
  compatFill: { height: "100%", borderRadius: 4 },
  compatPct: { fontSize: 14, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  sharedInterests: { flexDirection: "row", gap: 8 },
  sharedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  sharedTagText: { fontSize: 11, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
});
