import { Calendar, CalendarCheck, House, LogOut } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';

const navItems = [
    {to: '/dashboard', label: 'Dashboard', Icon: House},
    {to: '/dashboard/add-appointments', label: 'Add appointment', Icon: Calendar},
    {to: '/dashboard/Bookings', label: 'Bookings', Icon: CalendarCheck},


]

const Sidebar = ({ sidebar, setSidebar}) => {
    const { authUser } = useAuthUser()

    const queryClient = useQueryClient();

    const {mutate:logoutMutation} = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})


    })
    
  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
        <div className='my-7 w-full'>
            <img src="/gehgeh.jpeg" alt="user avatar" className='w-13 rounded-full mx-auto'/>
            <h1 className='mt-1 text-center'>{authUser?.username}</h1>
            <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                {navItems.map(({to, label, Icon})=>(
                    <NavLink key={to} to={to} end={to === '/dashboard'} onClick={()=> 
                    setSidebar(false)} className={({isActive})=> 
                    `px-3.5 py-2.5 flex 
                    items-center gap-3 rounded ${isActive ? 'bg-primary text-white ' : ''}`}>
                        {({isActive})=>(
                            <>
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                            {label}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>

          <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
                <div className='flex gap-2 items-center cursor-pointer' >
                    <img src="/gehgeh.jpeg" className='w-8 rounded-full' alt="gehgeh" />
                    <div>
                        <h1 className='text-sm font-meduim'>{authUser?.username}</h1>
                        
                    </div>
                </div>
                <button onClick={logoutMutation}>
                <LogOut className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
                </button>
        </div>
    </div>
  )
}

export default Sidebar