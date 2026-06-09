import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/pages/Admin/AdminLayout'
import { AllergensPage } from '@/pages/Admin/AllergensPage'
import { DishesPage } from '@/pages/Admin/DishesPage'
import { WeeklyMenuAdminPage } from '@/pages/Admin/WeeklyMenuAdminPage'
import { HomePage } from '@/pages/Home/HomePage'
import { LoginPage } from '@/pages/Login/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <WeeklyMenuAdminPage />,
          },
          {
            path: 'retter',
            element: <DishesPage />,
          },
          {
            path: 'allergier',
            element: <AllergensPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/" />,
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
