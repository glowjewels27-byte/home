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
  const [needsInteraction, setNeedsInteraction] = useState(false);
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
      setNeedsInteraction(false);
    } catch (err) {
      setPlaying(false);
      setNeedsInteraction(true);
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

    return () => {
      clearReplayTimer();
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
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

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-between">
        <div className="rounded-[30px] border border-white/80 bg-white/55 p-5 shadow-[0_20px_70px_rgba(228,181,197,0.16)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-white/80 bg-white/65 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-charcoal/60">
              Glow Jewels
            </span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-charcoal/45">
              NFC Ring
            </span>
          </div>

          <div className="mt-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#d18ea7]">A message made just for you</p>
            <h1 className="mt-5 font-serif text-[48px] leading-[0.95] text-charcoal">
              {title}
            </h1>
            <p className="mt-6 text-base leading-7 text-charcoal/70">
              May this little ring hold a voice you can return to whenever you want warmth, closeness, and one soft moment that feels yours.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(250,232,239,0.88))] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-charcoal/45">Audio keepsake</p>
                <p className="mt-2 text-lg font-medium">{experience.audioName}</p>
              </div>
              <button
                type="button"
                onClick={playAudio}
                className="rounded-full bg-charcoal px-5 py-3 text-xs uppercase tracking-[0.26em] text-white"
              >
                {playing ? "Replay" : "Play"}
              </button>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/70">
              <div className={`h-full rounded-full bg-[#e4a8bc] transition-all duration-500 ${playing ? "w-full animate-pulse" : "w-1/3"}`} />
            </div>

            <p className="mt-4 text-sm leading-6 text-charcoal/60">
              The audio loops with a small 3-second pause between plays.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/80 bg-white/48 px-5 py-4 text-center text-sm text-charcoal/58 shadow-[0_16px_44px_rgba(228,181,197,0.12)] backdrop-blur-xl">
          Keep this page nearby. A gentle tap from the ring brings you back here.
        </div>
      </div>

      {needsInteraction && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#2a1f24]/40 px-6 backdrop-blur-sm">
          <div className="max-w-sm rounded-[30px] border border-white/80 bg-white/92 p-7 text-center shadow-[0_30px_80px_rgba(34,20,28,0.18)]">
            <p className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Tap to begin</p>
            <h2 className="mt-4 font-serif text-4xl text-charcoal">Your audio is ready</h2>
            <p className="mt-4 text-sm leading-6 text-charcoal/65">
              Some mobile browsers block autoplay at first load. Tap once and we’ll start the audio loop.
            </p>
            <button
              type="button"
              onClick={playAudio}
              className="mt-6 w-full rounded-full bg-charcoal py-3 text-xs uppercase tracking-[0.28em] text-white"
            >
              Start Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
