import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
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

import { PostCard } from "@/components/PostCard";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const STORIES = [
  { id: "me", name: "Tu historia", avatar: "S", color: "#7c3aed", isMe: true },
  { id: "s1", name: "Ryujin", avatar: "R", color: "#a855f7", isMe: false },
  { id: "s2", name: "Yuki", avatar: "Y", color: "#ec4899", isMe: false },
  { id: "s3", name: "Zero", avatar: "Z", color: "#3b82f6", isMe: false },
  { id: "s4", name: "Miku", avatar: "M", color: "#f59e0b", isMe: false },
  { id: "s5", name: "Luna", avatar: "L", color: "#f472b6", isMe: false },
];

const FILTERS = ["Todo", "Anime", "Gaming", "Cosplay", "Música", "Manga", "Eventos"];

export default function FeedScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { posts, toggleLike } = useApp();
  const [activeFilter, setActiveFilter] = React.useState("Todo");
  const isWeb = Platform.OS === "web";

  const topPad = isWeb ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={posts.length > 0}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={[styles.header, { paddingTop: topPad + 10 }]}>
              <View>
                <Text style={[styles.logo, { color: colors.purplePale }]}>OtakuLink</Text>
                <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Chile · LATAM</Text>
              </View>
              <View style={styles.headerActions}>
                <Pressable style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Ionicons name="search" size={20} color={colors.foreground} />
                </Pressable>
                <Pressable style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Ionicons name="notifications-outline" size={20} color={colors.foreground} />
                  <View style={[styles.notifDot, { backgroundColor: colors.pink }]} />
                </Pressable>
              </View>
            </View>

            {/* Stories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.storiesScroll}
              contentContainerStyle={styles.storiesContent}
            >
              {STORIES.map(story => (
                <Pressable key={story.id} style={styles.storyItem}>
                  <View style={[styles.storyRing, { borderColor: story.isMe ? colors.border : story.color }]}>
                    {story.isMe ? (
                      <View style={[styles.storyAvatar, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }]}>
                        <Ionicons name="add" size={20} color={colors.purplePale} />
                      </View>
                    ) : (
                      <View style={[styles.storyAvatar, { backgroundColor: story.color + "22" }]}>
                        <Text style={[styles.storyAvatarText, { color: story.color }]}>{story.avatar}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.storyName, { color: colors.mutedForeground }]} numberOfLines={1}>
                    {story.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Filters */}
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
                    styles.filterBtn,
                    activeFilter === f
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                  onPress={() => setActiveFilter(f)}
                >
                  <Text style={[
                    styles.filterText,
                    { color: activeFilter === f ? "#fff" : colors.mutedForeground },
                  ]}>{f}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* New Post button */}
            <Pressable style={[styles.newPostBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.smallAvatar, { backgroundColor: colors.primary + "33" }]}>
                <Text style={[styles.smallAvatarText, { color: colors.purplePale }]}>S</Text>
              </View>
              <Text style={[styles.newPostPlaceholder, { color: colors.mutedForeground }]}>
                Comparte algo con la comunidad...
              </Text>
              <Ionicons name="image-outline" size={20} color={colors.mutedForeground} />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard post={item} onLike={() => toggleLike(item.id)} />
        )}
        contentContainerStyle={{ paddingBottom: isWeb ? 34 : 100 }}
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
    paddingBottom: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Nunito_800ExtraBold",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 11, fontFamily: "Nunito_400Regular", marginTop: 1 },
  headerActions: { flexDirection: "row", gap: 8, alignItems: "center" },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notifDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    position: "absolute",
    top: 8,
    right: 8,
  },
  storiesScroll: { marginBottom: 8 },
  storiesContent: { paddingHorizontal: 16, gap: 12 },
  storyItem: { alignItems: "center", gap: 4, width: 60 },
  storyRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  storyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  storyAvatarText: { fontSize: 20, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  storyName: { fontSize: 10, fontFamily: "Nunito_400Regular", textAlign: "center" },
  filtersScroll: { marginBottom: 12 },
  filtersContent: { paddingHorizontal: 16, gap: 8 },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: { fontSize: 12, fontWeight: "600", fontFamily: "Nunito_600SemiBold" },
  newPostBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  smallAvatarText: { fontSize: 14, fontWeight: "800", fontFamily: "Nunito_800ExtraBold" },
  newPostPlaceholder: { flex: 1, fontSize: 13, fontFamily: "Nunito_400Regular" },
});
