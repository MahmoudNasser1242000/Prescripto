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

function App() {
  const routes = createBrowserRouter([
    {path: "", element: <LayOut/>, children: [
      {index: true, element: <Home/>},
      {path: "doctors/:speciality", element: <Doctors/>},
      {path: "doctors", element: <Doctors/>},
      {path: "about", element: <About/>},
      {path: "concat", element: <Concat/>},
      {path: "my-profile", element: <MyProfile/>},
      {path: "my-appointments", element: <MyAppointments/>},
      {path: "appointment/:docId", element: <Appointment/>},
      {path: "register", element: <Appointment/>},
    ]},
    {path: "auth", element: <AuthLayOut/>, children: [
      {index: true, element: <Register/>},
      {path: "login", element: <Login/>},
    ]}
  ])
  return <RouterProvider router={routes}/>
}

export default App
