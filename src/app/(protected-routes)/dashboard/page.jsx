import ProtectedRoute from '@/app/components/auth/ProtectedRoute'
import DashboardTiles from '@/app/components/dashboard/DashboardTiles'
import React from 'react'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardTiles/>
    </ProtectedRoute>
  )
}

export default DashboardPage