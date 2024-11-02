import { NavLink } from "react-router-dom"
import classNames from "classnames"

type Props = {
  menu: {
    label: string
    link: string
  }[]
}

const NavigationMenu = ({ menu }: Props) => {
  return (
    <nav className="flex items-center gap-3 text-sm lg:gap-4">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            classNames(
              "hover:opacity-65 hover:underline transition-all duration-150",
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
  )
}

export default NavigationMenu
