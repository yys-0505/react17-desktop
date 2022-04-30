import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './router/private-route'
import { pageRoutes } from 'router'

const genRoutes = () => {
  return pageRoutes.map(route => {
    const { path } = route
    return <Route path={path} element={<PrivateRoute {...route} />} key={path} />
  })
}

function App() {
  return (
    <Routes>
      { genRoutes() }
    </Routes>
  )
}

export default App
