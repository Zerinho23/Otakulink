# OtakuLink

Red social premium anime/geek para Chile y LATAM — conoce personas reales con gustos en anime, manga, gaming, cosplay y cultura otaku.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/otakulink run dev` — run the Expo app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo (React Native) with Expo Router
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (future)
- State: AsyncStorage + React Context (MVP)
- Font: Nunito (social/friendly personality)

## Where things live

- `artifacts/otakulink/` — Expo mobile app
- `artifacts/otakulink/app/(tabs)/` — 5 main screens: Feed, Discover, Communities, Voice, Profile
- `artifacts/otakulink/context/AppContext.tsx` — app state (users, posts, communities, voice rooms)
- `artifacts/otakulink/constants/colors.ts` — dark premium theme (purple neon + pink)
- `artifacts/api-server/` — Express API server

## Architecture decisions

- Frontend-only MVP with AsyncStorage — no backend needed for first build
- Dark-only theme (`userInterfaceStyle: "dark"`) — OtakuLink is always dark premium
- Nunito font — friendly, social personality vs Inter which feels too corporate
- 5-tab navigation: Feed / Conocer / Comunidades / Voz / Perfil — covers all core social flows
- NativeTabs with liquid glass on iOS 26+ for premium feel

## Product

OtakuLink is a social platform for anime/geek/gaming fans in Chile and LATAM. Users can:
- Share posts and stories in a social feed (Feed)
- Discover and connect with people by interests/compatibility (Conocer)
- Join anime, gaming, cosplay, and music communities (Comunidades)
- Talk in live voice rooms by category — Anime, Gaming, Karaoke, Rol (Voz)
- Manage their profile with VIP badges, interests, and status (Perfil)

## User preferences

- Spanish-language UI throughout
- Dark premium aesthetic: neon purple (#7c3aed), pink (#ec4899), dark backgrounds
- No emojis in code
- Focused on Chile and LATAM users

## Gotchas

- Use `restart_workflow` to restart Expo — never run `npx expo start` directly
- Font: Nunito (not Inter) — `@expo-google-fonts/nunito` must be installed
- Dark theme only — `userInterfaceStyle: "dark"` in app.json
