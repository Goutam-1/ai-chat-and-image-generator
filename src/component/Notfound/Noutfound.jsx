import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Noutfound() {
  return (
    <div>
        404 Not Found
        <Outlet/>
    </div>
  )
}
