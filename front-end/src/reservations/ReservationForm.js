import React from "react";
import { useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";



function ReservationForm({initialFormData, onSubmit, submitButtonText}){
    
    const history = useHistory();
    const [formData, setFormData]=useState(initialFormData)
    const [errorList, setErrorList] = useState(null);


    const inputHandler = (event) => {setFormData({...formData,[event.target.name]: event.target.name === "people" ? Number(event.target.value) : event.target.value})}
    const dateSet=(event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function validate(reservation){
        const errors = [];

        const futureDateCheck= ({reservation_date, reservation_time})=>{ if (new Date(`${reservation_date}T${reservation_time}`) < new Date()) errors.push(new Error("Please select a future date"))}
        const tuesdayCheck = ({reservation_date}) =>{if(new Date(reservation_date).getUTCDay()===2) errors.push(new Error("Business is closed on Tuesdays"))}
        const checkMobileNumber =({mobile_number}) =>{if (!(/^\d{10}$|^\d{3}-\d{3}-\d{4}$/.test(mobile_number))) errors.push(new Error("Please input a valid mobile number"))}

        function openHoursCheck(){
            const dateCheck = new Date(formData.reservation_date);
            const hourCheck = formData.reservation_time.split(':')
            dateCheck.setHours(hourCheck[0], hourCheck[1], 0);
            const openingTime = new Date(dateCheck);
            openingTime.setHours(10, 30, 0); 

            const closingTime = new Date(dateCheck);
            closingTime.setHours(21, 30, 0);

            if(dateCheck < openingTime || dateCheck >= closingTime) errors.push(new Error("Please select a time within working hours of 10:30AM to 9:30PM"))           
        }

        
        futureDateCheck(reservation);
        tuesdayCheck(reservation);
        openHoursCheck(reservation);
        checkMobileNumber(reservation);
        return errors;
    }

    
const submitHandler=(event)=>{

    event.preventDefault();
    const reservationErrors = validate(formData);    
        if (reservationErrors.length) {
            setErrorList(reservationErrors);
          return errorList;
        }
    onSubmit(formData)
           
}


    return (
    <div className="w-100">
        
        <form onSubmit={submitHandler}>
            <div className="form-group">
            <label htmlFor="first_name">
                First Name
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="first_name" 
                name="first_name" 
                onChange={inputHandler}
                value={formData.first_name}
                placeholder="First Name" />
            </div>
            <div className="form-group">
            <label htmlFor="last_name">
                Last Name
            </label>
            <input 
                type="text" 
                className="form-control" 
                id="last_name" 
                name="last_name" 
                onChange={inputHandler}
                value={formData.last_name}
                placeholder="Last Name" />
            </div>
            <div className="form-group">
            <label htmlFor="mobile_number">
                Mobile Number
            </label>
            <input 
                type="tel" 
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                onChange={inputHandler}
                value={formData.mobile_number}
                required />
            </div>
            <div className="form-group">
            <label htmlFor="reservation_date">
                Date of Reservation
            </label>
            <input 
                type="date" 
                className="form-control"
                id="reservation_date" 
                name="reservation_date" 
                value={formData.reservation_date} 
                onChange={dateSet}
                required />
            </div>
            
            <div className="form-group">
            <label htmlFor="reservation_time">
                Reservation Time
            </label>
            <input 
                type="time" 
                className="form-control"
                id="reservation_time" 
                name="reservation_time" 
              
                onChange={inputHandler}
                value={formData.reservation_time} 
                required />
            </div>
         
            <div className="form-group">
            <label htmlFor="people">
                Party Size
            </label>
            <input 
                type="number" 
                className="form-control"
                id="people" 
                name="people" 
                onChange={inputHandler}
                value={formData.people}
                required  />
            </div>
            <button type="submit" className="btn btn-primary mr-3">{submitButtonText}</button>
            <button type="button" className="btn btn-secondary mr-3" onClick={()=>history.goBack()}>Cancel</button>
            {errorList && errorList.map((error, index)=><ErrorAlert error = {error} key = {index}/>)}
        </form>
    </div>)}

export default ReservationForm