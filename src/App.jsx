import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LayOut from './pages/LayOut/LayOut'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctors/Doctors'
import Login from './pages/Login/Login'
import About from './pages/About/About'
import Concat from './pages/Contact/Concat'
import MyProfile from './pages/MyProfile/MyProfile'
import Appointment from './pages/Appointment/Appointment'
import MyAppointments from './pages/MyAppointments/MyAppointments'

function App() {
  const routes = createBrowserRouter([
    {path: "", element: <LayOut/>, children: [
      {index: true, element: <Home/>},
      {path: "/doctors", element: <Doctors/>},
      {path: "/doctors/:speciality", element: <Doctors/>},
      {path: "/login", element: <Login/>},
      {path: "/about", element: <About/>},
      {path: "/concat", element: <Concat/>},
      {path: "/my-profile", element: <MyProfile/>},
      {path: "/my-appointments", element: <MyAppointments/>},
      {path: "/appointment/:docId", element: <Appointment/>},
    ]}
  ])
  return <RouterProvider router={routes}/>
}

export default App
