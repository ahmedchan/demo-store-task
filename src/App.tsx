import { useState, useEffect, Suspense } from "react"
// components
import { Spinner } from "./components/ui/spinner"
// constants
import { LAYOUTS } from "@/constants"
// ** Router Import
import Router from "@/routes/Router"
// ** Routes & Default Routes
import { type AppRoute, getRoutes, } from "@/routes/routes"

const App = () => {
  const [allRoutes, setAllRoutes] = useState<AppRoute[]>([])

  useEffect(() => {
    setAllRoutes(getRoutes(LAYOUTS.MAIN))
  }, [])

  return (
    <Suspense fallback={<Spinner size="large" />}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
