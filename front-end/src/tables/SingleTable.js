import React from 'react'
import { removeReservation, updateReservationStatus } from '../utils/api';

function SingleselectedTable({selectedTable, loadDashboard}){

    const removeResFromselectedTable = ()=>{if(window.confirm("Is this selectedTable ready to seat new guests? \n This cannot be undone.")){
        updateReservationStatus(selectedTable.reservation_id, "finished");
        removeReservation(selectedTable.selectedTable_id)
        .then(loadDashboard)
        }
    }

    return(
        <div className="col">
            <div className="card w-30">
                <div className="card-header">
                    {`${selectedTable.selectedTable_name}`}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{selectedTable.capacity}</h5>
                    <h5 className="card-text" data-selectedTable-id-status={selectedTable.selectedTable_id}>{selectedTable.reservation_id ? "Occupied" : "Free"}</h5>
                    {selectedTable.reservation_id ? <button data-selectedTable-id-finish={selectedTable.selectedTable_id} onClick={removeResFromselectedTable}>Finish</button> : <></>}
                </div>
            </div>
        </div>
    )
}


export default SingleselectedTable;