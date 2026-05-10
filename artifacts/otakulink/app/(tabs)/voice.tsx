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

const CATEGORIES = ["Todas", "Anime", "Gaming", "Música", "Karaoke", "Rol", "Chill"];

const CATEGORY_ICONS: Record<string, string> = {
  Anime: "play-circle",
  Gaming: "game-controller",
  Música: "musical-notes",
  Karaoke: "mic",
  Rol: "dice",
  Chill: "leaf",
  Todas: "grid",
};

export default function VoiceScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { voiceRooms } = useApp();
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const filtered = activeCategory === "Todas"
    ? voiceRooms
    : voiceRooms.filter(r => r.category === activeCategory);

  const handleJoinRoom = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveRoom(prev => prev === id ? null : id);
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
                <Text style={[styles.title, { color: colors.foreground }]}>Salas de Voz</Text>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Habla en tiempo real</Text>
              </View>
              <Pressable style={[styles.createBtn, { backgroundColor: colors.primary }]}>
                <Ionicons name="add" size={18} color="white" />
                <Text style={styles.createText}>Nueva sala</Text>
              </Pressable>
            </View>

            {/* Active room banner */}
            {activeRoom && (
              <Pressable
                style={[styles.activeBanner, { backgroundColor: colors.primary + "22", borderColor: colors.primary + "66" }]}
                onPress={() => setActiveRoom(null)}
              >
                <View style={styles.activeBannerLeft}>
                  <View style={styles.micDot} />
                  <Text style={[styles.activeBannerText, { color: colors.purplePale }]}>
                    Conectado — toca para salir
                  </Text>
                </View>
                <Ionicons name="close-circle" size={20} color={colors.purplePale} />
              </Pressable>
            )}

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
                  <Ionicons
                    name={(CATEGORY_ICONS[cat] ?? "grid") as any}
                    size={12}
                    color={activeCategory === cat ? "#fff" : colors.mutedForeground}
                  />
                  <Text style={[styles.catText, { color: activeCategory === cat ? "#fff" : colors.mutedForeground }]}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
              <View style={styles.liveDot} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>En vivo ahora</Text>
              <Text style={[styles.liveCount, { color: colors.mutedForeground }]}>{voiceRooms.filter(r => r.isLive).length} salas activas</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const isJoined = activeRoom === item.id;
          const fillPct = item.participants / item.maxParticipants;
          return (
            <Pressable
              style={[
                styles.roomCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isJoined ? colors.primary + "66" : colors.border,
                  borderWidth: isJoined ? 1.5 : 1,
                },
              ]}
              onPress={() => handleJoinRoom(item.id)}
            >
              <View style={styles.roomHeader}>
                <View style={styles.roomLeft}>
                  {item.isLive ? (
                    <View style={[styles.livePill, { backgroundColor: "#ef4444" + "22", borderColor: "#ef4444" + "55" }]}>
                      <View style={styles.liveRedDot} />
                      <Text style={styles.liveText}>EN VIVO</Text>
                    </View>
                  ) : (
                    <View style={[styles.livePill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                      <Text style={[styles.liveText, { color: colors.mutedForeground }]}>PRÓXIMAMENTE</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.catPill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Ionicons name={(CATEGORY_ICONS[item.category] ?? "grid") as any} size={11} color={colors.mutedForeground} />
                  <Text style={[styles.catPillText, { color: colors.mutedForeground }]}>{item.category}</Text>
                </View>
              </View>

              <Text style={[styles.roomName, { color: colors.foreground }]}>{item.name}</Text>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {item.tags.map(tag => (
                  <View key={tag} style={[styles.tag, { backgroundColor: colors.primary + "14", borderColor: colors.primary + "33" }]}>
                    <Text style={[styles.tagText, { color: colors.purplePale }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Host + participants */}
              <View style={styles.roomMeta}>
                <View style={styles.hostRow}>
                  <View style={[styles.hostAvatar, { backgroundColor: colors.primary + "33" }]}>
                    <Text style={[styles.hostAvatarText, { color: colors.purplePale }]}>{item.hostAvatar}</Text>
                  </View>
                  <Text style={[styles.hostName, { color: colors.mutedForeground }]}>
                    Host: <Text style={{ color: colors.foreground, fontFamily: "Nunito_700Bold" }}>{item.host}</Text>
                  </Text>
                </View>

                <View style={styles.participantsRight}>
                  <Text style={[styles.participantCount, { color: colors.mutedForeground }]}>
                    {item.participants}/{item.maxParticipants}
                  </Text>
                  <Ionicons name="people" size={14} color={colors.mutedForeground} />
                </View>
              </View>

              {/* Participant bar */}
              <View style={[styles.participantBar, { backgroundColor: colors.surface }]}>
                <View style={[styles.participantFill, {
                  backgroundColor: fillPct > 0.8 ? colors.pink : colors.primary,
                  width: `${fillPct * 100}%` as any,
                }]} />
              </View>

              {/* Join button */}
              <Pressable
                style={[
                  styles.joinBtn,
                  isJoined
                    ? { backgroundColor: colors.surface, borderColor: colors.border }
                    : { backgroundColor: colors.primary },
                ]}
                onPress={() => handleJoinRoom(item.id)}
              >
                <Ionicons
                  name={isJoined ? "mic-off" : "mic"}
                  size={16}
                  color={isJoined ? colors.mutedForeground : "#fff"}
                />
                <Text style={[styles.joinText, { color: isJoined ? colors.mutedForeground : "#fff" }]}>
                  {isJoined ? "Salir de sala" : "Unirse a la sala"}
                </Text>
              </Pressable>
            </Pressable>
          );
        }}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 : 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
  activeBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  activeBannerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  micDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#22c55e" },
  activeBannerText: { fontSize: 13, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  categoriesScroll: { marginBottom: 14 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" },
  sectionTitle: { fontSize: 15, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  liveCount: { fontSize: 12, fontFamily: "Nunito_400Regular", marginLeft: 4 },
  roomCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  roomHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  roomLeft: { flexDirection: "row", alignItems: "center" },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  liveRedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#ef4444" },
  liveText: { fontSize: 9, fontWeight: "800", color: "#ef4444", fontFamily: "Nunito_800ExtraBold", letterSpacing: 0.5 },
  catPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  catPillText: { fontSize: 11, fontFamily: "Nunito_600SemiBold", fontWeight: "600" },
  roomName: { fontSize: 16, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagText: { fontSize: 11, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  roomMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  hostRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  hostAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  hostAvatarText: { fontSize: 12, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  hostName: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  participantsRight: { flexDirection: "row", alignItems: "center", gap: 4 },
  participantCount: { fontSize: 12, fontFamily: "Nunito_600SemiBold", fontWeight: "600" },
  participantBar: { height: 4, borderRadius: 2, overflow: "hidden" },
  participantFill: { height: "100%", borderRadius: 2 },
  joinBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  joinText: { fontSize: 14, fontWeight: "700", fontFamily: "Nunito_700Bold" },
});
