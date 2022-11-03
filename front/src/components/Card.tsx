import React from 'react'

export const Card: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="rounded-md bg-white drop-shadow">{children}</div>
  )
}
