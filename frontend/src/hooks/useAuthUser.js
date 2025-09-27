import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthUser } from '../lib/api';

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
    refetchOnWindowFocus: false,
  });
  
   return { isLoading: authUser.isLoading, authUser: authUser.data?.user,  isAdmin: authUser.data?.user?.role === 'admin',}
}

export default useAuthUser