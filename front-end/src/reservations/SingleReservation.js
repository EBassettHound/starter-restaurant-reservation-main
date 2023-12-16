import React from 'react'
import {  updateReservationStatus } from '../utils/api';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import { formatAsTime } from '../utils/date-time';



function SingleReservation({reservation}){
    const history = useHistory();
    const reservationDeleteHandler = ()=>{if(window.confirm("Do you want to cancel this reservation?\n This cannot be undone.")){
        updateReservationStatus(reservation.reservation_id, "cancelled")
        .then((res)=> history.push('/') )
    }}

    if (!reservation) {
        return <h3>No reservations found</h3>;
      } 
      else {
        return(
            <table className="table">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    <th>Reservation Date</th>
                    <th>Reservation Time</th>
                    <th>Party Size</th>
                    <th>Seat</th>
                    <th>Edit</th>
                    <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={reservation.reservation_id}>
                            <td>{reservation.first_name}</td>
                            <td>{reservation.last_name}</td>
                            <td>{reservation.mobile_number}</td>
                            <td data-reservation-id-status={`${reservation.reservation_id}`}>
                            {reservation.status}
                            </td>
                            <td>{reservation.reservation_date}</td>
                            <td>{formatAsTime(reservation.reservation_time)}</td>
                            <td>{reservation.people}</td>
                            <td>{reservation.status === "booked" ? <Link to={`/reservations/${reservation.reservation_id}/seat`} className= "btn btn-primary float-left">Seat</Link> : <></>} </td>
                            <td><Link to={`/reservations/${reservation.reservation_id}/edit`} className= "btn btn-secondary float-right">Edit</Link></td>  
                            <td><button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick = {reservationDeleteHandler}>Cancel</button></td> 
                        </tr>
                </tbody>    
                
            </table>
        );
    }

  
      
}

export default SingleReservation;