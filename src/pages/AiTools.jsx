import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Loader2, Copy, Check, Send, Image as ImageIcon, Mic, Video, FileText, Shield, Mail, Upload, MessageSquare } from "lucide-react";
import { useAiTools } from "@/hooks/useAiTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TOOLS = [
  { id: "chat", name: "AI Chat", icon: MessageSquare, color: "#8B5CF6", desc: "Generate text with LLM" },
  { id: "generateImage", name: "Image Gen", icon: ImageIcon, color: "#EC4899", desc: "Create images from prompts" },
  { id: "generateSpeech", name: "Text→Speech", icon: Mic, color: "#3B82F6", desc: "Convert text to audio" },
  { id: "generateVideo", name: "Video Gen", icon: Video, color: "#EF4444", desc: "Create videos from prompts" },
  { id: "transcribe", name: "Transcribe", icon: FileText, color: "#10B981", desc: "Audio to text" },
  { id: "extractData", name: "Data Extract", icon: FileText, color: "#F59E0B", desc: "Extract data from files" },
  { id: "moderate", name: "Moderation", icon: Shield, color: "#6366F1", desc: "Content safety check" },
  { id: "sendEmail", name: "Send Email", icon: Mail, color: "#06B6D4", desc: "Send emails" },
];

const VOICES = [
  { id: "river", name: "River", desc: "Calm, neutral" },
  { id: "honey", name: "Honey", desc: "Warm, soft" },
  { id: "sunny", name: "Sunny", desc: "Bright, upbeat" },
  { id: "storm", name: "Storm", desc: "Formal, authoritative" },
  { id: "spark", name: "Spark", desc: "Energetic, quick" },
];

export default function AiTools() {
  const navigate = useNavigate();
  const ai = useAiTools();
  const [activeTool, setActiveTool] = useState("chat");

  // Chat state
  const [chatPrompt, setChatPrompt] = useState("");
  const [useWebSearch, setUseWebSearch] = useState(false);

  // Image state
  const [imagePrompt, setImagePrompt] = useState("");

  // Speech state
  const [speechText, setSpeechText] = useState("");
  const [voice, setVoice] = useState("river");

  // Video state
  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoDuration, setVideoDuration] = useState(6);
  const [videoAspect, setVideoAspect] = useState("16:9");

  // Transcribe state
  const [audioUrl, setAudioUrl] = useState("");

  // Moderate state
  const [modText, setModText] = useState("");

  // Email state
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    try {
      if (activeTool === "chat") {
        await ai.chat(chatPrompt, { add_context_from_internet: useWebSearch });
      } else if (activeTool === "generateImage") {
        await ai.generateImage(imagePrompt);
      } else if (activeTool === "generateSpeech") {
        await ai.generateSpeech(speechText, voice);
      } else if (activeTool === "generateVideo") {
        await ai.generateVideo(videoPrompt, videoDuration, videoAspect);
      } else if (activeTool === "transcribe") {
        await ai.transcribe(audioUrl);
      } else if (activeTool === "moderate") {
        await ai.moderate(modText);
      } else if (activeTool === "sendEmail") {
        await ai.sendEmail(emailTo, emailSubject, emailBody);
      }
    } catch (e) { /* error shown via hook */ }
  };

  const copyResult = () => {
    if (!ai.result) return;
    navigator.clipboard.writeText(typeof ai.result === "string" ? ai.result : JSON.stringify(ai.result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = TOOLS.find((t) => t.id === activeTool);
  const resultUrl = ai.result?.url;
  const resultTranscript = ai.result?.transcript;
  const resultData = ai.result?.result || ai.result;

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #6F35E0 0%, #C135E0 100%)" }}>
          <button onClick={() => navigate("/more-services")} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:scale-95 transition">
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              <Sparkles size={16} /> AI Tools Center
            </h1>
            <p className="text-[10px] text-white/70">All AI systems connected to Supabase backend</p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="p-4">
          <h3 className="text-xs font-bold text-gray-700 mb-2 px-1">AI Systems ({TOOLS.length})</h3>
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTool(t.id); ai.result = null; }}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all active:scale-95 ${activeTool === t.id ? "border-transparent" : "bg-white border-gray-100"}`}
                style={activeTool === t.id ? { background: `${t.color}15`, border: `1px solid ${t.color}40` } : { boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15` }}>
                  <t.icon size={18} style={{ color: t.color }} />
                </div>
                <span className="text-[9px] font-semibold text-gray-700 text-center leading-tight">{t.name}</span>
              </button>
            ))}
          </div>

          {/* Active Tool Panel */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${current.color}15` }}>
                <current.icon size={16} style={{ color: current.color }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">{current.name}</h3>
                <p className="text-[10px] text-gray-400">{current.desc}</p>
              </div>
            </div>

            {/* Chat */}
            {activeTool === "chat" && (
              <div className="space-y-3">
                <Textarea value={chatPrompt} onChange={(e) => setChatPrompt(e.target.value)} placeholder="Enter your prompt..." rows={4} className="text-sm" />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={useWebSearch} onChange={(e) => setUseWebSearch(e.target.checked)} className="w-4 h-4 accent-purple-500" />
                  <span className="text-xs text-gray-600">Add context from internet (web search)</span>
                </label>
              </div>
            )}

            {/* Image */}
            {activeTool === "generateImage" && (
              <Textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} placeholder="Describe the image to generate..." rows={3} className="text-sm" />
            )}

            {/* Speech */}
            {activeTool === "generateSpeech" && (
              <div className="space-y-3">
                <Textarea value={speechText} onChange={(e) => setSpeechText(e.target.value)} placeholder="Text to convert to speech..." rows={3} className="text-sm" />
                <div>
                  <p className="text-[10px] font-semibold text-gray-500 mb-1.5">Voice</p>
                  <div className="flex flex-wrap gap-1.5">
                    {VOICES.map((v) => (
                      <button key={v.id} onClick={() => setVoice(v.id)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${voice === v.id ? "text-white" : "bg-gray-100 text-gray-500"}`} style={voice === v.id ? { background: "#3B82F6" } : {}}>
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Video */}
            {activeTool === "generateVideo" && (
              <div className="space-y-3">
                <Textarea value={videoPrompt} onChange={(e) => setVideoPrompt(e.target.value)} placeholder="Describe the video to generate..." rows={3} className="text-sm" />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-gray-500 mb-1">Duration</p>
                    <div className="flex gap-1.5">
                      {[4, 6, 8].map((d) => (
                        <button key={d} onClick={() => setVideoDuration(d)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold ${videoDuration === d ? "text-white" : "bg-gray-100 text-gray-500"}`} style={videoDuration === d ? { background: "#EF4444" } : {}}>{d}s</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-gray-500 mb-1">Aspect</p>
                    <div className="flex gap-1.5">
                      {["16:9", "9:16"].map((a) => (
                        <button key={a} onClick={() => setVideoAspect(a)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold ${videoAspect === a ? "text-white" : "bg-gray-100 text-gray-500"}`} style={videoAspect === a ? { background: "#EF4444" } : {}}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transcribe */}
            {activeTool === "transcribe" && (
              <Input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="Audio file URL (mp3, wav, etc.)" className="text-sm" />
            )}

            {/* Moderate */}
            {activeTool === "moderate" && (
              <Textarea value={modText} onChange={(e) => setModText(e.target.value)} placeholder="Content to moderate..." rows={3} className="text-sm" />
            )}

            {/* Email */}
            {activeTool === "sendEmail" && (
              <div className="space-y-2">
                <Input value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder="Recipient email" className="text-sm" />
                <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Subject" className="text-sm" />
                <Textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Email body..." rows={3} className="text-sm" />
              </div>
            )}

            {/* Extract Data — read-only info */}
            {activeTool === "extractData" && (
              <div className="text-center py-4">
                <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-500">Data extraction requires a file URL + JSON schema. Use the upload flow in your app to get a file_url, then call <code className="text-[10px] bg-gray-100 px-1 rounded">ai.extractData(file_url, schema)</code>.</p>
              </div>
            )}

            {/* Run Button */}
            {activeTool !== "extractData" && (
              <Button
                onClick={handleRun}
                disabled={ai.loading}
                className="w-full mt-3 text-white font-bold"
                style={{ background: current.color }}
              >
                {ai.loading ? <><Loader2 size={14} className="animate-spin mr-1" /> Running...</> : <><Send size={14} className="mr-1" /> Run {current.name}</>}
              </Button>
            )}
          </div>

          {/* Result */}
          {ai.error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4">
              <p className="text-xs font-bold text-red-600">Error</p>
              <p className="text-[11px] text-red-500">{ai.error}</p>
            </div>
          )}

          {ai.result && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-700">Result</h4>
                <button onClick={copyResult} className="text-gray-400 hover:text-gray-600 active:scale-95">
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Image result */}
              {resultUrl && (activeTool === "generateImage") && (
                <img src={resultUrl} alt="Generated" className="w-full rounded-xl" />
              )}

              {/* Video result */}
              {resultUrl && activeTool === "generateVideo" && (
                <video src={resultUrl} controls className="w-full rounded-xl" />
              )}

              {/* Audio result */}
              {resultUrl && activeTool === "generateSpeech" && (
                <audio src={resultUrl} controls className="w-full" />
              )}

              {/* Transcript result */}
              {resultTranscript && (
                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{resultTranscript}</p>
              )}

              {/* Moderation result */}
              {activeTool === "moderate" && resultData && (
                <div className="space-y-2">
                  <div className={`rounded-xl p-3 ${resultData.approved ? "bg-green-50" : "bg-red-50"}`}>
                    <p className={`text-sm font-bold ${resultData.approved ? "text-green-600" : "text-red-600"}`}>
                      {resultData.approved ? "✓ Approved" : "✗ Rejected"}
                    </p>
                    {resultData.reason && <p className="text-[11px] text-gray-500 mt-0.5">{resultData.reason}</p>}
                  </div>
                  {resultData.flags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {resultData.flags.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-red-100 text-red-600 font-medium">{f}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Chat / text result */}
              {activeTool === "chat" && resultData && typeof resultData === "string" && (
                <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-xl p-3">{resultData}</p>
              )}
              {activeTool === "chat" && resultData && typeof resultData === "object" && (
                <pre className="text-[11px] text-gray-700 bg-gray-50 rounded-xl p-3 overflow-x-auto">{JSON.stringify(resultData, null, 2)}</pre>
              )}

              {/* Email result */}
              {activeTool === "sendEmail" && resultData?.success && (
                <p className="text-sm text-green-600 font-medium">✓ Email sent successfully!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}