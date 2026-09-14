import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)] sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-[165px] shrink-0 items-center overflow-hidden rounded-xl bg-slate-50 px-2 ring-1 ring-slate-200">
          <img src={logo} alt="JalDrishti logo" className="h-12 w-full object-contain" />
        </div>
        <div className="hidden border-l border-slate-200 pl-3 md:block">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Operations console
          </p>
          <p className="mt-0.5 text-sm font-medium text-slate-600">
            Flood intelligence dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />
          <span className="text-xs font-semibold text-emerald-700">System ready</span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:gap-3 sm:px-4">
          <svg
            aria-hidden="true"
            className="hidden h-4 w-4 text-slate-400 sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v3m8-3v3M3.5 9.5h17M5 4.5h14A1.5 1.5 0 0 1 20.5 6v13A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z" />
          </svg>
          <div className="text-right font-sans leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Local time
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">{formattedDate}</span>
              <span className="text-sm font-bold tabular-nums text-blue-600">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
