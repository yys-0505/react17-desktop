import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/auth.slice'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = (props) => {
  const user = useSelector(selectUser)
  const { path, auth, Component } = props
  if (path === '/') {
    return <Navigate to='/home' replace />
  }
  if (!auth || user) return <Component />

  return <Navigate to='/login' replace />
}