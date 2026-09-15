import { useAppContext } from "../../context/useAppContext";

const KeyResults = () => {
    const { results } = useAppContext();
    const { keyResults } = results;
    const accentStyles = [
        {
            card: "border-cyan-200 bg-[#effaff]",
            badge: "bg-cyan-100 text-cyan-800",
            value: "text-[#102f4b]",
        },
        {
            card: "border-blue-200 bg-[#f1f6ff]",
            badge: "bg-blue-100 text-blue-800",
            value: "text-[#102f4b]",
        },
        {
            card: "border-amber-200 bg-[#fffaf0]",
            badge: "bg-amber-100 text-amber-800",
            value: "text-[#102f4b]",
        },
        {
            card: "border-emerald-200 bg-[#f0fbf7]",
            badge: "bg-emerald-100 text-emerald-700",
            value: "text-emerald-900",
        },
    ];

    return (
        <section className="border-t border-[#d5e0e8] bg-white px-5 py-5">

            <h2 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#10253a]">
                Key results
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {keyResults.map((result, index) => {
                    const style = accentStyles[index % accentStyles.length];
                    return (
                    <div
                        key={result.label}
                        className={`rounded-lg border px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${style.card}`}
                    >
                        <span
                            className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${style.badge}`}
                        >
                            {result.label}
                        </span>

                        <div className="mt-3 flex items-end gap-1">
                            <span className={`font-mono text-2xl font-bold ${style.value}`}>
                                {result.value}
                            </span>

                            <span className="mb-0.5 text-xs font-medium text-slate-600">
                                {result.unit}
                            </span>
                        </div>

                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/70">
                            <div className="h-full w-2/3 rounded-full bg-slate-400/40" />
                        </div>
                    </div>
                    );
                })}

            </div>
        </section>
    );
};

export default KeyResults;