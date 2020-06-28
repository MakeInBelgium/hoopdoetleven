import React from "react";
import {Field} from "react-final-form";
import FormGroupWithValidation from "./FormGroupWithValidation";

export default ({ options = [], name, label, description, ...restProps }) => <FormGroupWithValidation name={name} {...restProps}>
    <label htmlFor={name}>{label || name}</label>
    <div className="form-check">
        <Field
            name={name}
            id={name}
            component="input"
            type="checkbox"
            className="form-check-input"
        />
        <label htmlFor={name} className="form-check-label">{description}</label>
    </div>
</FormGroupWithValidation>;
