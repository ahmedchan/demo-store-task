import NavigationMenu from "./NavigationMenu"
import AppLogo from "./AppLogo"
import CartDropdown from "./CartDropdown"
import MobileNavigation from "./MobileNavigation"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { logout, selectCurrenToken } from "@/store/reducers/auth.reducer"
import navigationItems from "@/navigation/data"
import { Link } from "react-router-dom"

const Header = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectCurrenToken)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="px-6 border-b sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* left */}
        <div className="mr-4 hidden md:flex">
          <AppLogo />
          <NavigationMenu menu={navigationItems} />
        </div>

        {/* for mobile nav only */}
        <MobileNavigation menu={navigationItems} />

        {/* right */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-2">
            {token ? <CartDropdown /> : null}
            <div className="ml-2">
              {token ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <Button asChild={true}>
                  <Link to="/auth/login">Login</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
