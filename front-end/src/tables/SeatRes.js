import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { listOpenTables, readReservation, updateReservationStatus, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatRes() {
  const history = useHistory();
  const {reservationId} = useParams();
  // eslint-disable-next-line
  const [reservation, setReservation] = useState({})
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [reservationError, setReservationError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  
  function fetchReservation() {
    setReservationError(null);
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal)
    .then(data => setReservation(data))
    .catch(setReservationError);
    return ()=> abortController.abort();
  }

    useEffect(fetchReservation, [reservationId])

  function fetchTables() {
    setTablesError(null);
    const abortController = new AbortController();
      listOpenTables(abortController.signal)
      .then(data=>setTables(data))
      .catch(setTablesError);
  }
  useEffect(fetchTables, [reservationId])

  const inputHandler = ({ target }) => {
    setSelectedTable(target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();    
    updateTable(reservationId, selectedTable)
      .then((data) => {
        history.push("/");
        updateReservationStatus(reservationId, "seated");
      })
      .catch(setReservationError)

    
  };

return (
  <div className="w-100">  
    <form onSubmit={submitHandler}>
        <div className="form-group">
          <ErrorAlert error= {reservationError} />
          <ErrorAlert error = {tablesError} />
        <label htmlFor="table_name">
            Select Table for Reservation
            <select
              id="table_id"
              name="table_id"
              onChange={inputHandler}

            >
              <option value="">-- Choose a Table --</option>
              {tables.map((table)=>{return <option value={table.table_id}>{table.table_name} - {table.capacity}</option>})}
            </select>
        </label>

        </div>
        <button type="submit" className="btn btn-primary mr-3" >Submit</button>
        <button type="button" className="btn btn-secondary mr-3" onClick={()=>history.goBack()}>Cancel</button>
      </form>
  </div>
)
}


export default SeatRes