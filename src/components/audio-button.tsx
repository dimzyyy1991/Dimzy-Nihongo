import { Volume2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

// Google Translate TTS endpoint — works on all browsers, no setup needed.
// Audio element doesn't enforce CORS for playback.
function googleTtsUrl(text: string) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text
  )}&tl=ja&client=tw-ob`;
}

function speakFallback(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const ja = voices.find((v) => v.lang?.toLowerCase().startsWith("ja"));
    if (ja) u.voice = ja;
    window.speechSynthesis.speak(u);
  } catch {
    /* noop */
  }
}

export async function speakJp(text: string) {
  try {
    const audio = new Audio(googleTtsUrl(text));
    await audio.play();
  } catch {
    speakFallback(text);
  }
}

export function AudioButton({ text, className = "" }: { text: string; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onPlay = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // stop previous playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(googleTtsUrl(text));
      audioRef.current = audio;
      audio.onplay = () => setPlaying(true);
      audio.onended = () => setPlaying(false);
      audio.onerror = () => {
        setPlaying(false);
        speakFallback(text);
      };

      try {
        await audio.play();
      } catch {
        // Autoplay/network blocked — fallback to native TTS (still inside user gesture)
        speakFallback(text);
        setPlaying(false);
      }
    },
    [text]
  );

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="Dengarkan pengucapan"
      title="Dengarkan"
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
        playing
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary"
      } ${className}`}
    >
      <Volume2 className={`h-3.5 w-3.5 ${playing ? "animate-pulse" : ""}`} />
    </button>
  );
}
