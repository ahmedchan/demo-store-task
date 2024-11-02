// ** React Imports
import { lazy } from "react"
// constants
import { LAYOUTS } from "@/constants"
// Login view
const Login = lazy(() => import("@/views/auth/Login"))

// Here's all views related to auth routes
const AuthenticationRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
    meta: {
      layout: LAYOUTS.BLANK,
      publicRoute: true,
      restricted: true
    }
  }
]

export default AuthenticationRoutes
