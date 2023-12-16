import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function TableForm({initialFormData, onSubmit, submitButtonText}){
    const history = useHistory();
    const [formData, setFormData]=useState(initialFormData);
    
    const inputHandler = (event) => {setFormData({...formData,[event.target.name]: event.target.name === "capacity" ? Number(event.target.value) : event.target.value})}

    const submitHandler = (event) => {
        event.preventDefault();   
        onSubmit(formData)           
    }

    return (
        <div className="w-100">
            <form onSubmit={submitHandler}>
                <div className="form-group">
                <label htmlFor="table_name">
                    Table Name
                </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="table_name" 
                    name="table_name" 
                    onChange={inputHandler}
                    value={formData.table_name}
                    placeholder="ex: table 7"
                    required />
                </div>
                <div className="form-group">
                <label htmlFor="capacity">
                    Capacity
                </label>
                <input 
                    type="number" 
                    className="form-control"
                    id="capacity" 
                    name="capacity" 
                    min="1"
                    onChange={inputHandler}
                    value={formData.capacity}
                    required  />
                </div>
                <button type="submit" className="btn btn-primary mr-3">{submitButtonText}</button>
                <button type="button" className="btn btn-secondary mr-3" onClick={()=>history.goBack()}>Cancel</button>
            </form>
        </div>
    )
}

export default TableForm;