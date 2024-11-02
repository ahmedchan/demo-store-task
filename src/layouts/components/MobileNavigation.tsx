import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlignLeft } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import AppLogo from "./AppLogo"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/Sheet"
import classNames from "classnames"

type Props = {
  menu: {
    label: string
    link: string
  }[]
}

const MobileNavigation = ({ menu }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false)
    }
  }, [isDesktop])
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="link" size="sm" className="inline-block md:hidden">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <AppLogo />
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            Welcome to our online store... <br />
            Find latest deals, products an enjoy every moment browsing out, with
            100% secure online payment and refund avalibality.
          </SheetDescription>

          <nav className="flex flex-col gap-1">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    "hover:opacity-65 bg-gray-100 p-2 rounded-lg hover:underline transition-all duration-150",
                    {
                      underline: isActive
                    }
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation
