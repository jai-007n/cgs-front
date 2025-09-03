import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from '../components/login/login'
import ConfirmPassword from '../components/login/password'
import Layout from '@/admin/layout/layout';
import Dashboard from '@/admin/pages/dashboard';


const router=createBrowserRouter([
    {path:'/',element:<Login/>},
    {path:'/login',element:<Login/>},
    {path:'/confirm-password',element:<ConfirmPassword/>},
    {path:'/',
        element:<Layout/>,
        children:[
            {index:true,path:'dashboard',element:<Dashboard/>}
        ]
    
    },
]);



function Router() {
  return <RouterProvider router={router}/>  
  }

export default Router