import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  country: string;
  city: string;
  status: "friends" | "chat" | "community" | "relationship";
  interests: string[];
  animes: string[];
  games: string[];
  isVip: boolean;
  isVerified: boolean;
  followers: number;
  following: number;
  isOnline: boolean;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  isVip: boolean;
  content: string;
  tag: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  timeAgo: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  isJoined: boolean;
  color: string;
}

export interface VoiceRoom {
  id: string;
  name: string;
  category: string;
  participants: number;
  maxParticipants: number;
  host: string;
  hostAvatar: string;
  isLive: boolean;
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timeAgo: string;
  isMe: boolean;
}

const MOCK_CURRENT_USER: User = {
  id: "me",
  username: "@sakura_cl",
  displayName: "Sakura",
  avatar: "S",
  banner: "purple",
  bio: "Fan de Jujutsu Kaisen y Genshin Impact. Cosplayer amateur. 🎮✨",
  country: "Chile",
  city: "Santiago",
  status: "friends",
  interests: ["Anime", "Cosplay", "Gaming", "J-Pop"],
  animes: ["Jujutsu Kaisen", "Attack on Titan", "Demon Slayer"],
  games: ["Genshin Impact", "Honkai Star Rail", "Valorant"],
  isVip: true,
  isVerified: true,
  followers: 1248,
  following: 432,
  isOnline: true,
};

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    userId: "u1",
    username: "@ryujin_mx",
    displayName: "Ryujin",
    avatar: "R",
    isVip: true,
    content: "¡Acabo de terminar Jujutsu Kaisen S2 y no puedo creer el final! Toji es simplemente un personaje brutal. ¿Alguien quiere hablar de esto sin spoilers? 👁️",
    tag: "JJK",
    likes: 284,
    comments: 47,
    shares: 12,
    isLiked: false,
    timeAgo: "2m",
  },
  {
    id: "2",
    userId: "u2",
    username: "@yuki_chile",
    displayName: "Yuki Chan",
    avatar: "Y",
    isVip: false,
    content: "Mi cosplay de Makima de Chainsaw Man para la AnimeX Santiago 2026 🔥 ¿Qué les parece? Se aceptan críticas constructivas!",
    tag: "Cosplay",
    likes: 912,
    comments: 103,
    shares: 67,
    isLiked: true,
    timeAgo: "15m",
  },
  {
    id: "3",
    userId: "u3",
    username: "@zero_arg",
    displayName: "ZeroTwo ARG",
    avatar: "Z",
    isVip: true,
    content: "Honkai Star Rail 2.7 acaba de dropearse y el lore de Firefly me tiene en el piso. Juego perfecto, historia perfecta. Las ilustraciones este parche son una obra de arte 🌟",
    tag: "Gaming",
    likes: 541,
    comments: 88,
    shares: 34,
    isLiked: false,
    timeAgo: "1h",
  },
  {
    id: "4",
    userId: "u4",
    username: "@miku_latam",
    displayName: "Miku LATAM",
    avatar: "M",
    isVip: false,
    content: "Les comparto mi playlist de J-Pop para estudiar o relajarse. Yoasobi, Ado, Kenshi Yonezu y más. Si quieren el link me avisan 🎵",
    tag: "Música",
    likes: 367,
    comments: 62,
    shares: 89,
    isLiked: false,
    timeAgo: "3h",
  },
  {
    id: "5",
    userId: "u5",
    username: "@rin_col",
    displayName: "Rin Nakamura",
    avatar: "N",
    isVip: false,
    content: "Buscando personas de Medellín o Colombia que quieran armar un grupo de estudio de japonés. Nivel principiante-intermedio. Sin experiencia previa también es válido!",
    tag: "Comunidad",
    likes: 156,
    comments: 91,
    shares: 23,
    isLiked: false,
    timeAgo: "5h",
  },
];

const MOCK_DISCOVER_USERS: User[] = [
  {
    id: "d1",
    username: "@luna_anime",
    displayName: "Luna",
    avatar: "L",
    banner: "pink",
    bio: "Amante del shoujo y el café. Fan de Fruits Basket y Violet Evergarden.",
    country: "Chile",
    city: "Valparaíso",
    status: "friends",
    interests: ["Anime", "Manga", "Café", "Dibujo"],
    animes: ["Fruits Basket", "Violet Evergarden", "Your Lie in April"],
    games: ["Animal Crossing", "Stardew Valley"],
    isVip: false,
    isVerified: false,
    followers: 234,
    following: 187,
    isOnline: true,
  },
  {
    id: "d2",
    username: "@kai_peru",
    displayName: "Kai",
    avatar: "K",
    banner: "blue",
    bio: "Gamer competitivo y fan del isekai. Juego Valorant y League. Busco amigos para rankear.",
    country: "Perú",
    city: "Lima",
    status: "chat",
    interests: ["Gaming", "Isekai", "Esports"],
    animes: ["Re:Zero", "Sword Art Online", "Overlord"],
    games: ["Valorant", "League of Legends", "Genshin Impact"],
    isVip: true,
    isVerified: false,
    followers: 891,
    following: 312,
    isOnline: false,
  },
  {
    id: "d3",
    username: "@hana_co",
    displayName: "Hana",
    avatar: "H",
    banner: "purple",
    bio: "Cosplayer profesional de Bogotá. Especialidad en trajes de Demon Slayer y MHA.",
    country: "Colombia",
    city: "Bogotá",
    status: "community",
    interests: ["Cosplay", "Arte", "Anime", "Fotografía"],
    animes: ["Demon Slayer", "My Hero Academia", "Fullmetal Alchemist"],
    games: ["Final Fantasy", "Persona 5"],
    isVip: true,
    isVerified: true,
    followers: 4520,
    following: 234,
    isOnline: true,
  },
  {
    id: "d4",
    username: "@sora_mx",
    displayName: "Sora",
    avatar: "S",
    banner: "teal",
    bio: "Fan del K-Pop y anime. BTS + Demon Slayer = mi vida. De Ciudad de México.",
    country: "México",
    city: "CDMX",
    status: "relationship",
    interests: ["K-Pop", "Anime", "Baile", "Fotografía"],
    animes: ["Demon Slayer", "Haikyuu", "Spy x Family"],
    games: ["Genshin Impact", "Honkai Star Rail"],
    isVip: false,
    isVerified: false,
    followers: 567,
    following: 423,
    isOnline: true,
  },
];

const MOCK_COMMUNITIES: Community[] = [
  { id: "c1", name: "Jujutsu Kaisen LATAM", description: "La comunidad más activa de JJK en español", category: "Anime", members: 12840, isJoined: true, color: "#7c3aed" },
  { id: "c2", name: "Cosplay Chile", description: "Cosplayers chilenos compartiendo su arte", category: "Cosplay", members: 8920, isJoined: false, color: "#ec4899" },
  { id: "c3", name: "Genshin LATAM", description: "Tips, builds y lore de Genshin Impact", category: "Gaming", members: 45230, isJoined: true, color: "#3b82f6" },
  { id: "c4", name: "J-Pop & K-Pop Fan Club", description: "Música japonesa y coreana sin límites", category: "Música", members: 23100, isJoined: false, color: "#f59e0b" },
  { id: "c5", name: "Manga Readers CL", description: "Spoilers y discusión de los mejores mangas", category: "Manga", members: 6780, isJoined: false, color: "#10b981" },
  { id: "c6", name: "Honkai Star Rail", description: "Pulls, meta y lore de HSR", category: "Gaming", members: 31450, isJoined: true, color: "#8b5cf6" },
];

const MOCK_VOICE_ROOMS: VoiceRoom[] = [
  { id: "v1", name: "JJK Debate — ¿Gojo o Sukuna?", category: "Anime", participants: 12, maxParticipants: 20, host: "Ryujin", hostAvatar: "R", isLive: true, tags: ["JJK", "Debate", "Spoilers"] },
  { id: "v2", name: "Chill LoFi Anime 🎵", category: "Música", participants: 34, maxParticipants: 50, host: "Yuki Chan", hostAvatar: "Y", isLive: true, tags: ["LoFi", "Chill", "Relajarse"] },
  { id: "v3", name: "Genshin Abyss Help!", category: "Gaming", participants: 8, maxParticipants: 15, host: "Zero ARG", hostAvatar: "Z", isLive: true, tags: ["Genshin", "Ayuda", "Abyss"] },
  { id: "v4", name: "Karaoke Anime Songs 🎤", category: "Karaoke", participants: 21, maxParticipants: 30, host: "Miku LATAM", hostAvatar: "M", isLive: true, tags: ["Karaoke", "Openings", "Anime"] },
  { id: "v5", name: "Rol — Mundo Ninja", category: "Rol", participants: 6, maxParticipants: 10, host: "Rin Col", hostAvatar: "N", isLive: false, tags: ["Naruto", "Rol", "Aventura"] },
];

interface AppContextType {
  currentUser: User;
  posts: Post[];
  discoverUsers: User[];
  communities: Community[];
  voiceRooms: VoiceRoom[];
  toggleLike: (postId: string) => void;
  toggleJoinCommunity: (communityId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(prev =>
      prev.map(c =>
        c.id === communityId
          ? { ...c, isJoined: !c.isJoined, members: c.isJoined ? c.members - 1 : c.members + 1 }
          : c
      )
    );
  };

  return (
    <AppContext.Provider value={{
      currentUser: MOCK_CURRENT_USER,
      posts,
      discoverUsers: MOCK_DISCOVER_USERS,
      communities,
      voiceRooms: MOCK_VOICE_ROOMS,
      toggleLike,
      toggleJoinCommunity,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
