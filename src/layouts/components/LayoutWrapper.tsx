import React from 'react'
import Header from './Header'

const LayoutWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="p-6">{children}</div>
    </div>
  )
}

export default LayoutWrapper
