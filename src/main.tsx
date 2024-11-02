import { StrictMode, lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
// components
import { Spinner } from "./components/ui/spinner"
// ** Redux Imports
import { store } from "@/store/store"
import { Provider } from "react-redux"
// app styles with tailwind and schendcn
import "./index.css"
// lazy app
const LazyApp = lazy(() => import("./App"))

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Spinner size="large" />}>
          <LazyApp />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
