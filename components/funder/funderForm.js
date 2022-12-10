import testing from './testingForm';
import AddFunderForm from "./funderAddForm";
import { useSelector } from "react-redux";
import React, { useReducer } from "react";


const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}


export default function Form({ data, session }) {


    const [formData, setFormData] = useReducer(formReducer, {})

    const formId = useSelector((state) => state.app.client.formId)

    return (
        <div className="container mx-auto py-5">
            {formId ? testing({ id: formId, formData, setFormData , session}) : AddFunderForm({ formData, setFormData , session})}
        </div>
    )
}