import React from "react"

const PageTitle = ({
  title,
  children
}: {
  title: string
  children?: React.ReactNode
}) => {
  return (
    <div className="mb-5 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-4">
      <h2 className="font-bold text-2xl flex-none">{title}</h2>
      {children ? <div className="flex-auto flex items-center justify-end gap-2">{children}</div> : null}
    </div>
  )
}

export default PageTitle
