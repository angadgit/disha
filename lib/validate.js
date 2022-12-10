export default function login_validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    return errors;

}

export function registerValidate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = "Required";
    } else if (values.username.includes(" ")) {
        errors.username = "Invalid Username...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    // validate confirm password
    if (!values.cpassword) {
        errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password Not Match...!"
    } else if (values.cpassword.includes(" ")) {
        errors.cpassword = "Invalid Confirm Password"
    }

    return errors;
}

export function funderValidate(values) {
    const errors = {};

    if (!values.funderName) {
        errors.funderName = "Required";
    } else if (values.funderName.length < 2) {
        errors.funderName = 'Invalid Funder Number';
    }

    if (!values.contactPerson) {
        errors.contactPerson = "Required";
    }else if (values.contactPerson.includes(" ")) {
        errors.contactPerson = "Invalid Funder Name";
    }

    if (!values.contactNumber) {
        errors.contactNumber = "Required";
    } else if (values.contactNumber.length < 10 || values.contactNumber.length > 10) {
        errors.contactNumber = 'Invalid Contact Number';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.pan) {
        errors.pan = "Required";
    } else if (values.pan.length < 10 || values.pan.length > 10) {
        errors.pan = 'Invalid PAN';
    }

    if (!values.funderType) {
        errors.funderType = "Required";
    }

    if (!values.funderCategory) {
        errors.funderCategory = "Required";
    }

    if (!values.addressLine1) {
        errors.addressLine1 = "Required";
    }else if (values.addressLine1.includes(" ")) {
        errors.addressLine1 = "Invalid Address";
    }

    if (!values.country) {
        errors.country = "Required";
    }else if (values.country.includes(" ")) {
        errors.country = "Invalid Country";
    }

    if (!values.state) {
        errors.state = "Required";
    }else if (values.state.includes(" ")) {
        errors.state = "Invalid State";
    }

    if (!values.pinCode) {
        errors.pinCode = "Required";
    } else if (values.pinCode.length < 6 || values.pinCode.length > 6) {
        errors.pinCode = 'Invalid PIN Code';
    }

    if (!values.nationality) {
        errors.nationality = "Required";
    }else if (values.nationality.includes(" ")) {
        errors.nationality = "Invalid Nationality";
    }


    return errors;
}

export function recepitValidate(values) {
    const errors = {};

    // if (!values.funder) {
    //     errors.funder = "Required";
    // }

    if (!values.recepitDate) {
        errors.recepitDate = "Required";
    }

    if (!values.funderType) {
        errors.funderType = "Required";
    }

    if (!values.receiptAmount) {
        errors.receiptAmount = "Required";
    }

    if (!values.typeFund) {
        errors.typeFund = "Required";
    }


    return errors;
}

export function companyProfileValidate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    
    return errors;
}

export function userFormValidate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.department) {
        errors.department = 'Required';
    }

    if (!values.mobileNo) {
        errors.mobileNo = 'Required';
    }else if (values.mobileNo.length < 10 || values.mobileNo.length > 10) {
        errors.mobileNo = 'Invalid Contact Number';
    }

    if (!values.userRole) {
        errors.userRole = 'Required';
    }

    if (!values.formPermission) {
        errors.formPermission = 'Required';
    }

    if (!values.access) {
        errors.access = 'Required';
    }

    if (!values.userName) {
        errors.userName = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }else if (values.password.length < 8) {
        errors.password = 'Invalid password';
    }
    
    return errors;
}
