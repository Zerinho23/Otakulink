import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const STATS = [
  { label: "Seguidores", key: "followers" },
  { label: "Siguiendo", key: "following" },
  { label: "Posts", value: 47 },
];

const MENU_ITEMS = [
  { icon: "bookmark-outline", label: "Guardados", color: "#a855f7" },
  { icon: "people-outline", label: "Amigos", color: "#3b82f6" },
  { icon: "shield-checkmark-outline", label: "Privacidad", color: "#10b981" },
  { icon: "notifications-outline", label: "Notificaciones", color: "#f59e0b" },
  { icon: "settings-outline", label: "Configuración", color: "#6b7280" },
  { icon: "help-circle-outline", label: "Soporte", color: "#60a5fa" },
];

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<"posts" | "likes" | "media">("posts");
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;

  const EMPTY_POSTS = [
    { id: "1", tag: "JJK", content: "Mi anime favorito del momento 🔥", likes: 128, timeAgo: "2d" },
    { id: "2", tag: "Gaming", content: "Llegué a Aventurero V en Genshin ✨", likes: 94, timeAgo: "5d" },
    { id: "3", tag: "Cosplay", content: "Preparando mi cosplay para la con de julio!", likes: 213, timeAgo: "1w" },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: isWeb ? 34 : 100 }}
    >
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: colors.primary, paddingTop: topPad }]}>
        <View style={styles.bannerGradient} />
        <View style={styles.bannerActions}>
          <Pressable style={[styles.bannerBtn, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
            <Ionicons name="share-outline" size={18} color="white" />
          </Pressable>
          <Pressable style={[styles.bannerBtn, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
            <Ionicons name="ellipsis-horizontal" size={18} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Profile header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
        <View style={styles.avatarRow}>
          <View style={[styles.avatarOuter, { borderColor: colors.card, backgroundColor: colors.card }]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + "33", borderColor: colors.primary, borderWidth: 2 }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>{currentUser.avatar[0]}</Text>
            </View>
            {currentUser.isOnline && <View style={[styles.onlineDot, { borderColor: colors.card }]} />}
          </View>
          <View style={styles.editBtnArea}>
            {currentUser.isVip && (
              <View style={[styles.vipBadge, { backgroundColor: colors.primary + "22", borderColor: colors.primary + "55" }]}>
                <MaterialCommunityIcons name="crown" size={12} color={colors.purplePale} />
                <Text style={[styles.vipText, { color: colors.purplePale }]}>VIP</Text>
              </View>
            )}
            <Pressable style={[styles.editBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="pencil" size={14} color={colors.foreground} />
              <Text style={[styles.editBtnText, { color: colors.foreground }]}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>

        <Text style={[styles.displayName, { color: colors.foreground }]}>{currentUser.displayName}</Text>
        <Text style={[styles.username, { color: colors.mutedForeground }]}>{currentUser.username}</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color={colors.mutedForeground} />
          <Text style={[styles.location, { color: colors.mutedForeground }]}>{currentUser.city}, {currentUser.country}</Text>
          {currentUser.isVerified && (
            <Ionicons name="checkmark-circle" size={13} color="#3b82f6" />
          )}
        </View>

        <Text style={[styles.bio, { color: colors.foreground + "cc" }]}>{currentUser.bio}</Text>

        {/* Status */}
        <View style={[styles.statusPill, { backgroundColor: colors.pink + "18", borderColor: colors.pink + "44" }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.pink }]} />
          <Text style={[styles.statusText, { color: colors.pinkLight }]}>Buscando amistades</Text>
        </View>

        {/* Stats */}
        <View style={[styles.statsRow, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.foreground }]}>
                {stat.key === "followers" ? currentUser.followers.toLocaleString()
                  : stat.key === "following" ? currentUser.following
                  : stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Intereses</Text>
          <View style={styles.tagsRow}>
            {currentUser.interests.map(tag => (
              <View key={tag} style={[styles.interestTag, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
                <Text style={[styles.interestText, { color: colors.purplePale }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Animes */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Animes favoritos</Text>
          <View style={styles.tagsRow}>
            {currentUser.animes.map(a => (
              <View key={a} style={[styles.animeTag, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Text style={[styles.animeTagText, { color: colors.foreground }]}>{a}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Content tabs */}
      <View style={[styles.tabRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {(["posts", "likes", "media"] as const).map(tab => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && { borderBottomColor: colors.primary }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.mutedForeground }]}>
              {tab === "posts" ? "Posts" : tab === "likes" ? "Me gusta" : "Media"}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Posts */}
      <View style={{ gap: 8, marginTop: 10, paddingHorizontal: 16 }}>
        {EMPTY_POSTS.map(post => (
          <View key={post.id} style={[styles.miniPost, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.miniTag, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
              <Text style={[styles.miniTagText, { color: colors.purplePale }]}>{post.tag}</Text>
            </View>
            <Text style={[styles.miniContent, { color: colors.foreground }]}>{post.content}</Text>
            <View style={styles.miniMeta}>
              <Ionicons name="heart" size={13} color={colors.pink} />
              <Text style={[styles.miniMetaText, { color: colors.mutedForeground }]}>{post.likes}</Text>
              <Text style={[styles.miniMetaText, { color: colors.mutedForeground }]}>· {post.timeAgo}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View style={[styles.menuSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {MENU_ITEMS.map((item, i) => (
          <Pressable
            key={item.label}
            style={[
              styles.menuItem,
              i < MENU_ITEMS.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 },
            ]}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + "22" }]}>
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <Text style={[styles.menuLabel, { color: colors.foreground }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { height: 120, position: "relative", overflow: "hidden" },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  bannerActions: {
    position: "absolute",
    top: 0,
    right: 16,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 12,
    gap: 8,
  },
  bannerBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  profileHeader: { padding: 16, gap: 6 },
  avatarRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: -44 },
  avatarOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 30, fontWeight: "900", fontFamily: "Nunito_800ExtraBold" },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22c55e",
    borderWidth: 2,
  },
  editBtnArea: { gap: 6, alignItems: "flex-end" },
  vipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  vipText: { fontSize: 10, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  editBtnText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  displayName: { fontSize: 22, fontWeight: "900", fontFamily: "Nunito_800ExtraBold", marginTop: 6 },
  username: { fontSize: 13, fontFamily: "Nunito_400Regular" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  location: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  bio: { fontSize: 13, lineHeight: 19, fontFamily: "Nunito_400Regular", marginTop: 4 },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 12,
    marginHorizontal: -16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "900", fontFamily: "Nunito_800ExtraBold" },
  statLabel: { fontSize: 11, fontFamily: "Nunito_400Regular", marginTop: 2 },
  section: { marginTop: 12 },
  sectionLabel: { fontSize: 11, fontWeight: "600", fontFamily: "Nunito_600SemiBold", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  interestTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  interestText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  animeTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  animeTagText: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: { fontSize: 13, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  miniPost: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  miniTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniTagText: { fontSize: 10, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  miniContent: { fontSize: 13, fontFamily: "Nunito_400Regular" },
  miniMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  miniMetaText: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  menuSection: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
});
