import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Post } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

interface Props {
  post: Post;
  onLike: () => void;
}

const AVATAR_COLORS: Record<string, string> = {
  R: "#7c3aed", Y: "#ec4899", Z: "#3b82f6", M: "#f59e0b",
  N: "#10b981", S: "#a855f7", L: "#f472b6", K: "#60a5fa",
  H: "#c084fc",
};

export function PostCard({ post, onLike }: Props) {
  const colors = useColors();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
    onLike();
  };

  const avatarColor = AVATAR_COLORS[post.avatar] ?? colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.avatarWrap, { borderColor: avatarColor }]}>
          <View style={[styles.avatar, { backgroundColor: avatarColor + "33" }]}>
            <Text style={[styles.avatarText, { color: avatarColor }]}>{post.avatar}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.displayName, { color: colors.foreground }]}>{post.displayName}</Text>
            {post.isVip && (
              <View style={[styles.vipBadge, { backgroundColor: colors.primary + "22", borderColor: colors.primary + "66" }]}>
                <MaterialCommunityIcons name="crown" size={9} color={colors.purpleLight} />
                <Text style={[styles.vipText, { color: colors.purpleLight }]}>VIP</Text>
              </View>
            )}
          </View>
          <Text style={[styles.username, { color: colors.mutedForeground }]}>{post.username} · {post.timeAgo}</Text>
        </View>
        <View style={[styles.tagBadge, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
          <Text style={[styles.tagText, { color: colors.purplePale }]}>{post.tag}</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={[styles.content, { color: colors.foreground }]}>{post.content}</Text>

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <Pressable style={styles.actionBtn} onPress={handleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={18}
            color={liked ? colors.pink : colors.mutedForeground}
          />
          <Text style={[styles.actionCount, { color: liked ? colors.pink : colors.mutedForeground }]}>
            {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
          </Text>
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={17} color={colors.mutedForeground} />
          <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{post.comments}</Text>
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Ionicons name="arrow-redo-outline" size={18} color={colors.mutedForeground} />
          <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>{post.shares}</Text>
        </Pressable>

        <Pressable style={styles.actionBtn}>
          <Ionicons name="bookmark-outline" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingBottom: 10,
    gap: 10,
  },
  avatarWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "Nunito_800ExtraBold",
  },
  userInfo: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  displayName: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Nunito_700Bold",
  },
  vipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
  },
  vipText: { fontSize: 9, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  username: { fontSize: 12, marginTop: 1, fontFamily: "Nunito_400Regular" },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  tagText: { fontSize: 10, fontWeight: "700", fontFamily: "Nunito_700Bold" },
  content: {
    fontSize: 14,
    lineHeight: 21,
    paddingHorizontal: 14,
    paddingBottom: 14,
    fontFamily: "Nunito_400Regular",
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionCount: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Nunito_600SemiBold",
  },
});
