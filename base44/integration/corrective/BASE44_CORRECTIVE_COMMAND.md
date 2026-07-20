# BASE44 CORRECTIVE EXECUTION COMMAND — VYRO

The previous migration is NOT complete. Do not trust the existing BASE44_EXECUTION_RESULT.md completion claim.

Execute this corrective pass against the uploaded project and the existing Supabase project `zohtjywggezadhqwfzrh`.

## Mandatory rules

1. Do not create duplicate tables, RPCs, entities, storage, identity systems, dashboard systems, wallets, or mock/demo fallback data.
2. Inspect the actual Supabase schema and RPC signatures before changing code.
3. Use the signed-in Supabase JWT only. Never expose service-role credentials in the browser.
4. Every frontend option, tab, category, card, button, form, action, filter, chart and realtime event must use existing canonical Supabase data.

## Fix all remaining legacy access

- Remove every remaining `base44.entities` reference and every Base44 entity subscription.
- Replace all 119 `base44.functions.invoke` calls except only truly unavoidable infrastructure bridges. Business-domain bridges are NOT approved.
- Remove demo-mode success fallbacks, hardcoded dashboard statistics and static production records.

## Correct backendGateway

For every RPC call, use the exact PostgreSQL parameter names beginning with `p_` and the exact required value types. Do not guess.

At minimum correct these areas:
- profile/public profile
- wallet history, recharge, transfer, withdrawal
- live room create/join/leave/start/close, seats, moderation, gifts and chat
- community feed, posts, comments, reports, groups and post gifts
- roles/apply center/review
- notifications, tasks/rewards, mall, security and support
- all manager dashboards and actions

## Correct invalid table mappings

The following frontend table names do not exist in the backend and must be remapped to existing canonical tables or RPCs, not created as duplicates:

`chat_conversations`, `community_channels`, `community_media`, `community_reports`, `content_moderation_logs`, `device_records`, `enforcement_actions`, `enterprise_roles`, `friend_requests`, `privacy_settings`, `room_sessions`, `security_alerts`, `user_purchases`, `verification_records`.

Inspect existing candidates such as `conversations`, `chats`, `community_post_reports`, `device_registry`, `enterprise_role_definitions`, `profile_privacy_settings`, `live_sessions`, `purchases`, `verification_requests`, and relevant secure RPCs. Choose only after checking columns, RLS and intended ownership.

## Dashboard + Global ID

Wire all dashboards using existing backend objects:
- `dashboard_registry`
- `dashboard_access_matrix`
- `dashboard_action_registry`
- `role_module_access`
- dashboard manifest/home/action RPCs for each role

Wire Global/Application ID only through existing canonical identity objects and RPCs. Remove legacy `applicationIdSystem` and onboarding business bridges after direct canonical wiring.

## Realtime

Use one authenticated centralized Supabase Realtime layer. Subscribe only to verified canonical tables. Invalidate precise React Query keys. Remove all per-page Base44 subscriptions. Reconnect on session refresh, network recovery and tab foreground. Clear channels on logout.

## Verification gates

Run and attach evidence for:
- `npm run build`
- `npm run lint`
- `npm run typecheck` if available
- source scan showing 0 `base44.entities`
- source scan showing 0 unapproved business `base44.functions.invoke`
- source scan showing 0 Base44 entity subscriptions
- scan showing no production demo/mock fallback
- RPC signature audit: every frontend RPC name and parameter matches `pg_proc`
- table audit: every `.from()`/`readTable()` target exists and has correct RLS
- authenticated smoke tests for USER, HOST, AGENT, AGENCY, COUNTRY_MANAGER, ADMIN, SUPER_ADMIN, SAM and AO
- E2E tests for signup/login/identity, profile, wallet, recharge, withdrawal, gifts, VIP, live room, chat, community, notifications, role applications and dashboards

Create `BASE44_CORRECTIVE_RESULT.md` listing every modified file, exact mapping, test output, failures and remaining blockers. Do not report 100% until every gate passes with evidence.
