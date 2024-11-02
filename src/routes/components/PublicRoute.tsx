// ** React Imports
import React, { Suspense } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AppRoute } from "../routes"
import { useAppSelector } from "@/store/store"
import { selectCurrenToken } from "@/store/reducers/auth.reducer"
// configs
import appConfig from "@/configs/appConfig"

type PublicRouteProps = {
  children: React.ReactElement
  route: AppRoute
}

const PublicRoute = ({ children, route }: PublicRouteProps) => {
  const token = useAppSelector(selectCurrenToken)
  const location = useLocation()
  const redirectPath = location?.state?.path || appConfig.app.defaultRoute

  if (route) {
    const restrictedRoute = route.meta && route.meta.restricted
    if (token && restrictedRoute) {
      return <Navigate to={redirectPath} replace />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
