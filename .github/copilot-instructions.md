<!-- .github/copilot-instructions.md -->
# Repo guide for AI coding agents

This file contains the essential, discoverable facts that help an AI agent be immediately productive in this codebase.

- Project type: Expo React Native app (TypeScript) using expo-router (file-based routing) and nativewind for styling.
- Project style: functional components with hooks, Tailwind CSS via nativewind, modular services and contexts. This is a Workout app where both Students and Trainers can use to manage their workouts and sessions. The style should be like Strava or Nike Training Club.
- Backend: The endpoints called by this app are RESTful and can be found in openapi/openapi.json.
- Entry points: `App.tsx` (expo dev client + router entry) and the `app/` directory (routes).
- Package scripts: use `npm install`, `npx expo start` (or `npm run start`), `npm run android|ios|web`. Linting: `npm run lint`.

Key architecture and patterns
- Routing: pages/components are under `app/` (file-based). Initial navigation logic and auth gating live in `app/_layout.tsx` and `app/index.tsx` — update these when changing onboarding/login redirects.
- Contexts: `contexts/AuthContext.tsx` and `contexts/RegisterContext.tsx` hold session and registration flows. Use `useAuth()` and `useRegister()` to interact with auth state.
- Services: `services/api.ts` exposes a single axios instance (`api`) configured with:
  - baseURL selected by platform (mobile uses LOCAL_IP constant, web uses localhost)
  - request interceptor that reads tokens from `utils/secureStore.ts` and sets `Authorization` header
  - response interceptor that attempts refresh via POST `${API_BASE_URL}/auth/refresh-token` on 401, saves new tokens and retries the original request
- Storage: `utils/secureStore.ts` uses `expo-secure-store` on native and `@react-native-async-storage/async-storage` on web. Token keys: `accessToken`, `refreshToken`.
- Registration flow: `RegisterProvider.setDetails` and `registerUser` call `/users/register`, may call `/trainers` for trainers, then call `/auth/login` and save tokens using `saveTokens`.
- Error messages: `i18n/messages.ts` maps backend message keys to Portuguese strings. When surfacing server errors, prefer using `translateErrorMessage` for end-user text.

Important developer notes / gotchas
- Local backend URL: `services/api.ts` hardcodes `LOCAL_IP = "192.168.0.8"` and `PORT = 8090`. For mobile testing on a device ensure this IP is reachable or update `LOCAL_IP` to your machine's LAN IP, or use Expo's tunnel. Web uses `http://localhost:8090` so CORS on backend must allow it.
- Token refresh contract: the refresh endpoint is expected to return `{ accessToken, refreshToken }`. If refresh fails the code calls `clearTokens()` and components rely on redirects to `/login`.
- Platform-specific storage: on web tokens are stored with AsyncStorage (multiGet/multiSet), on native with SecureStore. Keep that in mind when reproducing session bugs on web vs device.
- Network protocol: axios uses plain HTTP in development. If you need HTTPS or a proxy, update `services/api.ts` accordingly.

Where to edit for common tasks
- Add new screens/routes: create files under `app/` (see `app/onboarding` and `app/(auth)` folders for examples).
- Change initial auth logic or onboarding: edit `app/_layout.tsx` and `app/index.tsx`.
- Change API behavior (timeouts, headers): edit `services/api.ts` — token handling and refresh logic live here.
- Change secure storage behavior or token keys: edit `utils/secureStore.ts` and update imports across `services/*` and `contexts/*`.

Quick code examples (use these exact imports)
- API: `import { api } from "@/services/api";` then `await api.post('/auth/login', { email, password })`.
- Tokens: `import { saveTokens, getTokens, clearTokens } from "@/utils/secureStore"`.
- Contexts: `import { useAuth } from "@/contexts/AuthContext"` and `import { useRegister } from "@/contexts/RegisterContext"`.

Search hints
- To find auth-related code: search for `saveTokens`, `getTokens`, `_retry`, or `/auth/refresh-token`.
- To find registration: search for `users/register` or `registerUser`.

Tests / CI
- This repository currently has no test suite or CI configs in the repo root. Focus on manual testing via Expo (`npx expo start`) and device/emulator runs.

If you need anything missing from code discovery (env files, backend contract docs, or dev machine IP), ask the developer and they will provide it. After making any network-related change, run the app with the matching Expo client (web/device) and verify token flows by logging in and hitting protected endpoints.

---
If any section is unclear or you want more examples (component structure, naming conventions for Tailwind classes, or where translations live), tell me which part to expand.
