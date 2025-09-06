import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../components/login/login'
import ConfirmPassword from '../components/login/password'
import Layout from '@/admin/layout/layout';
import Dashboard from '@/admin/pages/dashboard';
import NotFoundPage from '@/components/notFound';

import RouteErrorBoundary from '@/components/RouteErrorBoundary';


const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/confirm-password', element: <ConfirmPassword /> },
    {
        path: '/',
        element: <Layout />,
        // lazy: () => import('@/admin/layout/layout'),
        errorElement: <RouteErrorBoundary />,
        children: [
            {
                index: true, path: 'dashboard',
                // lazy: () => import('@/admin/pages/dashboard')
                element: <Dashboard /> 
            }
        ]

    },
    { path: '*', element: <NotFoundPage /> },
]);



function Router() {

    return <RouterProvider router={router} />

}

export default Router