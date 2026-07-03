import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";

export function useContentModeration() {
  const [moderating, setModerating] = useState(false);

  const moderate = useCallback(async (text, imageUrl, context) => {
    setModerating(true);
    try {
      const res = await base44.functions.invoke("moderateContent", {
        text,
        image_url: imageUrl,
        context,
      });
      return res.data;
    } catch (err) {
      return { approved: false, flags: ["error"], reason: "Moderation service unavailable" };
    } finally {
      setModerating(false);
    }
  }, []);

  return { moderate, moderating };
}