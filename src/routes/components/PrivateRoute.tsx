import React, { Suspense } from "react"
// router dom
import { Navigate, useLocation } from "react-router-dom"
import type { AppRoute } from "@/routes/routes/index"
// selector
import { useAppSelector } from "@/store/store"
import { selectCurrenToken } from "@/store/reducers/auth.reducer"
// config
import appConfig from "@/configs/appConfig"

type PrivateRouteProps = {
  children: React.ReactElement
  route: AppRoute
}

const { defaultRoute, defaultLoginRoute } = appConfig.app

const PrivateRoute = ({ children, route }: PrivateRouteProps) => {
  const token = useAppSelector(selectCurrenToken)
  const location = useLocation()

  if (route) {
    const restrictedRoute = route.meta ? route.meta.restricted : false

    if (!token) {
      return (
        <Navigate to={defaultLoginRoute} state={{ from: location }} replace />
      )
    }

    if (restrictedRoute) {
      if (!token) {
        return <Navigate to={defaultRoute} replace />
      }
    }
  }

  return (
    <Suspense fallback={null}>
      {React.cloneElement(children, { route })}
    </Suspense>
  )
}

export default PrivateRoute
