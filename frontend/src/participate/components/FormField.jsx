import React from "react";
import {Field} from "react-final-form";
import {required} from "../utils";

export default ({name, type = "text", component = "input", className="form-control", isRequired = false, ...fieldProps}) => <Field
    name={name}
    id={name}
    component={component}
    type={type}
    className={className}
    validate={isRequired ? required : false}
    required={isRequired}
    {...fieldProps}
/>;
