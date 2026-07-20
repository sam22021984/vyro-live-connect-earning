# VYRO فرنٹ اینڈ ↔ Supabase حتمی آڈٹ رپورٹ

## نتیجہ

موجودہ نئی ZIP میں کافی تبدیلیاں کی گئی ہیں، مگر **End-to-End wiring ابھی مکمل نہیں ہے**۔ `BASE44_EXECUTION_RESULT.md` کا “migration complete” دعویٰ source scan اور backend verification سے مطابقت نہیں رکھتا۔

## تصدیق شدہ اعداد

- باقی `base44.entities` references: **31**
- باقی `base44.functions.invoke` calls: **119**
- Base44 entity realtime subscriptions: **31**
- Supabase global subscriptions: **2**
- production build: **PASS**, مگر duplicate-key اور large bundle warnings کے ساتھ
- backendGateway میں استعمال ہونے والے canonical table names: 32
- ان میں backend پر موجود نہ ہونے والے table names: **14**

## Backend پر موجود نہ ہونے والے غلط table mappings

- `chat_conversations`
- `community_channels`
- `community_media`
- `community_reports`
- `content_moderation_logs`
- `device_records`
- `enforcement_actions`
- `enterprise_roles`
- `friend_requests`
- `privacy_settings`
- `room_sessions`
- `security_alerts`
- `user_purchases`
- `verification_records`

ان ناموں کو نئی tables بنا کر درست نہیں کرنا۔ موجودہ canonical tables/RPCs سے remap کرنا ہے، مثلاً conversations/chats، community_post_reports، device_registry، enterprise_role_definitions، profile_privacy_settings، live_sessions، purchases، verification_requests وغیرہ۔ Exact schema پہلے inspect کیا جائے۔

## RPC parameter mapping بھی غلط ہے

`src/lib/backendGateway.js` میں متعدد RPC calls backend signatures سے match نہیں کرتیں۔ نمایاں مثالیں:

- `vyro_get_public_profile`: frontend `target_user_id` بھیجتا ہے، backend `p_user_id` لیتا ہے۔
- `vyro_get_my_wallet_transactions`: frontend `limit/offset`، backend `p_limit/p_offset`۔
- `vyro_create_recharge_intent`: frontend extra `amount` بھیجتا ہے؛ backend صرف `p_package_id, p_payment_method` لیتا ہے۔
- `vyro_request_withdrawal`: frontend `amount/method/destination`، backend `p_amount_coins, p_payment_method_id`۔
- `vyro_join_live_room`: backend کو `p_room_id, p_password` چاہیے۔
- `vyro_close_live_room`: backend کو `p_room_id, p_reason` چاہیے۔
- `vyro_send_gift`: backend کو sender/receiver/coins/context/reference کے مکمل parameters چاہیے، frontend صرف room/gift/quantity/recipient بھیج رہا ہے۔
- `vyro_submit_role_application`, `vyro_review_role_application`, `vyro_user_action`, `vyro_user_has_role`, `vyro_wallet_apply` سمیت کئی calls کے parameter names/shape غلط ہیں۔

یہ calls build میں پکڑی نہیں جاتیں، مگر runtime پر PostgREST RPC errors دیں گی۔

## Realtime status

Global Supabase Realtime provider شامل ہے، لیکن 31 legacy Base44 entity subscriptions ابھی source میں موجود ہیں۔ اس لیے single canonical realtime architecture ابھی مکمل نہیں۔

## Dashboard اور Global ID

Backend پر dashboard registry, access matrix, action registry, role module access اور identity RPCs موجود ہیں۔ مگر frontend میں dashboard data/function bridges اور static data modules ابھی باقی ہیں۔ ہر dashboard card/action کو backend manifest/home/action RPC سے verify کرنا باقی ہے۔ Global ID backend موجود ہے، مگر login/onboarding/applicationIdSystem legacy functions مکمل طور پر remove نہیں ہوئے۔

## حتمی درجہ بندی

- Backend availability: **مضبوط / زیادہ تر تیار**
- Frontend migration: **جزوی**
- RPC mapping: **کئی runtime mismatches**
- Realtime: **جزوی، legacy subscriptions باقی**
- Fake/mock/demo: **کچھ production logic میں demo fallback موجود**
- End-to-End: **نامکمل**
- 100% production-ready: **نہیں**
