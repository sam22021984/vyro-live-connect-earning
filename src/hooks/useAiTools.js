import { useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Unified hook for all AI tools backed by the `aiTools` backend function.
 * Each method invokes the backend with proper authentication.
 */
export function useAiTools() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const invoke = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await base44.functions.invoke("aiTools", payload);
      setResult(res.data);
      return res.data;
    } catch (e) {
      setError(e.response?.data?.error || e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const chat = useCallback((prompt, opts = {}) =>
    invoke({ action: "chat", prompt, ...opts }), [invoke]);

  const generateImage = useCallback((prompt, existing_image_urls) =>
    invoke({ action: "generateImage", prompt, existing_image_urls }), [invoke]);

  const generateSpeech = useCallback((text, voice, language_code) =>
    invoke({ action: "generateSpeech", text, voice, language_code }), [invoke]);

  const generateVideo = useCallback((prompt, duration, aspect_ratio) =>
    invoke({ action: "generateVideo", prompt, duration, aspect_ratio }), [invoke]);

  const transcribe = useCallback((audio_url) =>
    invoke({ action: "transcribe", audio_url }), [invoke]);

  const extractData = useCallback((file_url, json_schema) =>
    invoke({ action: "extractData", file_url, json_schema }), [invoke]);

  const moderate = useCallback((text, image_url, context) =>
    invoke({ action: "moderate", text, image_url, context }), [invoke]);

  const sendEmail = useCallback((to, subject, body, from_name) =>
    invoke({ action: "sendEmail", to, subject, body, from_name }), [invoke]);

  const listTools = useCallback(() =>
    invoke({ action: "list" }), [invoke]);

  return {
    loading, error, result,
    chat, generateImage, generateSpeech, generateVideo,
    transcribe, extractData, moderate, sendEmail, listTools,
  };
}