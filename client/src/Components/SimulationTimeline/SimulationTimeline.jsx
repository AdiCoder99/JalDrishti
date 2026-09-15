import { useAppContext } from "../../context/useAppContext";

const SimulationTimeline = () => {
    const {
        timelineTime: time,
        timelineDuration: duration,
        isTimelinePlaying: isPlaying,
        setTimelineTime,
        toggleTimelinePlayback,
    } = useAppContext();

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <section className="border-t border-[#d5e0e8] bg-white px-5 py-3">
            <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#10253a]">
                    Simulation timeline
                </h2>

                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">
                        {formatTime(time)} / {formatTime(duration)}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            toggleTimelinePlayback();
                        }}
                        aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isPlaying ? (
                            <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" className="ml-0.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5.5v13L18.5 12 8 5.5z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={time}
                    onChange={(e) => setTimelineTime(Number(e.target.value))}
                    className="w-full accent-blue-600"
                />

                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    <span>00:00</span>
                    <span>01:00</span>
                    <span>02:00</span>
                    <span>03:00</span>
                    <span>04:00</span>
                    <span>05:00</span>
                    <span>06:00</span>
                </div>
            </div>
        </section>
    );
};

export default SimulationTimeline;