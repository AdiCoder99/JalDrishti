import SimulationConfiguration from '../Components/SimulationConfiguration/SimulationConfiguration'
import FloodMap from '../Components/FloodMap/FloodMap'
import MapLayers from '../Components/MapLayers/MapLayers'
import ResultsSection from '../Components/Results/ResultsSection'

const Dashboard = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)] min-h-0 gap-4 bg-slate-50 p-4">
      <SimulationConfiguration />

      <main className="min-w-0 flex-1 overflow-y-auto rounded-md border border-slate-200 bg-white">
        <div className="flex min-h-[34rem] gap-4 p-4">
          <div className="min-w-0 flex-[1.15]">
            <FloodMap />
          </div>
          <MapLayers />
        </div>
        <ResultsSection />
      </main>
      
    </div>
    
  )
}

export default Dashboard
