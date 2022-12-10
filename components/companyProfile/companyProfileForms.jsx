import UpdateComapnyProfileForm from "./companyProfileUpdate";
import AddCompanyProfileForm from "./companyAddForm";
import { useSelector } from "react-redux";
import React, { useReducer } from "react";


const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}


export default function CompanyProfileForms({ data , session}) {


    const [formData, setFormData] = useReducer(formReducer, {})

    const formId = useSelector((state) => state.app.client.formId)
    console.log("comp id",formId)

    return (
        <div className="container mx-auto py-5">
            {formId[0] ? UpdateComapnyProfileForm({ id: formId, formData, setFormData, session }) : AddCompanyProfileForm({ formData, setFormData, session })}
        </div>
    )
}