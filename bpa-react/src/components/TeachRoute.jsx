import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function TeachRoute() {
    const { role } = useSelector((state) => state.user.currentUser);
    return role === 'teacher' ? <Outlet/> : <div className="text-center">You must be a teacher to access this bud</div>;
}