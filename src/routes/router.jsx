import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../components/login/login'
import ConfirmPassword from '../components/login/password'
import Layout from '@/admin/layout/layout';
import Dashboard from '@/admin/pages/dashboard';
import NotFoundPage from '@/components/notFound';
import RouteErrorBoundary from '@/components/RouteErrorBoundary';
import { ClipLoader } from 'react-spinners';
import { LoadingIndicator } from '@/components/loading-indicator';


const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/login', element: <Login /> },
    { path: '/confirm-password', element: <ConfirmPassword /> },
    {
        path: '/',
        element: <Layout />,
        // lazy: () => import('@/admin/layout/layout'),
        HydrateFallback: LoadingIndicator ,
        errorElement: <RouteErrorBoundary />,
        children: [
            {
                index: true, path: '/dashboard',
                // lazy: () => import('@/admin/pages/dashboard')
                element: <Dashboard />
            },
            {
                path: '/client/add',
                lazy: () => import('@/admin/pages/client/clientAdd')
            }
        ]

    },
    { path: '*', element: <NotFoundPage /> },
]);


function HydrateFallback() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-xl">Preparing your experience...</div>
        </div>
    );
}

function Router() {

    return (<RouterProvider
        router={router}
        fallbackElement={<HydrateFallback />} />)

}

export default Router