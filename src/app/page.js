"use client"
import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  // Return null or a loading indicator while redirecting
  return null;
}

export default HomePage