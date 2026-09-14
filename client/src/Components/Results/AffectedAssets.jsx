import { useAppContext } from "../../context/useAppContext";

const AffectedAssets = () => {
    const { results } = useAppContext();
    const { affectedAssets } = results;
    const accentStyles = [
        "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-700",
        "border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 text-rose-700",
        "border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 text-sky-700",
        "border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50 text-purple-700",
        "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700",
    ];

    return (
        <section className="border-t border-slate-200 bg-white px-5 py-5">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-900">
                Potentially Affected
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {affectedAssets.map((asset, index) => (
                    <div
                        key={asset.type}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                {asset.type}
                            </p>
                            <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold ${accentStyles[index % accentStyles.length]}`}>
                                At risk
                            </span>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="font-mono text-2xl font-bold text-slate-900">
                                {asset.affected}
                            </span>

                            <span className="text-xs font-medium text-slate-600">
                                {asset.unit}
                            </span>
                        </div>

                        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                            <div className="h-full w-3/5 rounded-full bg-slate-400/40" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AffectedAssets;