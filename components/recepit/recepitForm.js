import UpdateRecepitForm from "./recepitUpdateForm";
import AddRecepitForm from "./recepitAddForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";


const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function Form({ fundTypeData, data, funderData, companyProfileData , session}) {

    const [formData, setFormData] = useReducer(formReducer, {})
    const formId = useSelector((state) => state.app.client.formId)
// console.log(fundTypeData)
    return (
        <div className="container mx-auto py-5">
            {formId ? UpdateRecepitForm({ id: formId, formData, setFormData, fundDt: fundTypeData, funderDt: funderData, companyProfileData, session }) : AddRecepitForm({ formData, setFormData, fundDt: fundTypeData, funderDt: funderData, companyProfileData, session })}
        </div>
    )
}

