const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] w-52 rounded-xl border border-white/70 bg-white/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800">Flood depth</h3>
        <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">meters</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full">
        <span className="flex-1 bg-cyan-200" />
        <span className="flex-1 bg-sky-400" />
        <span className="flex-1 bg-blue-600" />
        <span className="flex-1 bg-indigo-800" />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        <span>0</span>
        <span>1</span>
        <span>3</span>
        <span>5+</span>
      </div>
    </div>
  )
}

export default MapLegend
