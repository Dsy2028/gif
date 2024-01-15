import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function AdminRoute() {
    const { role } = useSelector((state) => state.user.currentUser);
    return role === 'admin' ? <Outlet/> : <div className="text-center">You must be an admin to access this page</div>;
}
