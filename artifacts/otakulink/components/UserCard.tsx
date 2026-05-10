import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { User } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

const BANNER_COLORS: Record<string, [string, string]> = {
  purple: ["#7c3aed", "#4c1d95"],
  pink: ["#ec4899", "#9d174d"],
  blue: ["#3b82f6", "#1e3a8a"],
  teal: ["#14b8a6", "#134e4a"],
};

const AVATAR_COLORS: Record<string, string> = {
  L: "#ec4899", K: "#3b82f6", H: "#a855f7", S: "#14b8a6",
};

const STATUS_LABELS: Record<string, string> = {
  friends: "Busca amigos",
  chat: "Quiere chatear",
  community: "Busca comunidad",
  relationship: "Busca pareja",
};

interface Props {
  user: User;
  onLike: () => void;
  onPass: () => void;
}

export function UserCard({ user, onLike, onPass }: Props) {
  const colors = useColors();
  const [bannerStart, bannerEnd] = BANNER_COLORS[user.banner] ?? ["#7c3aed", "#4c1d95"];
  const avatarColor = AVATAR_COLORS[user.avatar[0]] ?? colors.primary;

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLike();
  };

  const handlePass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPass();
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: bannerStart }]}>
        <View style={[styles.bannerOverlay, { backgroundColor: bannerEnd + "88" }]} />
        {user.isOnline && (
          <View style={[styles.onlineBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.onlineDot} />
            <Text style={[styles.onlineText, { color: "#22c55e" }]}>En línea</Text>
          </View>
        )}
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={[styles.avatarOuter, { borderColor: colors.card, backgroundColor: colors.card }]}>
          <View style={[styles.avatar, { backgroundColor: avatarColor + "33", borderColor: avatarColor + "66", borderWidth: 1.5 }]}>
            <Text style={[styles.avatarText, { color: avatarColor }]}>{user.avatar[0]}</Text>
          </View>
        </View>
        <View style={styles.badges}>
          {user.isVip && (
            <View style={[styles.badge, { backgroundColor: colors.primary + "22", borderColor: colors.primary + "55" }]}>
              <Text style={[styles.badgeText, { color: colors.purplePale }]}>VIP</Text>
            </View>
          )}
          {user.isVerified && (
            <View style={[styles.badge, { backgroundColor: "#3b82f6" + "22", borderColor: "#3b82f6" + "55" }]}>
              <Ionicons name="checkmark-circle" size={11} color="#60a5fa" />
              <Text style={[styles.badgeText, { color: "#60a5fa" }]}>Verificado</Text>
            </View>
          )}
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.displayName, { color: colors.foreground }]}>{user.displayName}</Text>
        <Text style={[styles.username, { color: colors.mutedForeground }]}>{user.username}</Text>
        <Text style={[styles.location, { color: colors.mutedForeground }]}>
          <Ionicons name="location-outline" size={12} /> {user.city}, {user.country}
        </Text>

        <View style={[styles.statusPill, { backgroundColor: colors.pink + "18", borderColor: colors.pink + "44" }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.pink }]} />
          <Text style={[styles.statusText, { color: colors.pinkLight }]}>{STATUS_LABELS[user.status]}</Text>
        </View>

        <Text style={[styles.bio, { color: colors.foreground + "cc" }]}>{user.bio}</Text>

        {/* Interests */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
          {user.interests.map(tag => (
            <View key={tag} style={[styles.interestTag, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
              <Text style={[styles.interestText, { color: colors.purplePale }]}>{tag}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Animes */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Animes favoritos</Text>
          <View style={styles.tagsRow}>
            {user.animes.slice(0, 3).map(a => (
              <View key={a} style={[styles.miniTag, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Text style={[styles.miniTagText, { color: colors.foreground }]}>{a}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <Pressable style={[styles.passBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={handlePass}>
          <Ionicons name="close" size={26} color={colors.mutedForeground} />
        </Pressable>
        <Pressable style={[styles.msgBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <Ionicons name="chatbubble-ellipses" size={20} color={colors.purplePale} />
        </Pressable>
        <Pressable style={[styles.likeBtn, { backgroundColor: colors.pink }]} onPress={handleLike}>
          <Ionicons name="heart" size={26} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    width: width - 32,
  },
  banner: { height: 100, position: "relative" },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  onlineBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#22c55e" },
  onlineText: { fontSize: 11, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  avatarSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: -30,
  },
  avatarOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 26, fontWeight: "900", fontFamily: "Nunito_800ExtraBold" },
  badges: { flexDirection: "row", gap: 6, paddingBottom: 8 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: { fontSize: 9, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  info: { padding: 16, gap: 6 },
  displayName: { fontSize: 20, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  username: { fontSize: 13, fontFamily: "Nunito_400Regular", marginTop: -2 },
  location: { fontSize: 12, fontFamily: "Nunito_400Regular" },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 2,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  bio: { fontSize: 13, lineHeight: 19, fontFamily: "Nunito_400Regular", marginTop: 4 },
  tagsScroll: { marginTop: 6, marginHorizontal: -16, paddingLeft: 16 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  interestTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 6,
  },
  interestText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  section: { marginTop: 6 },
  sectionLabel: { fontSize: 11, fontWeight: "600", fontFamily: "Nunito_600SemiBold", marginBottom: 5 },
  miniTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniTagText: { fontSize: 11, fontFamily: "Nunito_400Regular" },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  passBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  msgBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  likeBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
});
