import React, { useState, useRef, useCallback } from "react";
import { useHomeFeed } from "@/hooks/useHomeFeed";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSearchOverlay from "@/components/home/HomeSearchOverlay";
import HomeTabs from "@/components/home/HomeTabs";
import PromoBanner from "@/components/home/PromoBanner";
import LiveFeed from "@/components/home/LiveFeed";
import { AudioRoomFeed, PartyRoomFeed } from "@/components/home/RoomFeeds";
import { CreatorSuggestions, FriendSuggestions } from "@/components/home/PeopleSuggestions";
import { TrendingHashtags, TrendingEvents } from "@/components/home/TrendingSection";
import { ContinueWatching, RecentlyVisited } from "@/components/home/ContinueSection";
import DailyRewardWidget from "@/components/home/DailyRewardWidget";
import { HomeSkeleton, EmptyState, ErrorState } from "@/components/home/HomeStates";
import WelcomeBonusPopup from "@/components/home/WelcomeBonusPopup";

export default function Home() {
  const { liveRooms, partyRooms, creators, friendSuggestions, followingMap, loading, error, refreshing, refresh } = useHomeFeed();
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState("Recommended");
  const [country, setCountry] = useState("ALL");
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const scrollRef = useRef(null);

  // Filter content based on active tab + country
  const filterContent = useCallback((items, countryField = "country") => {
    let filtered = items;
    if (country !== "ALL") {
      filtered = filtered.filter((item) => {
        const itemCountry = item[countryField] || item.country_name || "";
        return !itemCountry || itemCountry.toLowerCase().includes(country.toLowerCase());
      });
    }
    return filtered;
  }, [country]);

  const getSortedRooms = () => {
    let rooms = [...liveRooms];
    switch (activeTab) {
      case "Trending":
      case "Popular":
        rooms.sort((a, b) => (b.current_viewers || 0) - (a.current_viewers || 0));
        break;
      case "New":
        rooms.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
        break;
      case "Video Live":
        return filterContent(rooms);
      default:
        break;
    }
    return filterContent(rooms);
  };

  const getSortedPartyRooms = () => {
    if (activeTab === "Audio Live") {
      return filterContent(partyRooms.filter((r) => r.category?.toLowerCase?.().includes("audio") || r.category?.toLowerCase?.().includes("music")));
    }
    if (activeTab === "Party Rooms") {
      return filterContent(partyRooms.filter((r) => !r.category?.toLowerCase?.().includes("audio") && !r.category?.toLowerCase?.().includes("music")));
    }
    return filterContent(partyRooms);
  };

  // Pull to refresh
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e) => {
    if (touchStartY.current > 0) {
      const diff = e.touches[0].clientY - touchStartY.current;
      if (diff > 0 && window.scrollY === 0) setPullDistance(Math.min(diff * 0.5, 80));
    }
  };
  const handleTouchEnd = () => {
    if (pullDistance > 60) refresh();
    setPullDistance(0);
    touchStartY.current = 0;
  };

  if (loading) return <HomeSkeleton />;
  if (error) return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        <HomeHeader country={country} onCountryChange={setCountry} onRefresh={refresh} refreshing={refreshing} onSearch={() => setShowSearch(true)} />
        <ErrorState onRetry={refresh} />
      </div>
    </div>
  );

  const sortedLive = getSortedRooms();
  const sortedParty = getSortedPartyRooms();
  const hasContent = sortedLive.length > 0 || sortedParty.length > 0 || creators.length > 0;

  return (
    <div
      className="min-h-screen bg-[#F8F9FC]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      {pullDistance > 0 && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none" style={{ height: pullDistance }}>
          <div className="mt-2 w-7 h-7 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}

      <div className="max-w-md mx-auto pb-20" ref={scrollRef}>
        <HomeHeader
          country={country}
          onCountryChange={setCountry}
          onRefresh={refresh}
          refreshing={refreshing}
          onSearch={() => setShowSearch(true)}
        />

        <HomeTabs active={activeTab} onChange={setActiveTab} />

        <PromoBanner />

        <DailyRewardWidget />

        {!hasContent ? (
          <EmptyState onRefresh={refresh} />
        ) : (
          <>
            <LiveFeed rooms={sortedLive} />

            <AudioRoomFeed rooms={sortedParty} />

            <PartyRoomFeed rooms={sortedParty} />

            <CreatorSuggestions creators={filterContent(creators)} followingMap={followingMap} />

            <TrendingHashtags />

            <TrendingEvents />

            <FriendSuggestions friends={filterContent(friendSuggestions)} followingMap={followingMap} />

            <ContinueWatching />

            <RecentlyVisited />
          </>
        )}

        <div className="h-4" />
      </div>

      {showSearch && <HomeSearchOverlay onClose={() => setShowSearch(false)} />}

      <WelcomeBonusPopup />
    </div>
  );
}