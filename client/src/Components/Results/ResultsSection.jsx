import KeyResults from "./KeyResults";
import AffectedAssets from "./AffectedAssets";
import { useAppContext } from "../../context/useAppContext";

const escapeCsvValue = (value) => `"${String(value).replaceAll('"', '""')}"`;

const ResultsSection = () => {
    const { results, requestState } = useAppContext();
    const { keyResults, affectedAssets } = results;

    const exportResults = () => {
        const rows = [
            ["JalDrishti Flood Analysis Results", ""],
            ["Generated", new Date().toLocaleString("en-IN")],
            [],
            ["Key Results", "Value", "Unit"],
            ...keyResults.map((result) => [result.label, result.value, result.unit]),
            [],
            ["Potentially Affected Assets", "Affected", "Unit"],
            ...affectedAssets.map((asset) => [asset.type, asset.affected, asset.unit]),
        ];

        const csv = rows
            .map((row) => row.map(escapeCsvValue).join(","))
            .join("\r\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "jaldrishti-flood-analysis-results.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <section className="border-t border-[#d5e0e8] bg-white">
            <div className="border-b border-[#d5e0e8] bg-[#f8fafb] px-5 py-5">
                <div>
                    <p className="text-xs font-semibold text-[#157cad]">Decision support</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#10253a]">
                        Analysis results
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Summary of the current flood simulation and potential impact.
                    </p>
                </div>
            </div>

            {requestState.error && (
                <p className="border-b border-red-100 bg-red-50 px-5 py-3 text-xs font-medium text-red-700">
                    {requestState.error}
                </p>
            )}

            <KeyResults />
            <AffectedAssets />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d5e0e8] bg-[#f3f7fa] px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                        Export analysis
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Download all key results and affected asset values as a CSV file.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={exportResults}
                    className="inline-flex items-center gap-2 rounded-md bg-[#102f4b] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b2237] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
                    </svg>
                    Export results
                </button>
            </div>
        </section>
    );
};

export default ResultsSection;
