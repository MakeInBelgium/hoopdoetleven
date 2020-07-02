import React from "react";
import {Field} from "react-final-form";
import {required} from "../utils";
import classnames from "classnames";

export default ({name, type = "text", component = "input", className="form-control", isRequired = false, hasError = false, touched = false, ...fieldProps}) => <Field
    name={name}
    id={name}
    component={component}
    type={type}
    className={classnames(className, {
        "is-invalid": touched && hasError,
        "is-valid": touched && !hasError
    })}
    validate={isRequired ? required : false}
    required={isRequired}
    {...fieldProps}
/>;
