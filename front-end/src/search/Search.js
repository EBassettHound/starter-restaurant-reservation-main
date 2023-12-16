import React, {useState} from 'react'
import { searchReservations } from '../utils/api';
import ReservationDisplay from '../reservations/SingleReservation';


function Search() {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([])

    const inputHandler = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
      };

    const submitHandler = (event) => {
        event.preventDefault();
        searchReservations(searchInput)
            .then((data)=> setSearchResults(data))
    }
    
  return (
        <div>
            <div className = "d-flex">
                <form onSubmit={submitHandler}>
                    <input
                        type="search" 
                        name="mobile_number"
                        placeholder="Enter a customer's phone number"
                        onChange={inputHandler}
                        value={searchInput} />
                    <button type="submit" className="btn btn-primary mr-3">Search</button>
                </form>
        </div>
        <div className = "row row-cols-1 row-cols-md-3">
            {searchResults.length ? searchResults.map((reservation) => {return <ReservationDisplay reservation = {reservation} key = {reservation.reservation_id}/>}) : <h5>No reservations found</h5>}
        </div>
   </div>
  )
}

export default Search