import React, { useEffect } from "react";
import { assets } from '../../../assets/assets_frontend/assets';
import { Button, Spinner, Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../../Redux/reducers/appointments.reducer";
import { getAllDoctors } from "../../../Redux/reducers/doctors.reducer";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const Dashboard = () => {
  const { appointments, loading: apppointmentLoading } = useSelector((state) => state.appointment);
  const { doctors, loading: doctorLoading } = useSelector((state) => state.doctor);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logged = jwtDecode(token);

  console.log(logged);

  useEffect(() => {
    if (token) {

    }
  }, [dispatch, token]);

  // const times = [{ time: "02:00", modifier: "PM" }, { time: "03:00", modifier: "PM" }, { time: "04:00", modifier: "PM" }]
  return <div className='pt-14 max-w-[1280px] mx-auto px-8 sm:px-12'>
    <div className="flex justify-center items-center flex-wrap gap-4">
      {/* <div className='my-52'>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={times}
          getOptionLabel={(option) => option.time}
          defaultValue={[times[0]]}
          filterSelectedOptions
          onChange={(e, value) => setx(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="filterSelectedOptions"
            />
          )}
        />
        <p className="text-red-600 text-start">{errors.examination_dates?.message}</p>
        <button onClick={() => { console.log(x.map((time) => { return { date: time.split(":")[0], modifier: time.split(":")[1] } })) }} type="submit">dddddddddddd</button>
      </div> */}

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
    </div>

    <div className="mt-20 w-full md:w-[60%] mx-auto">
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
              appointments.length? (
                appointments.filter((app) => app.doctor.availble).reverse().slice(10).map((app) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                      <Button color="blue" className="font-medium text-white bg-primary rounded-[4px] hover:bg-primary">
                        cancel
                      </Button>
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
  </div >;
};

export default Dashboard;
