import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageBubble from "@/components/chat/MessageBubble";
import MessageComposer from "@/components/chat/MessageComposer";
import TypingIndicator from "@/components/chat/TypingIndicator";
import EmojiPanel from "@/components/chat/EmojiPanel";
import GiftGallery from "@/components/chat/GiftGallery";
import AudioCallScreen from "@/components/chat/AudioCallScreen";
import ChatSearch from "@/components/chat/ChatSearch";
import TranslationPanel from "@/components/chat/TranslationPanel";
import MoreMenu from "@/components/chat/MoreMenu";
import { COLORS, formatTime, formatDate, formatCoins } from "@/components/chat/chatData";
import { useToast } from "@/components/ui/use-toast";

export default function ChatRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const conv = location.state?.conv;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [online, setOnline] = useState(conv?.is_online ?? true);
  const [coins, setCoins] = useState(500000);
  const [isFollowing, setIsFollowing] = useState(false);

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [emojiMode, setEmojiMode] = useState("standard");
  const [giftOpen, setGiftOpen] = useState(false);
  const [callState, setCallState] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [transOpen, setTransOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [transLang, setTransLang] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    loadMessages();
    const sub = base44.entities.ChatMessage.subscribe(() => loadMessages());
    return sub;
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const loadMessages = async () => {
    try {
      const list = await base44.entities.ChatMessage.filter({ conversation_id: id });
      list.sort((a, b) => new Date(a.created_date || 0) - new Date(b.created_date || 0));
      setMessages(list);
    } catch (e) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const now = new Date();
    const msgData = {
      conversation_id: id,
      text,
      is_own: true,
      is_delivered: false,
      is_read: false,
      date: formatDate(now),
      time: formatTime(now),
      type: "text",
      translation: transLang ? `[${transLang}] ${text}` : "",
      translation_lang: transLang || "",
    };
    const created = await base44.entities.ChatMessage.create(msgData);
    setMessages((prev) => [...prev, created]);

    // simulate delivered
    setTimeout(async () => {
      await base44.entities.ChatMessage.update(created.id, { is_delivered: true, is_read: false });
      setMessages((prev) => prev.map((m) => m.id === created.id ? { ...m, is_delivered: true } : m));
    }, 800);

    // simulate read + reply
    setTimeout(async () => {
      await base44.entities.ChatMessage.update(created.id, { is_delivered: true, is_read: true });
      setMessages((prev) => prev.map((m) => m.id === created.id ? { ...m, is_delivered: true, is_read: true } : m));
      setIsTyping(true);
      setTimeout(async () => {
        setIsTyping(false);
        const reply = await base44.entities.ChatMessage.create({
          conversation_id: id,
          text: getReply(text),
          is_own: false,
          is_delivered: true,
          is_read: true,
          date: formatDate(),
          time: formatTime(),
          type: "text",
        });
        setMessages((prev) => [...prev, reply]);
        if (conv) {
          await base44.entities.ChatConversation.update(id, {
            last_message: reply.text,
            last_message_time: reply.time,
            last_message_date: reply.date,
            unread_count: 0,
            is_online: true,
          });
        }
      }, 2000);
    }, 2500);

    if (conv) {
      await base44.entities.ChatConversation.update(id, {
        last_message: text,
        last_message_time: msgData.time,
        last_message_date: msgData.date,
      });
    }
  };

  const getReply = (text) => {
    const replies = ["That's great! 😊", "Really?", "Haha awesome!", "I agree 👍", "Tell me more!", "Wow! 🔥", "Nice!", "Got it ✨"];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleGiftSend = async (gift) => {
    setCoins((c) => c - gift.price);
    setGiftOpen(false);
    const now = new Date();
    const msg = await base44.entities.ChatMessage.create({
      conversation_id: id,
      type: "gift",
      is_own: true,
      is_delivered: true,
      is_read: false,
      gift_id: gift.id,
      gift_name: gift.name,
      gift_icon: gift.icon,
      gift_price: gift.price,
      date: formatDate(now),
      time: formatTime(now),
    });
    setMessages((prev) => [...prev, msg]);
    toast({ title: `🎁 ${gift.name} sent!`, description: `${formatCoins(gift.price)} coins deducted` });

    // simulate gift received reply
    setTimeout(async () => {
      const reply = await base44.entities.ChatMessage.create({
        conversation_id: id,
        type: "gift",
        is_own: false,
        is_delivered: true,
        is_read: true,
        gift_id: gift.id,
        gift_name: gift.name,
        gift_icon: gift.icon,
        gift_price: gift.price,
        date: formatDate(),
        time: formatTime(),
      });
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const handlePremiumBuy = (emoji) => {
    if (coins < emoji.price) {
      toast({ title: "Insufficient coins", variant: "destructive" });
      return;
    }
    setCoins((c) => c - emoji.price);
    setInput((prev) => prev + emoji.emoji);
    setEmojiOpen(false);
    toast({ title: `${emoji.name} purchased!`, description: `${formatCoins(emoji.price)} coins deducted` });
  };

  const handleCallEnd = (duration) => {
    setCallState(null);
    if (duration > 0) {
      toast({ title: "Call ended", description: `Duration: ${duration}s · ${formatCoins(duration * 100)} coins` });
    }
  };

  const handleMoreAction = (key) => {
    setMoreOpen(false);
    if (key === "profile") toast({ title: "Opening profile..." });
    else if (key === "follow") { setIsFollowing(!isFollowing); toast({ title: isFollowing ? "Unfollowed" : "Followed" }); }
    else if (key === "mute") toast({ title: "Notifications muted" });
    else if (key === "block") toast({ title: "User blocked" });
    else if (key === "report") toast({ title: "User reported" });
    else if (key === "search") setSearchOpen(true);
  };

  const handleTranslate = async (msg) => {
    if (msg.translation) {
      await base44.entities.ChatMessage.update(msg.id, { translation: "", translation_lang: "" });
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, translation: "" } : m));
    } else {
      const translated = `[Auto] ${msg.text}`;
      await base44.entities.ChatMessage.update(msg.id, { translation: translated, translation_lang: "auto" });
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, translation: translated } : m));
    }
  };

  const groupedDates = [];
  let lastDate = "";
  messages.forEach((m) => {
    if (m.date !== lastDate) { groupedDates.push({ type: "date", date: m.date }); lastDate = m.date; }
    groupedDates.push({ type: "msg", data: m });
  });

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 relative">
        <ChatHeader conv={conv} onBack={() => navigate("/messages")} onCall={() => setCallState("outgoing")} onMore={() => setMoreOpen(!moreOpen)} online={online} />
        <MoreMenu open={moreOpen} onClose={() => setMoreOpen(false)} onAction={handleMoreAction} isFollowing={isFollowing} />

        <div ref={scrollRef} className="flex-1 overflow-y-auto py-3" style={{ backgroundImage: `radial-gradient(${COLORS.cardBg} 1px, transparent 1px)`, backgroundSize: "24px 24px" }}>
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" /></div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ background: `${COLORS.primary}10` }}>
                <span className="text-3xl">💬</span>
              </div>
              <p className="text-sm font-semibold text-gray-500">No messages yet</p>
              <p className="text-xs text-gray-400 mt-1 text-center">Send a message or gift to start chatting</p>
            </div>
          ) : (
            groupedDates.map((item, i) => (
              item.type === "date" ? (
                <div key={i} className="flex justify-center my-3">
                  <span className="text-[10px] font-medium text-gray-400 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm">{item.date}</span>
                </div>
              ) : (
                <MessageBubble key={i} msg={item.data} onTranslate={handleTranslate} />
              )
            ))
          )}
          {isTyping && <TypingIndicator />}
        </div>

        <MessageComposer
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onEmoji={() => { setEmojiMode("standard"); setEmojiOpen(true); }}
          onPremiumEmoji={() => { setEmojiMode("premium"); setEmojiOpen(true); }}
          onGift={() => setGiftOpen(true)}
        />

        <EmojiPanel open={emojiOpen} mode={emojiMode} onClose={() => setEmojiOpen(false)} onPick={(e) => setInput((p) => p + e)} onBuyPremium={handlePremiumBuy} coins={coins} />
        <GiftGallery open={giftOpen} onClose={() => setGiftOpen(false)} onSend={handleGiftSend} coins={coins} />
        <ChatSearch open={searchOpen} onClose={() => setSearchOpen(false)} messages={messages} />
        <TranslationPanel
          open={transOpen}
          onClose={() => setTransOpen(false)}
          onTranslate={() => { setTransLang("auto"); setTransOpen(false); toast({ title: "Auto-translation enabled" }); }}
          onShowOriginal={() => { setTransLang(null); setTransOpen(false); toast({ title: "Showing original" }); }}
          onChangeLanguage={(l) => { setTransLang(l.code); setTransOpen(false); toast({ title: `Language: ${l.name}` }); }}
          onDisable={() => { setTransLang(null); setTransOpen(false); toast({ title: "Translation disabled" }); }}
          currentLang={transLang}
        />
        <AudioCallScreen
          conv={conv}
          state={callState}
          onAccept={() => setCallState("active")}
          onReject={() => setCallState(null)}
          onEnd={() => handleCallEnd(0)}
        />
      </div>
    </div>
  );
}