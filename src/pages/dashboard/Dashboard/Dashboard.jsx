import React, { useEffect } from "react";
import { assets } from '../../../assets/assets_frontend/assets';
import { Button, Spinner, Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../Redux/reducers/appointments.reducer";
import { getAllDoctors } from "../../../Redux/reducers/doctors.reducer";
import { getAllUsers } from "../../../Redux/reducers/users.reducer";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { Calendar, CalendarX } from "lucide-react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { appointments, loading: apppointmentLoading } = useSelector((state) => state.appointment);
  const { doctors, loading: doctorLoading } = useSelector((state) => state.doctor);
  const { users, loading: userLoading } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAppointments({ token, keyword: "", page: "" }))
      dispatch(getAllDoctors({ token, keyword: "", page: "" }))
      dispatch(getAllUsers({token, keyword: "", page: ""}))
    }
  }, [dispatch, token]);

  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 365)

  return <>
  <Helmet>
        <title>Dashboard</title>
      </Helmet>
    <div className='pt-14 max-w-[1280px] mx-auto px-8 sm:px-12'>
      <div className="flex justify-center items-center flex-wrap gap-4">
        <div className='bg-gray-100 text-primary px-16 py-12 rounded-[4px] flex justify-center items-center flex-wrap gap-5'>
          <img className='size-20' src={assets.earning} alt="icon" />
          <div>
            <p className='text-5xl font-bold text-start'>$80</p>
            <p className='text-gray-400 font-semibold text-lg'>Earning</p>
          </div>
        </div>
    
        <div className='bg-gray-100 text-primary px-16 py-12 rounded-[4px] flex justify-center items-center flex-wrap gap-5'>
          <img className='size-20' src={assets.appointment_icon} alt="icon" />
          <div>
            <p className='text-5xl font-bold text-start'>
              {
                apppointmentLoading ? <Spinner color="info" aria-label="Default status example" /> : appointments.length
              }
            </p>
            <p className='text-gray-400 font-semibold text-lg'>Appointments</p>
          </div>
        </div>
    
        <div className='bg-gray-100 text-primary px-16 py-12 rounded-[4px] flex justify-center items-center flex-wrap gap-5'>
          <img className='size-20' src={assets.patient} alt="icon" />
          <div>
            <p className='text-5xl font-bold text-start'>
              {
                doctorLoading ? <Spinner color="info" aria-label="Default status example" /> : doctors?.length
              }
            </p>
            <p className='text-gray-400 font-semibold text-lg'>Doctors</p>
          </div>
        </div>
    
        <div className='bg-gray-100 text-primary px-16 py-12 rounded-[4px] flex justify-center items-center flex-wrap gap-5'>
          <img className='size-20' src={assets.patient_user} alt="icon" />
          <div>
            <p className='text-5xl font-bold text-start'>
              {
                userLoading ? <Spinner color="info" aria-label="Default status example" /> : users?.filter((user) => user.role === "user").length
              }
            </p>
            <p className='text-gray-400 font-semibold text-lg'>Patients</p>
          </div>
        </div>
      </div>
    
      <div className="hidden sm:block h-[300px] mx-auto mt-16">
        <ResponsiveTimeRange
          data={appointments?.map((app) => { return { "day": new Date(app.date).toISOString().split('T')[0], "value": JSON.stringify({doctor: app.doctor.name, user: app.user.name, dateExpire: app.expireDate}) } })}
          from={`2024-12-12`}
          to={dateNow.toISOString().split('T')[0]}
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          tooltip={e => {
            return (
                <div className='bg-blue-400 px-12 py-2 w-fit h-auto rounded-md'>
                    <div className='flex flex-col items-center justify-center w-full h-full'>
                        <span className="inline-flex items-center gap-x-2">
                            <Calendar size={"18px"} /> {e.day}
                        </span>
                        <span className="inline-flex items-center gap-x-1">
                            <CalendarX size={"18px"} /> {JSON.parse(e.value).dateExpire.split(".000Z")[0]}
                        </span>
                        <span className='block px-1'><strong>Doctor:</strong> {JSON.parse(e.value).doctor}</span>
                        <span className='block px-1'><strong>Patient:</strong> {JSON.parse(e.value).user}</span>
                    </div>
                </div>
            )
        }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              justify: false,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
              translateX: -60,
              translateY: -60,
              symbolSize: 20
            }
          ]}
        />
      </div>
      <div className="w-full md:w-[60%] mx-auto mt-20 sm:mt-0">
        <Table>
          <Table.Head>
            <Table.HeadCell className="flex items-center gap-x-3 text-black">
              <img className="size-8 object-cover" src={assets.paper} alt="icon" />
              Latest Bookings
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {
              apppointmentLoading ? (
                <div className="bg-white dark:border-gray-700 dark:bg-gray-800 flex items-center p-4 rounded shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
    
                  <div className="flex flex-col justify-start gap-2 ml-4">
                    <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
    
                  <div className="ml-auto">
                    <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </div>
              ) :
                appointments.length ? (
                  appointments?.filter((app) => app.doctor.active === true).slice(0, 10).reverse().map((app) => (
                    <Table.Row key={app._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap flex flex-row items-center justify-start gap-3 px-4 py-2">
                        <img
                          className="w-14 h-14 rounded-full object-cover"
                          src={app.doctor.profile}
                          alt={`Dr.${app.doctor.name} profile`}
                        />
                        <div className="text-start lg:text-left">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {app.doctor.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {app.date}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <button className="font-medium px-4 py-3 text-white bg-red-500 rounded-[4px] hover:bg-red-700">
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : <tr className="p-3 text-2xl block">
                  There are no appointments right now!
                </tr>
            }
          </Table.Body>
        </Table>
      </div>
    </div >
  </>
};

export default Dashboard;
