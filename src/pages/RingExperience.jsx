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
  const [entered, setEntered] = useState(false);
  const [requestedOpen, setRequestedOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const title = useMemo(() => {
    if (!experience?.customerName) return "For You";
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
      }, 2000);
    };

    const onPause = () => {
      if (!audio.ended) setPlaying(false);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);

    return () => {
      clearReplayTimer();
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [experience]);

  useEffect(() => {
    if (!requestedOpen || loading || error || !experience) return;
    setEntered(true);
    requestAnimationFrame(() => {
      playAudio();
    });
  }, [requestedOpen, loading, error, experience]);

  const openSurprise = async () => {
    setRequestedOpen(true);
    if (!loading && !error && experience) {
      setEntered(true);
      await playAudio();
    }
  };

  if (error && !entered) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f8d7df_0%,#fdf0f3_38%,#fff8f7_100%)] px-6 py-8 text-charcoal">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
          <div className="w-full rounded-[34px] border border-white/80 bg-white/72 p-8 text-center shadow-[0_24px_70px_rgba(228,165,183,0.16)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.34em] text-charcoal/45">Glow Jewels</p>
            <h1 className="mt-5 font-serif text-4xl text-charcoal">Link unavailable</h1>
            <p className="mt-4 text-sm leading-6 text-charcoal/65">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7f8_0%,#fff4f6_32%,#fffdfc_100%)] text-charcoal">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-8%] h-64 w-64 rounded-full bg-[#ffd3df] blur-3xl opacity-70" />
        <div className="absolute right-[-12%] top-[12%] h-72 w-72 rounded-full bg-[#f6a8bc] blur-3xl opacity-40" />
        <div className="absolute bottom-[-10%] left-[12%] h-72 w-72 rounded-full bg-[#ffd8d0] blur-3xl opacity-55" />
        <div className="absolute bottom-[8%] right-[8%] h-52 w-52 rounded-full bg-[#f4bcc9] blur-3xl opacity-45" />
      </div>

      <audio ref={audioRef} src={experience?.audioDataUrl || ""} preload="auto" />

      {!entered ? (
        <div className="relative z-10 px-6 py-8">
          <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
            <button
              type="button"
              onClick={openSurprise}
              className="w-full rounded-[38px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,242,245,0.86))] px-8 py-16 text-center shadow-[0_30px_90px_rgba(226,163,180,0.18)] backdrop-blur-xl"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/80 bg-white/70 shadow-[0_14px_40px_rgba(236,180,198,0.22)]">
                <div className="h-4 w-4 rounded-full bg-[#e789a4]" />
              </div>
              <p className="mt-10 text-xs uppercase tracking-[0.36em] text-charcoal/45">Glow Jewels</p>
              <h1 className="mt-5 font-serif text-5xl leading-none text-charcoal">Tap for Surprise</h1>
              <p className="mt-5 text-sm tracking-[0.16em] text-charcoal/55 uppercase">
                {requestedOpen && loading ? "Preparing..." : "Open your ring message"}
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 px-6 py-8">
          <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center text-center">
            <div className="w-full rounded-[40px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,244,246,0.7))] px-7 py-14 shadow-[0_26px_90px_rgba(226,163,180,0.14)] backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#cf7c98]">A little voice note</p>
              <h1 className="mt-8 font-serif text-[60px] leading-[0.88] text-charcoal">{title}</h1>
              <div className="mt-10 flex items-center justify-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full bg-[#e789a4] transition-opacity ${playing ? "opacity-100 animate-pulse" : "opacity-50"}`} />
                <span className="text-xs uppercase tracking-[0.3em] text-charcoal/45">
                  {playing ? "Playing now" : "Ready"}
                </span>
              </div>
              <button
                type="button"
                onClick={playAudio}
                className="mt-10 rounded-full border border-white/90 bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.32em] text-charcoal/65 shadow-[0_12px_30px_rgba(226,163,180,0.1)]"
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
