import { Outlet } from "react-router-dom"
import classnames from "classnames"

const BlankLayout = () => {
  return (
    <div className={classnames("blank-page")}>
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlankLayout
