import React from 'react'
import { removeReservation, updateReservationStatus } from '../utils/api';

function SingleTable({table, loadDashboard}){

    const removeResFromTable = ()=>{if(window.confirm("Is this table ready to seat new guests? \n This cannot be undone.")){
        updateReservationStatus(table.reservation_id, "finished");
        removeReservation(table.table_id)
        .then(loadDashboard)
        }
    }

    return(
        <div className="col">
            <div className="card w-30">
                <div className="card-header">
                    {`${table.table_name}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{table.capacity}</h5>
                    <h5 className="card-text" data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</h5>
                    {table.reservation_id ? <button data-table-id-finish={table.table_id} onClick={removeResFromTable}>Finish</button> : <></>}
                </div>
            </div>
        </div>
    )
}


export default SingleTable;