import React, { useState } from "react";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function NewTable(){
    const history = useHistory();
    const [errors, setErrors]= useState(null);

    function submitHandler(data){
        const abortController = new AbortController();
        setErrors(null);
        createTable(data, abortController.signal)
        .then(data =>
            history.push(`/`))
        .catch((error)=>setErrors(error))

    return () => abortController.abort();
    }

    return(
    <div>
        <ErrorAlert error={errors} />
        
        <TableForm 
            onSubmit={submitHandler}
            submitButtonText="Submit"
             initialFormData={ {
            table_name: '',            
            capacity: '',
            } }/>
    </div>
    )}

export default NewTable;