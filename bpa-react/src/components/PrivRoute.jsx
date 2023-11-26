import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Outlet, Navigate} from 'react-router-dom';

export default function PrivRoute() {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser ? <Outlet/> : <Navigate to='/log-in'/>;
  return (
    <div>PrivRoute</div>
  )
}
