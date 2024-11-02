// ** React Imports
import { Fragment, type ReactElement } from "react"
// ** Routes Imports
import AuthenticationRoutes from "./AuthenticationRoutes"
import StoreRoutes from "./StoreRoutes"
// ** Layouts
import BlankLayout from "@/layouts/BlankLayout"
import MainLayout from "@/layouts/MainLayout"
import AuthLayout from "@/layouts/AuthLayout"
// wrapper layout component with outlet
import LayoutWrapper from "@/layouts/components/LayoutWrapper"
// ** Route Components
import PublicRoute from "../components/PublicRoute"
import PrivateRoute from "../components/PrivateRoute"
// ** Utils
import { isObjEmpty } from "@/lib/utils"
import appConfig from "@/configs/appConfig"
// constants
import { LAYOUTS } from "@/constants"

// some type defined
type LayoutType = "blank" | "main" | "auth"
type RouteMeta = {
  layout?: LayoutType
  publicRoute?: boolean
  restricted?: boolean
}
export interface AppRoute {
  path: string
  element: ReactElement
  index?: false | undefined
  meta?: RouteMeta
  children?: AppRoute[]
}

const getLayout: Record<LayoutType, ReactElement> = {
  blank: <BlankLayout />,
  main: <MainLayout />,
  auth: <AuthLayout />
}

// ** Document title
const TemplateTitle = `%s - ${appConfig.app.appName} `
// ** Default Route
const DefaultRoute = appConfig.app.defaultRoute

// ** Merge Routes
const Routes: AppRoute[] = [...AuthenticationRoutes, ...StoreRoutes]

const getRouteMeta = (route: AppRoute) => {
  if (isObjEmpty(route.element.props)) {
    return route.meta ? { routeMeta: route.meta } : {}
  }
  return {}
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout: LayoutType, defaultLayout: LayoutType) => {
  const LayoutRoutes: AppRoute[] = []

  if (Routes) {
    Routes?.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta?.layout && route.meta.layout === layout) ||
        (!route.meta?.layout && defaultLayout === layout)
      ) {
        const RouteTag = route.meta?.publicRoute ? PublicRoute : PrivateRoute
        isBlank = route.meta?.layout === "blank" || false

        if (route.element) {
          const Wrapper =
            !isObjEmpty(route.element.props) || isBlank
              ? Fragment
              : LayoutWrapper

          route.element = (
            <Wrapper {...(!isBlank ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout: LayoutType): AppRoute[] => {
  const defaultLayout: LayoutType = layout || LAYOUTS.MAIN
  const layouts: LayoutType[] = ["main", "auth", "blank"]

  return layouts.map((layoutItem) => ({
    path: "/",
    element: getLayout[layoutItem] || getLayout[defaultLayout],
    children: MergeLayoutRoutes(layoutItem, defaultLayout)
  }))
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
