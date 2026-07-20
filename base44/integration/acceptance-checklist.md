# Acceptance Checklist — VYRO Full Supabase Wiring

## Phase 1 — Authentication and Identity
- [ ] Login/signup screens preserved
- [ ] After login, `supabase.auth.setSession` called with access + refresh tokens
- [ ] `vyro_refresh_my_backend` called after login
- [ ] `vyro_get_my_identity` called after login
- [ ] `vyro_get_my_profile_identity` called after login
- [ ] No user role/balance/VIP/KYC/permission stored as authoritative browser state
- [ ] Logout clears Supabase session, tokens, React Query cache, realtime channels

## Phase 2 — Replace Legacy Data Access
- [ ] `base44.entities.*` reads replaced with RLS table or canonical read RPC
- [ ] `base44.entities.*` creates/updates/deletes replaced with canonical RPCs
- [ ] `base44.entities.*.subscribe` replaced with global realtime invalidation
- [ ] Mapped `base44.functions.invoke` calls replaced with `backendGateway` methods
- [ ] Only approved temporary bridges remain: supabaseAuth, supabaseConfig, uploadFile, aiTools, aiSafetyMonitor

## Phase 3 — Mandatory Core Flows
- [ ] Signup → identity/profile/wallet/default dashboard provisioning
- [ ] Profile read/update/media
- [ ] Home feed, party rooms, live rooms, room join/leave/start/end, seats, chat, moderation
- [ ] Gifts → atomic wallet debit/credit → transaction → commission → realtime room/UI update
- [ ] Wallet history, recharge intent/completion, withdrawal request/review
- [ ] VIP plans, purchase/upgrade/renew/reward/expiry
- [ ] Social follow/friend/block/invite, community posts/comments/likes/saves/reports
- [ ] Private chat/messages/read state/reactions/calls
- [ ] Role applications and dashboard access
- [ ] All dashboard pages (User, Host, Agent, Agency, Country Manager, Admin, Super Admin, SAM, AO)
- [ ] Notifications, tasks, rewards, levels, mall/inventory/equipment, security and verification

## Phase 4 — Realtime
- [ ] Subscribe only to tables in `canonical-contract.json.realtime_tables`
- [ ] On events, invalidate only mapped query keys
- [ ] Reconnect after token refresh, online recovery, and tab foreground
- [ ] No duplicate channels or duplicate event handling
- [ ] No dependency on realtime for correctness; refetch after every mutation

## Phase 5 — Verification
- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds with 0 errors
- [ ] `npm run lint` — 0 critical errors in changed files
- [ ] `base44.entities` authoritative usages = 0
- [ ] Unapproved `base44.functions.invoke` usages = 0
- [ ] Service role/browser secret usages = 0
- [ ] Mock/demo/fake data used by production screens = 0
- [ ] Per-page realtime subscriptions = 0
- [ ] `BASE44_EXECUTION_RESULT.md` created with verified evidence