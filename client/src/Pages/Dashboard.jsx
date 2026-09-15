import SimulationConfiguration from '../Components/SimulationConfiguration/SimulationConfiguration'
import FloodMap from '../Components/FloodMap/FloodMap'
import MapLayers from '../Components/MapLayers/MapLayers'
import ResultsSection from '../Components/Results/ResultsSection'

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-4.75rem)] bg-[#eef3f7] p-3 sm:p-5">
      <div className="mx-auto flex max-w-[1800px] min-h-0 flex-col gap-4 lg:flex-row">
      <SimulationConfiguration />

      <main className="scrollbar-thin min-w-0 flex-1 overflow-y-auto rounded-xl border border-[#d5e0e8] bg-[#f8fafb] shadow-[0_12px_30px_rgba(15,45,70,0.06)]">
        <div className="flex min-h-[34rem] flex-col gap-4 p-3 sm:p-4 xl:flex-row">
          <div className="min-w-0 flex-[1.15]">
            <FloodMap />
          </div>
          <MapLayers />
        </div>
        <ResultsSection />
      </main>
      </div>
    </div>
    
  )
}

export default Dashboard
