import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const CATEGORIES = ["Todas", "Anime", "Gaming", "Cosplay", "Música", "Manga"];

export default function CommunitiesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { communities, toggleJoinCommunity } = useApp();
  const [activeCategory, setActiveCategory] = useState("Todas");
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const filtered = activeCategory === "Todas"
    ? communities
    : communities.filter(c => c.category === activeCategory);

  const handleJoin = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleJoinCommunity(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={filtered.length > 0}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={[styles.header, { paddingTop: topPad + 10 }]}>
              <View>
                <Text style={[styles.title, { color: colors.foreground }]}>Comunidades</Text>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Únete a tu fandom</Text>
              </View>
              <Pressable style={[styles.createBtn, { backgroundColor: colors.primary }]}>
                <Ionicons name="add" size={18} color="white" />
                <Text style={styles.createText}>Crear</Text>
              </Pressable>
            </View>

            {/* Search bar */}
            <Pressable style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="search" size={16} color={colors.mutedForeground} />
              <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>Buscar comunidades...</Text>
            </Pressable>

            {/* Category filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContent}
              style={styles.categoriesScroll}
            >
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat}
                  style={[
                    styles.catChip,
                    activeCategory === cat
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.catText, { color: activeCategory === cat ? "#fff" : colors.mutedForeground }]}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Joined section */}
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="star-circle" size={16} color={colors.purplePale} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Tus comunidades</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable style={[styles.communityCard, { backgroundColor: colors.card, borderColor: item.isJoined ? item.color + "44" : colors.border }]}>
            {/* Color accent */}
            <View style={[styles.colorStrip, { backgroundColor: item.color }]} />
            <View style={styles.communityContent}>
              <View style={[styles.communityIcon, { backgroundColor: item.color + "22" }]}>
                <Text style={[styles.communityIconText, { color: item.color }]}>
                  {item.name[0]}
                </Text>
              </View>
              <View style={styles.communityInfo}>
                <Text style={[styles.communityName, { color: colors.foreground }]}>{item.name}</Text>
                <Text style={[styles.communityDesc, { color: colors.mutedForeground }]} numberOfLines={1}>
                  {item.description}
                </Text>
                <View style={styles.communityMeta}>
                  <View style={[styles.catBadge, { backgroundColor: item.color + "18", borderColor: item.color + "40" }]}>
                    <Text style={[styles.catBadgeText, { color: item.color }]}>{item.category}</Text>
                  </View>
                  <Text style={[styles.memberCount, { color: colors.mutedForeground }]}>
                    <Ionicons name="people-outline" size={11} /> {(item.members / 1000).toFixed(1)}k miembros
                  </Text>
                </View>
              </View>
              <Pressable
                style={[
                  styles.joinBtn,
                  item.isJoined
                    ? { backgroundColor: colors.surface, borderColor: colors.border }
                    : { backgroundColor: item.color, borderColor: item.color },
                ]}
                onPress={() => handleJoin(item.id)}
              >
                <Text style={[styles.joinText, { color: item.isJoined ? colors.mutedForeground : "#fff" }]}>
                  {item.isJoined ? "Salir" : "Unirse"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 : 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
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
    paddingBottom: 14,
  },
  title: { fontSize: 24, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  subtitle: { fontSize: 12, fontFamily: "Nunito_400Regular", marginTop: 2 },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  createText: { color: "#fff", fontSize: 13, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchPlaceholder: { fontSize: 13, fontFamily: "Nunito_400Regular" },
  categoriesScroll: { marginBottom: 14 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  communityCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
  },
  colorStrip: { width: 4 },
  communityContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  communityIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  communityIconText: { fontSize: 20, fontWeight: "900", fontFamily: "Nunito_800ExtraBold" },
  communityInfo: { flex: 1 },
  communityName: { fontSize: 14, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  communityDesc: { fontSize: 12, fontFamily: "Nunito_400Regular", marginTop: 2 },
  communityMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 },
  catBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  catBadgeText: { fontSize: 9, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  memberCount: { fontSize: 11, fontFamily: "Nunito_400Regular" },
  joinBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  joinText: { fontSize: 12, fontWeight: "700", fontFamily: "Nunito_700Bold" },
});
