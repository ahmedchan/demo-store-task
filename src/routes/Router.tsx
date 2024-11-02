// ** Router imports
import { lazy } from "react"
// ** Router imports
import { useRoutes, Navigate } from "react-router-dom"
// ** Layouts
import EmptyLayout from "@/layouts/BlankLayout"
// ** confiig
import appConfig from "@/configs/appConfig"
// types
import type { AppRoute } from "./routes"

// ** Components
const Error = lazy(() => import("@/views/misc/Error"))

const Router = ({ allRoutes }: { allRoutes: AppRoute[] }) => {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={appConfig.app.defaultRoute} />
    },
    {
      path: "*",
      element: <EmptyLayout />,
      children: [{ path: "*", element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
