import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LayOut from './pages/LayOut/LayOut'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctors/Doctors'
import Login from './pages/auth/Login/Login'
import About from './pages/About/About'
import Concat from './pages/Contact/Concat'
import MyProfile from './pages/MyProfile/MyProfile'
import Appointment from './pages/Appointment/Appointment'
import MyAppointments from './pages/MyAppointments/MyAppointments'
import AuthLayOut from './pages/auth/AuthLayOut/AuthLayOut'
import Register from './pages/auth/Register/Register'
import ProtectRoutes from './pages/ProtectRoutes/ProtectRoutes'
import ProtectAuth from './pages/ProtectAuth/ProtectAuth'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import DashboardLayOut from './pages/dashboard/DashboardLayOut/DashboardLayOut'
import Dashboard from './pages/dashboard/Dashboard/Dashboard'
import AddDoctors from './pages/dashboard/AddDoctors/AddDoctors'

function App() {
  const routes = createBrowserRouter([
    {
      path: "", element: <ProtectRoutes> <LayOut /> </ProtectRoutes>, children: [
        { index: true, element: <ProtectRoutes> <Home /> </ProtectRoutes> },
        { path: "doctors/:speciality", element: <ProtectRoutes> <Doctors /> </ProtectRoutes> },
        { path: "doctors", element: <ProtectRoutes> <Doctors /> </ProtectRoutes> },
        { path: "about", element: <ProtectRoutes> <About /> </ProtectRoutes> },
        { path: "concat", element: <ProtectRoutes> <Concat /> </ProtectRoutes> },
        { path: "my-profile", element: <ProtectRoutes> <MyProfile /> </ProtectRoutes> },
        { path: "my-appointments", element: <ProtectRoutes> <MyAppointments /> </ProtectRoutes> },
        { path: "appointment/:docId", element: <ProtectRoutes> <Appointment /> </ProtectRoutes> },
        { path: "change-password", element: <ProtectRoutes> <ChangePassword /> </ProtectRoutes> },
      ]
    },
    {
      path: "dashboard", element: <DashboardLayOut />, children: [
        { index: true, element: <ProtectRoutes> <Dashboard /> </ProtectRoutes> },
        { path: "add-doctors", element: <ProtectRoutes> <AddDoctors /> </ProtectRoutes> },
      ]
    },
    {
      path: "auth", element: <AuthLayOut />, children: [
        { index: true, element: <ProtectAuth> <Register /> </ProtectAuth> },
        { path: "login", element: <ProtectAuth> <Login /> </ProtectAuth> },
      ]
    },
  ])
  return <RouterProvider router={routes} />
}

export default App
