import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.js";

export default function RingExperience() {
  const { slug } = useParams();
  const audioRef = useRef(null);
  const replayTimeoutRef = useRef(null);
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);

  const title = useMemo(() => {
    if (!experience?.customerName) return "Glow Jewels Ring";
    return `For ${experience.customerName}`;
  }, [experience]);

  const clearReplayTimer = () => {
    if (replayTimeoutRef.current) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;
    }
  };

  const playAudio = async () => {
    if (!audioRef.current) return;
    clearReplayTimer();
    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      setPlaying(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/nfc/${slug}`);
        setExperience(data);
      } catch (err) {
        setError(err.response?.data?.message || "This ring page is unavailable.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !experience?.audioDataUrl) return undefined;

    const onEnded = () => {
      setPlaying(false);
      clearReplayTimer();
      replayTimeoutRef.current = setTimeout(() => {
        playAudio();
      }, 3000);
    };

    const onPause = () => {
      if (!audio.ended) setPlaying(false);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    playAudio();

    const unlockAudio = () => {
      playAudio();
    };

    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("click", unlockAudio);

    return () => {
      clearReplayTimer();
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      audio.pause();
    };
  }, [experience]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fbe0ea_0%,#f9f1ec_42%,#fffaf7_100%)] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-charcoal/45">Glow Jewels</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal">Opening your ring page...</h1>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fbe0ea_0%,#f9f1ec_42%,#fffaf7_100%)] flex items-center justify-center px-6">
        <div className="max-w-sm rounded-[32px] border border-white/80 bg-white/75 p-8 text-center shadow-[0_28px_80px_rgba(232,177,194,0.18)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Glow Jewels</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal">Link unavailable</h1>
          <p className="mt-4 text-charcoal/65">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#f8d9e5_0%,#fdf0f3_32%,#fffaf7_72%,#ffffff_100%)] px-5 py-6 text-charcoal">
      <audio ref={audioRef} src={experience.audioDataUrl} preload="auto" />

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-center">
        <div className="rounded-[34px] border border-white/80 bg-white/60 p-6 shadow-[0_24px_80px_rgba(228,181,197,0.14)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-charcoal/60">
              Glow Jewels
            </span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-charcoal/45">
              NFC Ring
            </span>
          </div>

          <div className="py-20 text-center">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d18ea7]">A voice for you</p>
            <h1 className="mt-6 font-serif text-[56px] leading-[0.9] text-charcoal">
              {title}
            </h1>
            <p className="mt-6 text-base text-charcoal/62">
              Keep this close.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={playAudio}
              className="rounded-full border border-white/80 bg-white/78 px-6 py-3 text-xs uppercase tracking-[0.3em] text-charcoal/75 shadow-[0_10px_30px_rgba(228,181,197,0.14)]"
            >
              {playing ? "Replay Audio" : "Play Audio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
