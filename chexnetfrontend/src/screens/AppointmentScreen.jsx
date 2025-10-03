import {useSelector} from "react-redux"
import {useState,useEffect} from "react"
import ImageCard from "../components/imageCard.jsx"
import {Button,Card,Form,Row,Col} from 'react-bootstrap'

const AppointmentScreen = ()=>{

    const {userInfo} = useSelector((state)=>state.auth)
    const [doctorId,setDoctorId]=useState('')
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentStartTime, setAppointmentStartTime] = useState('');
    const [appointmentEndTime, setAppointmentEndTime] = useState('00:00');
    const [appointmentReason,setAppointmentReason]=useState('')
    const [fetchstate,setFetchState]=useState(false)

    const [start,setStart]=useState('')
    const [end,setEnd]=useState('')

    const [appointments,setAppointments]=useState([])

    const [doctors,setDoctors] = useState([])

    const convert=(totalMinutes)=>{
      const endhours = Math.floor(totalMinutes / 60) % 24; // Handle overflow of hours
      const endminutes = totalMinutes % 60;
   
      const formattedEndTime = `${String(endhours).padStart(2, '0')}:${String(endminutes).padStart(2, '0')}`;
      return formattedEndTime
    }
    const date=(datestring)=>{
      const [date, time] = datestring.split('T');
      return date
    }

    useEffect(()=>{
        const fetchAppointments = async ()=>{
            try {
              let response;
              if(userInfo.role==='doctor'){
                 response = await fetch('/api/appointment/getdoctorappointment', {
                method: 'GET',
              });
              }
              else if(userInfo.role==='user'){
                 response = await fetch('/api/appointment/getuserappointment', {
                  method: 'GET',
                });
              }
              const data = await response.json();
              setAppointments(data.appointments)
              console.log(data.appointments)
              
          }catch(error){
            console.error("Error fetching images:", error);
            
          }
      }
      fetchAppointments();
    },[fetchstate])

    useEffect(()=>{
      const fetchDoctors = async ()=>{
        try{
          const response = await fetch(`/api/users/getdoctors/${userInfo.city}`, {
            method: 'GET',
          });
          const data = await response.json()
          setDoctors(data.doctors)
          console.log(data.doctors)

        }catch(error){
          console.error("Error fetching images:", error);
        }
      }
    fetchDoctors()
    },[])

    const handleSubmit = async (e)=>{
      e.preventDefault();

      try{  
        const response = await fetch('/api/appointment/bookappointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: doctorName,
            date: appointmentDate,
            start: start,
            end: end,
            doctorId: doctorId,
            reason: appointmentReason,
          }),
        });
        
        setDoctorName('');
        setAppointmentDate('');
        setAppointmentStartTime('');
        setAppointmentEndTime('');
        setAppointmentReason('');
  
        console.log("Appointment booked successfully.");
        setFetchState((prev)=>!prev)
        
        
      }catch(error){
        console.log(error)
      }

    }

    useEffect(()=>{
      const [starthours, startminutes] = appointmentStartTime.split(':').map(Number);
      const totalMinutes = starthours * 60 + startminutes + 20;

      const endhours = Math.floor(totalMinutes / 60) % 24; // Handle overflow of hours
      const endminutes = totalMinutes % 60;

      const formattedEndTime = `${String(endhours).padStart(2, '0')}:${String(endminutes).padStart(2, '0')}`;
      if(appointmentStartTime){
      setAppointmentEndTime(formattedEndTime);
      }

      setStart(totalMinutes)
      setEnd(totalMinutes+20)
    },[appointmentStartTime])

    const handleAppointment = async (id)=>{
      const response = await fetch(`/api/appointment/toggleappointment/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        setFetchState((prev)=>!prev)
      }
    }
    
    return (
      <>
      {userInfo.role==='user' && (<Card className=" my-2 w-100">
          <Card.Body>
            <Card.Title>Book a New Appointment</Card.Title>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="doctorName">
              <Form.Label column sm={2}>Doctor's Details</Form.Label>
              <Col sm={9}>
                  <Form.Select
                    value={JSON.stringify({ id: doctorId, name: doctorName })}
                    onChange={(e) => {
                      const selectedDoctor = JSON.parse(e.target.value);
                      setDoctorName(selectedDoctor.name);
                      setDoctorId(selectedDoctor.id); 
                  }}
                    disabled={doctors.length === 0}
                  >
                    <option value="">Select a doctor</option>
                    {Array.isArray(doctors) && doctors.map((doctor) => (
                        <option key={doctor._id} value={JSON.stringify({ id: doctor._id, name: doctor.name })}>
                            {doctor.name} - {doctor.specialization} - {doctor.experience} years
                        </option>
                    ))}
                  </Form.Select>
              </Col>
            </Form.Group>

              <Form.Group as={Row} controlId="appointmentDate">
                <Form.Label column sm={2}>Date</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="appointmentTime">
                <Form.Label column sm={2}>Start (PM)</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="time"
                    value={appointmentStartTime}
                    onChange={(e) => setAppointmentStartTime(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="appointmentTime">
                <Form.Label column sm={2}>End (PM)</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="time"
                    value={appointmentEndTime}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="appointmentreason">
                <Form.Label column sm={2}>Appointment reason</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={appointmentReason}
                    onChange={(e)=>setAppointmentReason(e.target.value)}
                  
                  />
                </Col>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Book Appointment
              </Button>
            </Form>
          </Card.Body>
        </Card>)}

      <div>
      <h3>Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <Row>
          {appointments.map((appointment) => (
            <Col key={appointment._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{appointment.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {appointment.date}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>{userInfo.role==='user'?'Doctor':'Patient'}:</strong> {userInfo.role==='user' ? appointment.doctor.name : appointment.patient.name}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {userInfo.role==='user' ? appointment.doctor.email : appointment.patient.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>AppointmentDate:</strong> {date(appointment.appointmentDate)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Start Time PM:</strong> {convert(appointment.slot_start)}
                  </Card.Text>
                  <Card.Text>
                    <strong>End Time PM:</strong> {convert(appointment.slot_end)}
                  </Card.Text>
                  <Card.Text>
                    <strong>Reason:</strong> {appointment.reason}
                  </Card.Text>
                  {userInfo.role==='doctor' && (<Button
                    variant="primary"
                    onClick={() => handleAppointment(appointment._id)}
                    className="me-3"
                  >Attended</Button>)}
                  <Button
                    class="btn btn-danger"
                    variant="primary"
                    onClick={() => handleAppointment(appointment._id)}
                  >Cancel</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
        
      </>
        

      );

}

export default AppointmentScreen